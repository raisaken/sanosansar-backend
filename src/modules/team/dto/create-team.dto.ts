import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateTeamDto {
    @ApiProperty({ type: String })
    name: string;
    
    @ApiProperty({ type: String })
    description?: string;
    
    @ApiProperty({ type: String })
    position?: string;
    
    @ApiProperty({ type: String })
    order?: number;
    
    @ApiProperty()
    phone?: number;
    
    @ApiProperty({ type: String })
    email?: string;
    
    @ApiProperty({ type: String })
    facebookLink?: string;
    
    @ApiProperty({ type: String })
    twitterLink?: string;
    
    @ApiProperty({ type: String })
    instagramLink?: string;
    
    @IsOptional()
    @ApiProperty({ type: String, description: 'image url(from file upload)' })
    image?: string;
    
    @IsOptional()
    @ApiProperty({ type: String })
    slug?: string;
}
