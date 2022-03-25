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
}

export class UpdateDownloadDto extends PartialType(CreateDownloadDto) {}
