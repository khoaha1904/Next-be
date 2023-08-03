import { LoginRequestDto } from '../dto/requests/login-request.dto';
import { LoginResponseDto } from '../dto/responses/login-response.dto';

export interface AuthService {
	login(request: LoginRequestDto): Promise<LoginResponseDto>;
}
