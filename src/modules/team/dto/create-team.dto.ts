import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength } from "class-validator";

export class CreateTeamDto {
    @MaxLength(50)
    @ApiProperty({ type: String })
    name: string;
    
    @ApiProperty({ type: String })
    description?: string;
    
    @MaxLength(50)
    @ApiProperty({ type: String })
    position?: string;
    
    @ApiProperty({ type: String })
    order?: number;
    
    @ApiProperty()
    phone?: number;
    
    @MaxLength(30)
    @IsOptional()
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
