import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';
import { AppLoggerService } from 'src/shared/services/app-logger.service';
import { LoginRequestDto } from '../dto/requests/login-request.dto';
import { LoginResponseDto } from '../dto/responses/login-response.dto';
import { AppConfigService } from 'src/shared/services/app-config.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
	private accessTokenTime;
	private refreshTokenTime;

	constructor(
		private readonly _loggerService: AppLoggerService,
		@Inject('UserService') private readonly _userService: UserService,
		private readonly jwtService: JwtService,
		private readonly _configService: AppConfigService
	) {
		this.accessTokenTime = `${_configService.get('ACCESS_TOKEN_EXPIRED')}h`;
		this.refreshTokenTime = `${_configService.get('REFRESH_TOKEN_EXPRIRED')}h`;
	}

	async login(request: LoginRequestDto): Promise<LoginResponseDto> {
		console.log('in');

		const user = await this._userService.validateLogin(request);

		console.log('out');
		try {
			return {
				user: user,
				token: {
					token: this.jwtService.sign({ ...user }, { expiresIn: this.accessTokenTime }),
					refreshToken: this.jwtService.sign({ ...user }, { expiresIn: this.refreshTokenTime }),
				},
			};
		} catch (err) {
			this._loggerService.error(err);
			throw new BadRequestException('Login error');
		}
	}
}
