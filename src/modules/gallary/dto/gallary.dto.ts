import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateGallaryDto {
    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    description?: string;
    
    @ApiProperty({ type: String })
    type?: string;
    
    @ApiProperty({ type: String })
    url: string;
}

export class UpdateGallaryDto extends PartialType(CreateGallaryDto) {}
