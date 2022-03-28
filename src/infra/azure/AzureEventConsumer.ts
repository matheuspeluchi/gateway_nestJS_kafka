import { earliestEventPosition, EventHubConsumerClient } from "@azure/event-hubs";
import { CheckpointStore } from "./CheckpointStore";

export class AzureEventConsumer {
	public consumerClient: EventHubConsumerClient
	private connectionString: string = process.env.AZURE_ENDPOINT
	private consumerGroup: string = "gateway"
	private store = new CheckpointStore();


	constructor(topic: string) {
		this.store.createContainer()
		const checkpointStore = this.store.getCheckPoitnStore();
		this.consumerClient = new EventHubConsumerClient(this.consumerGroup, this.connectionString, topic, checkpointStore);
	}

	subscription() {
		this.consumerClient.subscribe(

			{
				processEvents: async (events, context) => {

					if (events.length === 0) {
						console.log(`No events received within wait time. Waiting for next interval`);
						return;
					}

					for (const event of events) {
						console.log(event)
						// console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);

					}
					// Update the checkpoint.
					await context.updateCheckpoint(events[events.length - 1]);
				},
				processError: async (err, context) => {
					console.log(`Error on partition "${context.partitionId}": ${err}`);
				}
			},
			{
				startPosition: earliestEventPosition
			}
		);

	}


	close() {
		this.consumerClient.close();
	}
}