import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { AppLoggerService } from 'src/shared/services/app-logger.service';
import { AbstractRepository } from 'src/common/databases/mongo/abstract.repository';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
	constructor(
		@InjectModel(UserDocument.name) userModel: Model<UserDocument>,
		@InjectConnection() connection: Connection,
		_loggerService: AppLoggerService
	) {
		super(userModel, connection, _loggerService);
	}
}
