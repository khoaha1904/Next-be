import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ResponseInterceptor } from 'src/interceptor/response.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RolesEnum } from '../enums/user-role.enum';
import { CreateUserRequestDto } from '../dtos/requests/create-user.dto';
import { GetListUserRequestDto } from '../dtos/requests/get-list-user.dto';

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
	constructor(@Inject('UserService') private readonly _service: UserService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	async getProfile(@CurrentUser() user) {
		return { user };
	}

	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RolesEnum.ADMIN)
	async createEmployee(@Body() body: CreateUserRequestDto) {
		return await this._service.create(body);
	}

	@Get()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RolesEnum.ADMIN)
	async getUsersEmployee(@Query() query: GetListUserRequestDto) {
		return await this._service.getList(query);
	}

	@Get('my-profile')
	@UseGuards(JwtAuthGuard)
	async getMyProfile(@CurrentUser() user) {
		return await this._service.getOne({ id: user.id });
	}

	@Get(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RolesEnum.ADMIN)
	async getById(@Param('id') id: string) {
		return await this._service.getOne({ id });
	}
}
