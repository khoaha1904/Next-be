import { AutoMap } from '@automapper/classes';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
	@Prop({ type: SchemaTypes.ObjectId })
	_id: Types.ObjectId;

	@Prop({ type: SchemaTypes.Date })
	@AutoMap()
	createdAt?: Date;

	@Prop({ type: SchemaTypes.Date })
	@AutoMap()
	updatedAt?: Date;

	@Prop({ type: SchemaTypes.Boolean, default: false, isRequired: true })
	isDeleted?: boolean;
}
