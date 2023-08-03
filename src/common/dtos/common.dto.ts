import { AutoMap } from '@automapper/classes';

export class AbstractDto {
	@AutoMap()
	id?: string;

	@AutoMap()
	createdAt?: Date;

	@AutoMap()
	updatedAt?: Date;
}
