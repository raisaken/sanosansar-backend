import { Discussion } from './../../../database/models/discussion.entity';
import { PartialType } from "@nestjs/swagger";
import { User } from 'src/database/models/user.entity';

export class DiscussionInput {
  title: string;
  description: string;
  media?: any;
  parent?: Discussion;
  createdBy?: string;
  updatedBy?: string;
}


export class DiscussionLikeInput {
  user: number;
  discussion: number;
}

export class UpdateDiscussionInput extends PartialType(DiscussionInput) {}
export class UpdataeDiscussionLikeInput extends PartialType(DiscussionLikeInput) {}

