import { Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config.service';
import { AppLoggerService } from './services/app-logger.service';
import { UtilService } from './services/util.service';

const services = [AppConfigService, AppLoggerService, UtilService];

@Module({
	imports: [],
	providers: [...services],
	exports: [...services],
})
export class SharedModule {
	// static registerRmq(service: string, queue: string): DynamicModule {
	// 	const providers = [
	// 		{
	// 			provide: service,
	// 			useFactory: (configService: AppConfigService) => {
	// 				const queueName = configService.get(queue);
	// 				return ClientProxyFactory.create(configService.getRmqOptions(queueName));
	// 			},
	// 			inject: [AppConfigService],
	// 		},
	// 	];
	// 	return {
	// 		module: SharedModule,
	// 		providers,
	// 		exports: providers,
	// 	};
	// }
}
