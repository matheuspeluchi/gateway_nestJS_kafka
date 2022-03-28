import { ContainerClient } from "@azure/storage-blob"
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob"


export class CheckpointStore {
	private containerClient: ContainerClient
	constructor() {
		this.containerClient = new ContainerClient(
			process.env.AZURE_STORE,
			process.env.AZURA_STORE_CONTAINER);
	}

	async createContainer() {
		if (!this.containerClient.exists()) {
			await this.containerClient.create(); // This can be skipped if the container already exists
		}
	}

	getCheckPoitnStore() {
		return new BlobCheckpointStore(this.containerClient);
	}
}

