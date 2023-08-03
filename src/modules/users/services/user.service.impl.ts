import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import * as bcrypt from 'bcrypt';

import { AppLoggerService } from 'src/shared/services/app-logger.service';
import { UsersRepository } from '../repositories/user.repository';
import { PaginationResponseDto } from 'src/common/dtos/response.dto';
import { CreateUserRequestDto } from '../dtos/requests/create-user.dto';
import { GetListUserRequestDto } from '../dtos/requests/get-list-user.dto';
import { GetOneUserRequestDto } from '../dtos/requests/get-one-user.dto';
import { ValidateLoginRequest } from '../dtos/requests/validate-login.dto';
import { UserDetailDto, UserDto } from '../dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UserServiceImpl implements UserService {
	constructor(
		@InjectMapper() private readonly _mapper: Mapper,
		private readonly _loggerService: AppLoggerService,
		private readonly _repository: UsersRepository
	) {}

	async create(request: CreateUserRequestDto): Promise<boolean> {
		const user = await this.getOne({ email: request.email });
		if (user) {
			throw new ConflictException('Email is already exist');
		}

		try {
			const user = await this._repository.create({
				...request,
				password: await bcrypt.hash(request.password, 10),
				isActive: true,
			});
			return !!user;
		} catch (err) {
			this._loggerService.error(err);
			throw new BadRequestException('Create user error');
		}
	}

	async getOne(request: GetOneUserRequestDto): Promise<UserDetailDto> {
		try {
			const data = await this._repository.findOne({ ...request });
			return this._mapper.map(data, UserDocument, UserDetailDto);
		} catch (e) {
			this._loggerService.error(e);
			throw new BadRequestException('Get user error');
		}
	}

	async getList(request: GetListUserRequestDto): Promise<PaginationResponseDto<UserDto>> {
		try {
			const newFilter: FilterQuery<UserDocument> = {
				...request,
			};

			if (request.filter) {
				newFilter.$text = { $search: `/${request.filter}/` };
			}
			const result = await this._repository.findAndCount(newFilter);

			return {
				data: this._mapper.mapArray(result.data, UserDocument, UserDto),
				total: result.total,
			};
		} catch (e) {
			this._loggerService.error(e);
			throw new BadRequestException('Get user list error');
		}
	}

	async validateLogin(request: ValidateLoginRequest): Promise<UserDto> {
		const user = await this._repository.findOne({ email: request.email });
		if (!user) {
			throw new BadRequestException('Email or password is invalid');
		}

		if (!user.isActive) {
			throw new BadRequestException('User not found or is blocked');
		}

		const isMatch = await bcrypt.compare(request.password, user?.password);
		if (!isMatch) {
			throw new BadRequestException('Email or password is invalid');
		}

		return this._mapper.map(user, UserDocument, UserDetailDto);
	}
}
