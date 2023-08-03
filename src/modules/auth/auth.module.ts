import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceImpl } from './services/auth.service.impl';

const services = [
	{
		provide: 'AuthService',
		useClass: AuthServiceImpl,
	},
];

@Module({
	imports: [
		UsersModule,
		SharedModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '24h' },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [JwtStrategy, ...services],
	exports: [JwtStrategy],
})
export class AuthModule {}
