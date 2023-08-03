import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app-config.service';

@Injectable()
export class UtilService {
	constructor(private readonly _configService: AppConfigService) {}
	public generateRandomCode(length) {
		const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let code = '';

		while (code.length < length) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			code += charset[randomIndex];
		}

		return code;
	}
}
