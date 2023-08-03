import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/modules/users/enums/user-role.enum';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLE_KEY, roles);
