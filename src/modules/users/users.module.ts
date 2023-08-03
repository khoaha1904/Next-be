import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { UserServiceImpl } from './services/user.service.impl';
import { UserProfile } from './users.profile';

const services = [
	{
		provide: 'UserService',
		useClass: UserServiceImpl,
	},
];

@Module({
	imports: [SharedModule, MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])],
	controllers: [UsersController],
	providers: [UsersRepository, UserProfile, ...services],
	exports: [...services],
})
export class UsersModule {}
