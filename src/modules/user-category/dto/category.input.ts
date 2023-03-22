import { PartialType } from "@nestjs/swagger";
import { UserCategory } from "src/database/models/userCategory.entity";

export class CategoryInput {
  name: string;
  description: string;
  parent?: UserCategory;
  createdBy?: string;
  updatedBy?: string;
}

export class UpdateCategoryInput extends PartialType(CategoryInput) {}
