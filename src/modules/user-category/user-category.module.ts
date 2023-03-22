import { Module } from '@nestjs/common';
import { UserCategoryService } from './user-category.service';
import { UserCategoryController } from './user-category.controller';

@Module({
  controllers: [UserCategoryController],
  providers: [UserCategoryService]
})
export class UserCategoryModule {}
