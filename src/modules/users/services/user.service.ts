import { CreateUserRequestDto } from '../dtos/requests/create-user.dto';
import { GetOneUserRequestDto } from '../dtos/requests/get-one-user.dto';
import { GetListUserRequestDto } from '../dtos/requests/get-list-user.dto';
import { UserDetailDto, UserDto } from '../dtos/user.dto';
import { PaginationResponseDto } from 'src/common/dtos/response.dto';
import { ValidateLoginRequest } from '../dtos/requests/validate-login.dto';

export interface UserService {
	create: (request: CreateUserRequestDto) => Promise<boolean>;
	getOne: (request: GetOneUserRequestDto) => Promise<UserDetailDto>;
	getList: (request: GetListUserRequestDto) => Promise<PaginationResponseDto<UserDto>>;
	validateLogin: (request: ValidateLoginRequest) => Promise<UserDto>;
}
