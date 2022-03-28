export class HostUtil {
	constructor() { }

	static normalize(host, port) {
		if (port === 80 || port === 443)
			port = "";

		return port === "" ? host : host + ":" + port;
	}
}