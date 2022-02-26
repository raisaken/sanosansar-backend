import { PartialType } from "@nestjs/swagger";
import { Category } from "src/database/models";

export class CategoryInput {
  name: string;
  description: string;
  time?: string;
  score?: number;
  parent?: Category;
  createdBy?: string;
  updatedBy?: string;
}

export class UpdateCategoryInput extends PartialType(CategoryInput) {}
