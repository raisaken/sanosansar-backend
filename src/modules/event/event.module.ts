import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [EventService],
  controllers: [EventController]
})
export class EventModule {}
