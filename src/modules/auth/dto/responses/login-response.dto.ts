import { UserDetailDto } from 'src/modules/users/dtos/user.dto';

export class LoginResponseDto {
	user: UserDetailDto;
	token: {
		token: string;
		refreshToken: string;
	};
}
