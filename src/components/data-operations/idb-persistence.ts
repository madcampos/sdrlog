/* eslint-disable id-length */
import type { Material } from '../../../data/data';

const IDB_VERSION = 2;
let database: IDBDatabase | undefined;

async function databaseFactory() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		let dbRequest: IDBOpenDBRequest;

		if (!database) {
			dbRequest = window.indexedDB.open('SDRLog', IDB_VERSION);

			dbRequest.onupgradeneeded = () => {
				database = dbRequest.result;

				const itemsStore = database.createObjectStore('items');

				itemsStore.createIndex('sku', 'sku', { multiEntry: true, unique: false });
				itemsStore.createIndex('publisher', 'publisher', { multiEntry: true, unique: false });
				itemsStore.createIndex('releaseDate', 'releaseDate', { multiEntry: true, unique: false });
				itemsStore.createIndex('name', 'name', { unique: false });
				itemsStore.createIndex('category', 'category', { unique: false });
				itemsStore.createIndex('type', 'type', { unique: false });
				itemsStore.createIndex('edition', 'edition', { unique: false });
				itemsStore.createIndex('status', 'status', { unique: false });
				itemsStore.createIndex('gameDate', 'gameDate', { unique: false });
				itemsStore.createIndex('originalLanguage', 'originalLanguage', { unique: false });

				const fileStore = database.createObjectStore('files');

				fileStore.createIndex('kind', 'kind', { unique: false });
				fileStore.createIndex('name', 'name', { unique: false });

				database.createObjectStore('covers');
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

type Collections = 'items' | 'covers' | 'files';

async function getIDBItem<T = null>(collection: Collections, name: IDBValidKey) {
	const db = await databaseFactory();
	const transaction = db.transaction([collection], 'readonly');
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

async function getAllIDBItem<T = null>(collection: Collections) {
	const db = await databaseFactory();
	const transaction = db.transaction([collection], 'readonly');
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

async function setIDBItem<T = undefined>(collection: Collections, name: IDBValidKey, value: T) {
	const db = await databaseFactory();
	const transaction = db.transaction([collection], 'readwrite');
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

async function setIDBItems<T = undefined>(collection: Collections, items: [IDBValidKey, T][]) {
	const db = await databaseFactory();
	const transaction = db.transaction([collection], 'readwrite');
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

export async function getMaterial(id: IDBValidKey) {
	return getIDBItem<Material>('items', id);
}

export async function getMaterials() {
	return getAllIDBItem<Material>('items');
}

export async function saveMaterial(id: IDBValidKey, material: Material) {
	return setIDBItem<Material>('items', id, material);
}

export async function saveMaterials(materials: [IDBValidKey, Material][]) {
	return setIDBItems<Material>('items', materials);
}
