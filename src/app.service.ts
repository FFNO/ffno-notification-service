import { Inject, Injectable } from '@nestjs/common';
import * as OneSignal from 'onesignal-node';

@Injectable()
export class AppService {
  constructor(
    @Inject('webPushClient') private readonly client: OneSignal.Client,
  ) {}

  async sendNotification({
    title,
    content,
    memberId,
  }: {
    title: string;
    content: string;
    memberId: string;
  }) {
    console.log({ title, content, memberId });

    const response = await this.client.createNotification({
      headings: {
        en: title,
      },
      contents: {
        en: content,
      },
      filters: [
        {
          field: 'tag',
          key: 'memberId',
          value: memberId,
          relation: '=',
        },
      ],
    });
    return response;
  }
}
