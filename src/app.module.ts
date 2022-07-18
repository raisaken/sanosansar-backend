import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CategoryModule } from './modules/category/category.module';
import { AuthMiddleware } from './modules/middlewares/auth.middleware';
import { LoggerMiddleware } from './modules/middlewares/logger.middleware';
import { QuestionModule } from './modules/question/question.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { DiscussionModule } from './modules/discussion/discussion.module';
import { UploadModule } from './modules/upload/upload.module';
import { ContactModule } from './modules/contact/contact.module';
import { FileModule } from './modules/file/file.module';
import { GallaryModule } from './modules/gallary/gallary.module';
import { DownloadModule } from './modules/download/download.module';
import { TeamModule } from './modules/team/team.module';
import { PageModule } from './modules/page/page.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CategoryModule,
    QuestionModule,
    UserModule,
    EventModule,
    DiscussionModule,
    UploadModule,
    ContactModule,
    FileModule,
    GallaryModule,
    DownloadModule,
    TeamModule,
    PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/v1/page/', method: RequestMethod.GET },
        { path: 'api/v1/team/', method: RequestMethod.GET },
        { path: 'api/v1/event/', method: RequestMethod.GET },
        { path: 'api/v1/question/', method: RequestMethod.GET },
        { path: 'api/v1/discussion/', method: RequestMethod.GET },
        { path: 'api/v1/discussion/tree', method: RequestMethod.GET },
        { path: 'api/v1/contact/(.*)', method: RequestMethod.ALL },
        { path: 'api/v1/auth/(.*)', method: RequestMethod.ALL }
        )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
