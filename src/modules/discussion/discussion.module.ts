import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { UserModule } from '../user/user.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [NestjsFormDataModule, UserModule, UploadModule],
  providers: [DiscussionService],
  controllers: [DiscussionController]
})
export class DiscussionModule {}
