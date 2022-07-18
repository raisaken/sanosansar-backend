import { ApiProperty } from "@nestjs/swagger";

export class CreatePageDto {
    name: string;
    title: string;
    description?: string;
    
    @ApiProperty({ type: 'string', format: 'binary' })
    image?: any;
}
