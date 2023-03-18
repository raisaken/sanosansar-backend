import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateDownloadDto {
    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    description?: string;
    
    @ApiProperty({ type: String })
    type?: string;
    
    @ApiProperty({ type: String })
    url: string;

    @ApiProperty({ type: Boolean })
    isPaid?: boolean;

    @ApiProperty({ type: String })
    thumbnail?: string; 

    @ApiProperty({ type: String })
    class?: string;
}

export class UpdateDownloadDto extends PartialType(CreateDownloadDto) {}
