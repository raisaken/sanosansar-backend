import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'name of the category' })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  time?: string;

  @ApiProperty({ type: Number })
  score?: number;

  @ApiProperty({ type: Number })
  parent?: number
}
