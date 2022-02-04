import type { FileForMaterial, Material } from '../../../../data/data';

type Collections = 'items' | 'covers' | 'thumbs' | 'files' | 'fileItems' | 'emulator' | 'emulatorSaves' | 'emulatorBios';

const IDB_VERSION = Number.parseInt(import.meta.env.APP_VERSION.replaceAll('.', ''));
let database: IDBDatabase | undefined;

const databaseSchema: Record<Collections, { indexes: Record<string, IDBIndexParameters>, storeOptions?: IDBObjectStoreParameters }> = {
	items: {
		indexes: {
			sku: { multiEntry: true, unique: false },
			name: { unique: false },
			category: { unique: false },
			type: { unique: false }
		}
	},
	files: {
		indexes: {
			kind: { unique: false },
			name: { unique: false }
		}
	},
	fileItems: {
		indexes: {
			fileName: { unique: false },
			filePath: { unique: false },
			itemId: { unique: false }
		},
		storeOptions: { autoIncrement: true }
	},
	covers: {
		indexes: {
			name: { unique: true }
		}
	},
	thumbs: {
		indexes: {
			name: { unique: true }
		}
	},
	emulator: {
		indexes: {
			name: { unique: false }
		}
	},
	emulatorSaves: {
		indexes: {
			name: { unique: false }
		}
	},
	emulatorBios: {
		indexes: {
			name: { unique: false }
		}
	}
};

function createDatabseSchema(idb: IDBDatabase) {
	[...Object.entries(databaseSchema)].forEach(([store, { indexes, storeOptions }]) => {
		if (!idb.objectStoreNames.contains(store)) {
			const newStore = idb.createObjectStore(store, storeOptions);

			[...Object.entries(indexes)].forEach(([indexName, indexOptions]) => {
				newStore.createIndex(indexName, indexName, indexOptions);
			});
		}
	});
}

async function databaseFactory() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		let dbRequest: IDBOpenDBRequest;

		if (!database) {
			dbRequest = window.indexedDB.open('SDRLog', IDB_VERSION);

			dbRequest.onupgradeneeded = () => {
				database = dbRequest.result;

				createDatabseSchema(database);
			};

			dbRequest.onsuccess = () => {
				database = dbRequest.result;
				resolve(database);
			};

			dbRequest.onerror = () => {
				reject(dbRequest.error);
			};
		} else {
			resolve(database);
		}
	});
}

async function getIDBItem<T = null>(collection: Collections, name: IDBValidKey) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readonly');
	const store = transaction.objectStore(collection);
	const request = store.get(name);

	return new Promise<T | undefined>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result as T);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

export async function getIDBItemFromIndex<T>(collection: Collections, indexName: string, name: IDBValidKey) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readonly');
	const store = transaction.objectStore(collection);
	const index = store.index(indexName);
	const request = index.getAll(name);

	return new Promise<T[] | undefined>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result as T[]);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function getAllIDBItem<T>(collection: Collections) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readonly');
	const store = transaction.objectStore(collection);
	const request = store.getAll();

	return new Promise<T[]>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result as T[]);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function getAllIDBKeys(collection: Collections) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readonly');
	const store = transaction.objectStore(collection);
	const request = store.getAllKeys();

	return new Promise<IDBValidKey[]>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function setIDBItem<T>(collection: Collections, name: IDBValidKey | undefined, value: T) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readwrite');
	const store = transaction.objectStore(collection);
	const request = store.put(value, name);

	return new Promise<IDBValidKey>((resolve, reject) => {
		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
}

async function setIDBItems<T>(collection: Collections, items: [IDBValidKey, T][]) {
	const idb = await databaseFactory();
	const transaction = idb.transaction([collection], 'readwrite');
	const store = transaction.objectStore(collection);

	items.forEach(([key, value]) => {
		store.put(value, key);
	});

	return new Promise<IDBTransaction>((resolve, reject) => {
		store.transaction.oncomplete = () => {
			resolve(store.transaction);
		};

		store.transaction.onerror = () => {
			reject(store.transaction);
		};
	});
}

export async function saveFile(name: string, handler: FileSystemHandle) {
	return setIDBItem<FileSystemHandle>('files', name, handler);
}

export async function getFile(name: string) {
	return getIDBItem<FileSystemHandle>('files', name);
}

export async function getAllFiles() {
	const files = await getAllIDBItem<FileSystemHandle>('files');

	return files.filter((item) => item.kind === 'file' && item.name !== 'data.json') as FileSystemFileHandle[];
}

export async function saveThumb(id: string, thumb: File) {
	return setIDBItem<File>('thumbs', id, thumb);
}

export async function getThumb(id: string) {
	return getIDBItem<File>('thumbs', id);
}

export async function getAllThumbs() {
	return getAllIDBItem<File>('thumbs');
}

export async function saveCover(id: string, cover: File) {
	return setIDBItem<File>('covers', id, cover);
}

export async function getCover(id: string) {
	return getIDBItem<File>('covers', id);
}

export async function getAllCovers() {
	return getAllIDBItem<File>('covers');
}

export async function getMaterial(id: IDBValidKey) {
	return getIDBItem<Material>('items', id);
}

export async function getMaterials() {
	return getAllIDBItem<Material>('items');
}

export async function getMaterialIds() {
	return getAllIDBKeys('items');
}

export async function getMaterialsBasicInfo() {
	return (await getAllIDBItem<Material>('items')).map(({ name, sku, category, type, edition, status }) => ({
		id: sku[0],
		name,
		sku,
		category,
		type,
		edition,
		status
	}));
}

export async function saveMaterial(id: IDBValidKey, material: Material) {
	return setIDBItem<Material>('items', id, material);
}

export async function saveMaterials(materials: [IDBValidKey, Material][]) {
	return setIDBItems<Material>('items', materials);
}

export async function getFilesForMaterial(itemId: string) {
	return getIDBItemFromIndex<FileForMaterial>('fileItems', 'itemId', itemId);
}

export async function setFileForMaterial(fileForMaterial: FileForMaterial) {
	return setIDBItem<FileForMaterial>('fileItems', undefined, fileForMaterial);
}

export async function getBundleFiles() {
	const files = await getAllIDBItem<File>('emulator');
	const paths = await getAllIDBKeys('emulator') as string[];
	const results: Record<string, File> = {};

	for (let i = 0; i < files.length; i++) {
		results[paths[i]] = files[i];
	}

	return results;
}

export async function saveBundleFile(path: string, file: File) {
	return setIDBItem('emulator', path, file);
}

export async function getBiosFiles() {
	const files = await getAllIDBItem<File>('emulatorBios');
	const paths = await getAllIDBKeys('emulatorBios') as string[];
	const results: Record<string, File> = {};

	for (let i = 0; i < files.length; i++) {
		results[paths[i]] = files[i];
	}

	return results;
}

export async function saveBiosFile(path: string, file: File) {
	return setIDBItem('emulatorBios', path, file);
}

export async function getEmulatorSaveFile(name: string) {
	return getIDBItem<File>('emulatorSaves', name);
}

export async function saveEmulatorSaveFile(name: string, file: File) {
	return setIDBItem('emulatorSaves', name, file);
}
