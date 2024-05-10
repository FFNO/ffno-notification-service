import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  EmailPayload,
  NOTIFICATION_PATTERNS,
  NotificationPayload,
} from 'src/libs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(NOTIFICATION_PATTERNS.SEND_WEB_PUSH)
  sendNotification(@Body() body: NotificationPayload) {
    return this.appService.sendNotification(body);
  }

  @MessagePattern(NOTIFICATION_PATTERNS.SEND_EMAIL)
  sendEmail(@Body() body: EmailPayload) {
    return this.appService.sendEmail(body);
  }
}
