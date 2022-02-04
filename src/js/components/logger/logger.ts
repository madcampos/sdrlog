const isDebug = import.meta.env.MODE !== 'production';

type ConsoleMethods = 'log' | 'warn' | 'error' | 'info';

export class Logger {
	static log(message: string | Error, method: ConsoleMethods = 'log', symbol = '⏺️') {
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

	static error(message: string, error?: Error) {
		Logger.log(message, 'error', '❌');

		if (error) {
			Logger.log(error, 'error', '❌');
		}
	}

	static warn(message: string, symbol = '⚠️') {
		Logger.log(message, 'warn', symbol);
	}

	static info(message: string, symbol = 'ℹ️') {
		Logger.log(message, 'info', symbol);
	}

	static success(message: string, symbol = '✅') {
		Logger.log(message, 'log', symbol);
	}

	static appInfo() {
		Logger.log(`${import.meta.env.APP_NAME} v${import.meta.env.APP_VERSION} (${import.meta.env.MODE})`);
	}
}
