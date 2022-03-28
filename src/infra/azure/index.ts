import { EventHubProducerClient, EventHubConsumerClient } from "@azure/event-hubs";





export class AzureEnventConsumer {
	private consumer: EventHubConsumerClient
	private consumerGroup: string = "$default"
	constructor(connectionString: string, eventHubName: string, consumerGroup?: string) {
		this.consumerGroup = consumerGroup
		this.consumer = new EventHubConsumerClient(consumerGroup, connectionString, this.consumerGroup);
	}


}


const producerClient = new EventHubProducerClient("my-connection-string", "my-event-hub");
const consumerClient = new EventHubConsumerClient(
	"my-consumer-group",
	"my-connection-string",
	"my-event-hub"
);