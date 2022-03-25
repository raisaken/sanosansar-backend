import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateContactDto {
    @ApiProperty({ type: String })
    name: string;

    @IsEmail()
    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    subject: string;

    @ApiProperty({ type: String })
    message: string;
}

export class UpdateContactDto extends PartialType(CreateContactDto) { }
