import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

export const NOTIFICATION_PATTERNS = {
  SEND_EMAIL: 'send_email',
  SEND_WEB_PUSH: 'send_web_push',
};

export interface NotificationPayload {
  title: string;
  content: string;
  memberId: string;
}

export interface EmailPayload<T = any> {
  to: string;
  subject: string;
  template: string;
  context: T;
}

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
