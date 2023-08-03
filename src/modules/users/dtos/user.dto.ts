import { AutoMap } from '@automapper/classes';
import { RolesEnum } from '../enums/user-role.enum';
import { AbstractDto } from 'src/common/dtos/common.dto';

export class UserDto extends AbstractDto {
	@AutoMap()
	email?: string;

	@AutoMap()
	firstName?: string;

	@AutoMap()
	lastName?: string;

	@AutoMap(() => String)
	role?: RolesEnum;

	@AutoMap()
	isActive?: boolean;

	@AutoMap()
	avatarUrl?: string;
}

export class UserDetailDto extends UserDto {
	@AutoMap()
	phoneNumber?: string;
}
