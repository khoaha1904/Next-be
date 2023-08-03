import { IsOptional, IsString } from 'class-validator';

export class PaginationRequestDto {
	@IsString()
	@IsOptional()
	filter?: string;

	@IsString()
	@IsOptional()
	sort?: string;

	@IsString()
	@IsOptional()
	pageIndex?: number;

	@IsString()
	@IsOptional()
	pageSize?: number;
}
