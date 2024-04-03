import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

export const NOTIFICATION_PATTERNS = {
  SEND_WEB_PUSH: 'send_web_push',
};

export interface NotificationPayload {
  title: string;
  content: string;
  memberId: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(NOTIFICATION_PATTERNS.SEND_WEB_PUSH)
  getHello(@Body() body: NotificationPayload) {
    return this.appService.sendNotification(body);
  }
}
