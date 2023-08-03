import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { RolesEnum } from '../../enums/user-role.enum';

export class CreateUserRequestDto {
	@IsString()
	@IsNotEmpty()
	@AutoMap()
	email: string;

	@IsString()
	@IsOptional()
	store?: string;

	@IsString()
	@IsNotEmpty()
	@AutoMap()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@AutoMap()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@AutoMap()
	phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@AutoMap()
	@IsEnum([RolesEnum.EMPLOYEE])
	@IsNotEmpty()
	role: RolesEnum;
}
