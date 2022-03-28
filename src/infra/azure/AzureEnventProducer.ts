import { EventHubProducerClient } from "@azure/event-hubs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AzureEventProducer {
	private producerClient: EventHubProducerClient
	constructor(connectionString: string, eventHubName: string) {
		this.producerClient = new EventHubProducerClient(connectionString, eventHubName);
	}

	async producer(payload: string) {

		const eventDataBatch = await this.producerClient.createBatch();
		let numberOfEventsToSend = 10;

		while (numberOfEventsToSend > 0) {
			let wasAdded = eventDataBatch.tryAdd({ body: payload });
			if (!wasAdded) {
				break;
			}
			numberOfEventsToSend--;
		}

		await this.producerClient.sendBatch(eventDataBatch);
	}
}