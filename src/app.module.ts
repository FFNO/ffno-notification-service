import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as OneSignal from 'onesignal-node';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

const webPushClient = 'webPushClient';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          auth: {
            user: 'apikey',
            pass: configService.get('SENDGRID_API_KEY'),
          },
        },
        defaults: {
          from: '"nest-modules" <khangtd1@smartosc.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: webPushClient,
      useFactory: (configService: ConfigService) => {
        const appId = configService.get('ONE_SIGNAL_APP_ID');
        const apiKey = configService.get('ONE_SIGNAL_API_KEY');
        return new OneSignal.Client(appId, apiKey);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
