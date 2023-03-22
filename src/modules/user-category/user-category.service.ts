import { Injectable } from '@nestjs/common';
import { UserCategory } from 'src/database/models/userCategory.entity';
import { Repository, Connection } from 'typeorm';
import { CategoryInput } from './dto/category.input';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class UserCategoryService {
    private _categoryRepository: Repository<UserCategory>;

  constructor(private _connection: Connection) {
    this._categoryRepository = this._connection.getRepository(UserCategory);
  }

  async create(createCategoryDto: CategoryInput) {
    const newCategory = await this._categoryRepository.save(createCategoryDto);
    return newCategory;
  }

  findAll() {
    return this._categoryRepository.find({ relations: ['children'] });
  }

  findOne(id: number) {
    return this._categoryRepository.findOne(id, { relations: ['children'] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this._categoryRepository.findOneOrFail(id);
    category.name = updateCategoryDto.name || category.name;

    category.description = updateCategoryDto.description || category.description;
    await this._categoryRepository.save(category);
    return category;
  }

  remove(id: number) {
    return this._categoryRepository.delete(id);
  }

  async findTree() {
    const trees = await this._categoryRepository.manager
      .getTreeRepository(UserCategory)
      .findTrees();
    return trees;
  }
}
