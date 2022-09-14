import { Injectable } from '@nestjs/common';
import { DiscussionLike } from 'src/database/models/discussion-like.entity';
import { Discussion } from 'src/database/models/discussion.entity';
import { Connection, Repository } from 'typeorm';
import { UserService } from '../user/services/user.service';
import { UpdateDiscussionDto } from './dto/discussion.dto';
import { DiscussionInput, DiscussionLikeInput } from './dto/discussion.input';

@Injectable()
export class DiscussionService {
  private _discussionReopository: Repository<Discussion>;
  private _discussionLikeReopository: Repository<DiscussionLike>;

  constructor(private _connection: Connection, private readonly userService: UserService) {
    this._discussionReopository = this._connection.getRepository(Discussion);
    this._discussionLikeReopository = this._connection.getRepository(DiscussionLike);
  }

  async create(createDiscussionDto: DiscussionInput) {
    const discussion = await this._discussionReopository.save(createDiscussionDto);
    return discussion;
  }

  findAll() {
    return this._discussionReopository.find({ relations: ['children', 'likes', 'likes.user'], order: { id: 'DESC' } });
  }

  findOne(id: number) {
    return this._discussionReopository.findOne(id, { relations: ['children', 'likes', 'likes.user'] });
  }

  async update(id: number, updateDiscussionDto: UpdateDiscussionDto) {
    const { title, description, type, isActive, timeToPublish } = updateDiscussionDto;
    const discussion = await this._discussionReopository.findOneOrFail(id);
    if (discussion) {
      discussion.type = type || discussion.type;
      discussion.title = title || discussion.title;
      discussion.isActive = isActive === false ? false: isActive || discussion.isActive;
      discussion.description = description || discussion.description;
      discussion.timeToPublish = timeToPublish || discussion.timeToPublish;
      // discussion.media = updateDiscussionDto.file || discussion.media;
      await this._discussionReopository.save(discussion);
    }
    return discussion;
  }

  async remove(id: number) {
    await this._discussionReopository.query(`delete from discussion where "parentId" = ${id}`);
    await this._discussionReopository.query(`delete from discussion_like where discussion_id = ${id}`);
    return this._discussionReopository.delete(id);
  }

  async findTree() {
    const trees = await this._discussionReopository.manager
      .getTreeRepository(Discussion)
      .findTrees({
        relations: ['likes']
      });
    return trees;
  }

  async removeLike(id: number) {
    return this._discussionLikeReopository.delete(id);
  }

  async like(likeInput: DiscussionLikeInput) {
    const existingLike = await this._discussionLikeReopository.findOne({
      where: {
        user: likeInput.user,
        discussion: likeInput.discussion,
      }
    });

    if (existingLike) {
      return await this.removeLike(existingLike.id)
    }
    const discussion = await this.findOne(likeInput.discussion);
    const user = await this.userService.findOne(likeInput.user);
    const like = await this._discussionLikeReopository.save({ discussion, user });
    return like;
  }

}
