import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AppMongoModule } from './common/databases/mongo/mongo.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './modules/auth/auth.module';

const modules = [UsersModule, AuthModule];

@Module({
	imports: [
		SharedModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		AutomapperModule.forRoot({
			strategyInitializer: classes(),
		}),
		AppMongoModule,
		ConfigModule,
		...modules,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
