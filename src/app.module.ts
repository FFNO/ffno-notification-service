import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as OneSignal from 'onesignal-node';
import { ConfigModule, ConfigService } from '@nestjs/config';

const webPushClient = 'webPushClient';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
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
