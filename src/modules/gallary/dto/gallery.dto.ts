import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateGalleryDto {
    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    description?: string;
    
    @ApiProperty({ type: String })
    type?: string;
    
    @ApiProperty({ type: String })
    url: string;

    @ApiProperty({ type: Date })
    timeToPublish?: Date;

    @ApiProperty({ type: Boolean })
    isActive?: boolean;

    @ApiProperty({ type: Boolean })
    isPaid?: boolean;

    @ApiProperty({ type: String })
    class?: string;
}

export class UpdateGalleryDto extends PartialType(CreateGalleryDto) {}
