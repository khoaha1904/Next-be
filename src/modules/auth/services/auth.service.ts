import { LoginRequestDto } from '../dto/requests/login-request.dto';
import { RegisterRequestDto } from '../dto/requests/register-request.dto';
import { LoginResponseDto } from '../dto/responses/login-response.dto';
import { RegisterResponseDto } from '../dto/responses/register-response.dto';

export interface AuthService {
	login(request: LoginRequestDto): Promise<LoginResponseDto>;
	register(request: RegisterRequestDto): Promise<boolean>;
}
