import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import * as OneSignal from 'onesignal-node';
import { EmailPayload, NotificationPayload } from 'src/libs';

@Injectable()
export class AppService {
  constructor(
    @Inject('webPushClient')
    private readonly client: OneSignal.Client,
    private readonly mailerService: MailerService,
  ) {}

  async sendNotification({ title, content, memberId }: NotificationPayload) {
    console.log({ title, content, memberId });

    try {
      const response = await this.client.createNotification({
        headings: { en: title },
        contents: { en: content },
        filters: [
          {
            field: 'tag',
            key: 'memberId',
            value: memberId,
            relation: '=',
          },
        ],
      });
      console.log(response.body);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async sendEmail({ to, subject, template, context }: EmailPayload) {
    this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
