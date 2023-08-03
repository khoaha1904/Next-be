export class PaginationResponseDto<T> {
	data: T[];
	total: number;
}

export class ClientResponseDto<T = any> {
	data: T;
	statusCode: number;
	message: string;
	error: string;
	isSuccess: boolean;
}
