import { Discussion } from './../../../database/models/discussion.entity';
import { PartialType } from "@nestjs/swagger";

export class Media {
  id?: string;
  url: string;
  dimension?: string;
}

export class DiscussionInput {
  title: string;
  description: string;
  type?: string;
  media?: Media[];
  parent?: Discussion;
  createdBy?: string;
  updatedBy?: string;
  timeToPublish?: Date;
  isActive?: boolean;
}


export class DiscussionLikeInput {
  user: number;
  discussion: number;
}

export class UpdateDiscussionInput extends PartialType(DiscussionInput) { }
export class UpdataeDiscussionLikeInput extends PartialType(DiscussionLikeInput) { }

