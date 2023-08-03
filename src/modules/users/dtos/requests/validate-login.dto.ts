import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateLoginRequest {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
