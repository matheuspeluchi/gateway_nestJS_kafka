import { EventEmitter } from "events";

// import { RegistryProxy } from "../Proxy/RegistryProxy";


export class EventSource {
	private emitter: EventEmitter
	private obj: any

	constructor(proxyRepository, policeRepository) {
		this.emitter = new EventEmitter();
		// const registryProxy = new RegistryProxy(proxyRepository, policeRepository);

		this.obj = null;

		// this.emitter.on("registry", async () => await registryProxy.executar(this.obj));

	}

	async emit(event, object) {
		this.obj = object;
		this.emitter.emit(event);
		this.obj = null;
	}
}
