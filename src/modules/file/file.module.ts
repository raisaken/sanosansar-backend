import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [NestjsFormDataModule, UploadModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
