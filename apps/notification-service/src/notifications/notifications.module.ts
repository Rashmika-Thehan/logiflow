import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NOTIFICATIONS_QUEUE } from '../queue/email-job';
import { EmailService } from '../email/email.service';
import { EmailProcessor } from '../queue/email.processor';
import { NotificationsService } from './notifications.service';
import { AlertsService } from '../alerts/alerts.service';
import { AlertsController } from '../alerts/alerts.controller';
import { EventsConsumer } from '../consumers/events.consumer';
import { TemplateService } from '../email/template.service';

@Module({
    imports: [BullModule.registerQueue({ name: NOTIFICATIONS_QUEUE })],
    controllers: [AlertsController],
    providers: [EmailService, TemplateService, EmailProcessor, NotificationsService, AlertsService, EventsConsumer],
})
export class NotificationsModule { }