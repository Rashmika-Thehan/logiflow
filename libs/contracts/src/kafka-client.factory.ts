import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export function buildKafkaClientOptions(
    name: string,
    clientId: string,
    brokers: string[],
): ClientProviderOptions {
    return {
        name,
        transport: Transport.KAFKA,
        options: {
            client: { clientId, brokers },
            consumer: { groupId: `${clientId}-consumer` },
        },
    };
}