import { FormDataRequest } from 'nestjs-form-data';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto, UpdateDiscussionDto } from './dto/discussion.dto';
import { DiscussionInput } from './dto/discussion.input';
import { UploadService } from '../upload/upload.service';
import { UserService } from '../user/services/user.service';

@ApiTags('discussion')
@Controller('discussion')
@FormDataRequest()
@ApiBearerAuth('authorization')
export class DiscussionController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
    private readonly discussionService: DiscussionService
  ) { }

  @Post()
  async create(@Req() req, @Body() createDicussionDto: CreateDiscussionDto) {
    const { user } = req?.auth;
    const { title, description, parent, type, files } = createDicussionDto;
    const categoryInput: DiscussionInput = {
      type,
      title,
      description,
      createdBy: user.id,
      updatedBy: user.id,
    };
    if (files) {
      const imageInfo = await this.uploadService.uploadMedia(files);
      categoryInput.media = [{ id: imageInfo.asset_id, url: imageInfo.secure_url, dimesion: `${imageInfo.width}x${imageInfo.height}` }];
    }
    if (parent) {
      categoryInput.parent = await this.discussionService.findOne(
        createDicussionDto.parent,
      );
    }
    return this.discussionService.create(categoryInput);
  }

  @Get()
  findAll() {
    return this.discussionService.findAll();
  }

  @Get('/tree')
  findCategoryTree() {
    return this.discussionService.findTree();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateDiscussionDto: UpdateDiscussionDto,
  ) {
    return this.discussionService.update(+id, UpdateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionService.remove(+id);
  }

  @Post('/like/:id')
  async like(@Req() req, @Param('id') id: string) {
    const { user } = req?.auth;
    return this.discussionService.like({
      discussion: +id,
      user: user.id
    });
  }
}
