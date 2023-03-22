import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryInput } from './dto/category.input';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserCategoryService } from './user-category.service';

@ApiTags('user-category')
@Controller('user-category')
@ApiBearerAuth('authorization')
export class UserCategoryController {
  constructor(private readonly categoryService: UserCategoryService) {}

  @Post()
  async create(@Req() req, @Body() createCategoryDto: CreateCategoryDto) {
    const { user } = req?.auth;
    const { name, description, parent } = createCategoryDto;
    const categoryInput: CategoryInput = {
      name,
      description,
      createdBy: user.id,
      updatedBy: user.id,
    };
    if (parent) {
      categoryInput.parent = await this.categoryService.findOne(
        createCategoryDto.parent,
      );
    }
    return this.categoryService.create(categoryInput);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/tree')
  findCategoryTree() {
    return this.categoryService.findTree();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
