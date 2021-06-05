/* eslint-disable id-length */
import type { Material } from '../../../../data/data';

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
				itemsStore.createIndex('name', 'name', { unique: false });
				itemsStore.createIndex('category', 'category', { unique: false });
				itemsStore.createIndex('type', 'type', { unique: false });

				const fileStore = database.createObjectStore('files');

				fileStore.createIndex('kind', 'kind', { unique: false });
				fileStore.createIndex('name', 'name', { unique: false });

				const coverStore = database.createObjectStore('covers');

				coverStore.createIndex('name', 'name', { unique: true });

				const thumbsStore = database.createObjectStore('thumbs');

				thumbsStore.createIndex('name', 'name', { unique: true });
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

type Collections = 'items' | 'covers' | 'thumbs' | 'files';

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

async function getAllIDBKeys(collection: Collections) {
	const db = await databaseFactory();
	const transaction = db.transaction([collection], 'readonly');
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
	return (await getAllIDBItem<Material>('items')).map(({ name, sku }) => ({ id: sku[0], name }));
}

export async function saveMaterial(id: IDBValidKey, material: Material) {
	return setIDBItem<Material>('items', id, material);
}

export async function saveMaterials(materials: [IDBValidKey, Material][]) {
	return setIDBItems<Material>('items', materials);
}
