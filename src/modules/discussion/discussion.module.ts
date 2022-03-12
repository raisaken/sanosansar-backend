import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [DiscussionService],
  controllers: [DiscussionController]
})
export class DiscussionModule {}
