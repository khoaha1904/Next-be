import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResponseInterceptor } from 'src/interceptor/response.interceptor';
import { LoginRequestDto } from '../dto/requests/login-request.dto';
import { RegisterRequestDto } from '../dto/requests/register-request.dto';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
	constructor(@Inject('AuthService') private readonly _service: AuthService) {}

	@Post('login')
	async login(@Body() request: LoginRequestDto) {
		return await this._service.login(request);
	}

	@Post('register')
	async register(@Body() request: RegisterRequestDto) {
		return await this._service.register(request);
	}
}
