import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateFileDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file?: any;
}

export class UpdateFileDto extends PartialType(CreateFileDto) {}
