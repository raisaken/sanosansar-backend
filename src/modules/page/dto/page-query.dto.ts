import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationQueryDto {
//   @IsInt()
//   @IsOptional()
//   @Transform(({ value }) => value && Number.parseInt(value, 10))
//   page?: number;

//   @IsInt()
//   @IsOptional()
//   @Transform(({ value }) => value && parseInt(value, 10))
//   limit?: number;

//   @IsString()
//   @IsOptional()
//   @ApiProperty({ enum: OrderEnum, enumName: 'OrderEnum' })
//   order?: OrderEnum;

  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  name?: string;
}