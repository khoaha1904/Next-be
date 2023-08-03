import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from 'src/common/databases/mongo/abstract.schema';
import { RolesEnum } from '../enums/user-role.enum';

@Schema({ versionKey: false, collection: 'users' })
export class UserDocument extends AbstractDocument {
	@Prop({ isRequired: true, type: SchemaTypes.String })
	@AutoMap()
	email: string;

	@Prop({ isRequired: true, type: SchemaTypes.String })
	@AutoMap()
	firstName: string;

	@Prop({ isRequired: true, type: SchemaTypes.String })
	@AutoMap()
	lastName: string;

	@Prop({ isRequired: true, type: SchemaTypes.String, default: null })
	@AutoMap()
	phoneNumber?: string;

	@Prop({
		type: SchemaTypes.String,
		enum: RolesEnum,
		isRequired: true,
	})
	@AutoMap(() => String)
	role: RolesEnum;

	@Prop({ isRequired: true, type: SchemaTypes.Boolean })
	@AutoMap()
	isActive: boolean;

	@Prop({ isRequired: true, type: SchemaTypes.String })
	password: string;

	@Prop({ type: SchemaTypes.String, isRequired: false })
	@AutoMap()
	avatarUrl?: string;
}

const UserSchema = SchemaFactory.createForClass(UserDocument);

UserSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

export { UserSchema };
