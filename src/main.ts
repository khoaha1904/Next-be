import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SharedModule } from './shared/shared.module';
import { AppLoggerService } from './shared/services/app-logger.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			validationError: {
				target: false,
			},
		})
	);

	const loggerService = app.select(SharedModule).get(AppLoggerService);

	app.useStaticAssets(join(__dirname, '..', 'uploads'), {
		prefix: '/uploads/',
	});

	app.useLogger(loggerService);
	const configService = app.get(ConfigService);

	app.use(
		morgan('combined', {
			stream: {
				write: (message) => {
					loggerService.log(message);
				},
			},
		})
	);

	app.use(
		helmet({
			crossOriginResourcePolicy: false,
		})
	);

	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

	const port = configService.get('PORT') || 3000;
	const corsOptions = {
		origin: '*',
		method: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
		credential: false,
		allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept, X-XSRF-TOKEN',
	};
	app.use(cors(corsOptions));

	await app.listen(port);
	return port;
}

bootstrap().then((port: number) => {
	Logger.warn(`The server is running on port http://localhost:${port}`);
});
