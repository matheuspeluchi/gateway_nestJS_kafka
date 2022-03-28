export class RotaUtil {
	constructor() { }

	static createInternalRoute(context: string, route: string) {

		context = this._removeBarraInicioEFim(context);
		route = this._removeBarraInicioEFim(route);
		if (!context) return `/${route}`;

		return `/${context}/${route}`;
	}

	static createExternalRoute(environment, service, route) {
		environment = this._removeBarraInicioEFim(environment);
		service = this._removeBarraInicioEFim(service);
		route = this._removeBarraInicioEFim(route);
		if (!service) {
			return `/${environment}/${route}`;
		}

		let rotaExterna = null;

		if (environment) {
			rotaExterna = `/${environment}/${service}/${route}`;
		} else {
			rotaExterna = `${environment}/${service}/${route}`;
		}

		return rotaExterna;
	}

	static _removeBarraInicioEFim(palavra = "") {
		if (!palavra) return "";
		if (palavra.trim().startsWith("/")) {
			palavra = palavra.substr(1);
		}

		if (palavra.endsWith("/")) {
			palavra = palavra.substr(0, palavra.length - 1);
		}

		return palavra.toLowerCase();
	}
}