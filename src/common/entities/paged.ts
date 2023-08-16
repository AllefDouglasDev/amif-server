import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export type Order = 'desc' | 'asc';

export class PagedRequest<T = any> {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  perPage?: number;

  @IsString()
  @IsOptional()
  sortBy?: keyof T;

  @IsString()
  @IsEnum(['asc', 'desc'], { message: 'sortBy must be asc or desc' })
  @IsOptional()
  orderBy?: Order;
}

export interface PagedResponse<T> {
  page: number;
  total: number;
  totalPages: number;
  perPage: number;
  data: T[];
}
