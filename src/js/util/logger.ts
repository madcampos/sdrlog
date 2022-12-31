const isDebug = import.meta.env.APP_MODE !== 'production';

type ConsoleMethods = 'log' | 'warn' | 'error' | 'info';

export class Logger {
	static #writeLogMessage(message: string | Error, symbol = '⏺️', method: ConsoleMethods = 'log') {
		if (method === 'error') {
			if (message instanceof Error) {
				console.error(`[💾][${symbol}] ${message.name}`);
				console.error(message.message);
				console.error(message.stack);

				// eslint-disable-next-line no-console
				console.trace();
			} else {
				console.error(`[💾][${symbol}] ${message}`);
			}
		} else if (isDebug) {
			// eslint-disable-next-line no-console
			console[method](`[💾][${symbol}] ${message as string}`);
		}
	}

	static log(message: string, symbol = '⏺️') {
		Logger.#writeLogMessage(message, symbol, 'log');
	}

	static error(message: string, error?: Error) {
		Logger.#writeLogMessage(message, '❌', 'error');

		if (error) {
			Logger.#writeLogMessage(error, '❌', 'error');
		}
	}

	static warn(message: string, symbol = '⚠️') {
		Logger.#writeLogMessage(message, symbol, 'warn');
	}

	static info(message: string, symbol = 'ℹ️') {
		Logger.#writeLogMessage(message, symbol, 'info');
	}

	static success(message: string, symbol = '✅') {
		Logger.#writeLogMessage(message, symbol, 'log');
	}

	static appInfo() {
		Logger.#writeLogMessage(`${import.meta.env.APP_NAME} v${import.meta.env.APP_VERSION} (${import.meta.env.MODE})`);
	}
}
