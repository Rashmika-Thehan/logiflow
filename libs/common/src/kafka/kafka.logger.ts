import { Logger } from '@nestjs/common';
import { Kafka, logLevel, LogEntry } from 'kafkajs';

export const createKafkaLogger = (clientId: string) => {
    const logger = new Logger(`Kafka:${clientId}`);

    return (_level: logLevel) => ({ level, log }: LogEntry) => {
        const { message, ...extra } = log;

        // Filter out routine protocol chatter that floods the terminal
        if (
            typeof message === 'string' &&
            (message.includes('Response Heartbeat') ||
                message.includes('Response JoinGroup') ||
                message.includes('Response LeaveGroup') ||
                message.includes('Response SyncGroup'))
        ) {
            return;
        }

        let cleanMessage = String(message ?? '');

        // Transform noisy Kafka messages into clean, concise 1-liners
        if (cleanMessage.includes('Consumer has joined the group')) {
            cleanMessage = `Consumer joined group "${extra.groupId ?? ''}"`;
        } else if (cleanMessage.includes('The group is rebalancing, re-joining')) {
            cleanMessage = `Rebalancing group "${extra.groupId ?? ''}", re-joining...`;
        } else if (cleanMessage.includes('Restarting the consumer')) {
            cleanMessage = `Reconnecting consumer for group "${extra.groupId ?? ''}"...`;
        } else if (extra.error) {
            cleanMessage = `${cleanMessage}: ${extra.error}`;
        }

        switch (level) {
            case logLevel.ERROR:
                logger.error(cleanMessage);
                break;
            case logLevel.WARN:
                logger.warn(cleanMessage);
                break;
            case logLevel.INFO:
                logger.log(cleanMessage);
                break;
            default:
                break;
        }
    };
};

export function createKafkaClient(clientId: string, customBrokers?: string[]) {
    const brokers = customBrokers ?? (process.env.KAFKA_BROKER ?? 'localhost:9092').split(',');
    return new Kafka({
        clientId,
        brokers,
        logLevel: logLevel.INFO,
        logCreator: createKafkaLogger(clientId),
    });
}
