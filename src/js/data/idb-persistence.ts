import { type DBSchema, type IndexKey, type IndexNames, openDB, type StoreNames } from 'idb';
import type { FileSystemEntryForMaterial, Material, MaterialCover } from '../../data/data';

interface DatabaseSchema extends DBSchema {
	items: {
		key: string,
		value: Omit<Material, 'cover'>,
		indexes: {
			sku: string[],
			name: string,
			category: string,
			type: string
		}
	};
	files: {
		key: string,
		value: FileSystemEntryForMaterial,
		indexes: { fileName: string, filePath: string, itemId: string, hash: string }
	};
	covers: {
		key: string,
		value: MaterialCover
	};
	thumbs: {
		key: string,
		value: MaterialCover
	};
	emulator: {
		key: string,
		value: File
	};
}

type Collections = StoreNames<DatabaseSchema>;

const IDB_VERSION = 102;
const database = openDB<DatabaseSchema>('SDRLog', IDB_VERSION, {
	upgrade(store) {
		if (!store.objectStoreNames.contains('items')) {
			const items = store.createObjectStore('items');

			items.createIndex('sku', 'sku', { multiEntry: true, unique: false });
			items.createIndex('name', 'name', { unique: false });
			items.createIndex('category', 'category', { unique: false });
			items.createIndex('type', 'type', { unique: false });
		}

		if (!store.objectStoreNames.contains('files')) {
			const file = store.createObjectStore('files', { autoIncrement: true });

			file.createIndex('fileName', 'fileName', { unique: false });
			file.createIndex('filePath', 'filePath', { unique: false });
			file.createIndex('itemId', 'itemId', { unique: false });
			file.createIndex('hash', 'hash', { unique: false });
		}

		if (!store.objectStoreNames.contains('covers')) {
			store.createObjectStore('covers');
		}

		if (!store.objectStoreNames.contains('thumbs')) {
			store.createObjectStore('thumbs');
		}

		if (!store.objectStoreNames.contains('emulator')) {
			store.createObjectStore('emulator');
		}
	}
});

export async function getIDBItem<T extends Collections>(collection: T, key: DatabaseSchema[T]['key']) {
	return (await database).get<T>(collection, key);
}

export async function getAllIDBValues<T extends Collections>(collection: T) {
	return (await database).getAll<T>(collection);
}

export async function getAllIDBKeys<T extends Collections>(collection: T) {
	return (await database).getAllKeys(collection);
}

export async function getAllIDBEntries<T extends Collections>(collection: T) {
	const values = await getAllIDBValues(collection);
	const keys = await getAllIDBKeys(collection);
	const results: [DatabaseSchema[T]['key'], DatabaseSchema[T]['value']][] = [];

	for (let i = 0; i < keys.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		results.push([keys[i]!, values[i]!]);
	}

	return results;
}

export async function getIDBItemsByIndex<T extends Collections, I extends IndexNames<DatabaseSchema, T>>(
	collection: T,
	index: I,
	value: IDBKeyRange | IndexKey<DatabaseSchema, T, I>
) {
	return (await database).getAllFromIndex(collection, index, value);
}

export async function getIDBItemByIndex<T extends Collections, I extends IndexNames<DatabaseSchema, T>>(collection: T, index: I, value: IndexKey<DatabaseSchema, T, I>) {
	return (await database).getFromIndex(collection, index, value);
}

export async function setIDBItem<T extends Collections>(collection: T, key: DatabaseSchema[T]['key'] | undefined, value: DatabaseSchema[T]['value']) {
	return (await database).put(collection, value, key);
}

export async function setIDBItems<T extends Collections>(collection: T, items: [DatabaseSchema[T]['key'], DatabaseSchema[T]['value']][]) {
	const transaction = (await database).transaction(collection, 'readwrite');

	try {
		for (const [key, value] of items) {
			 
			await transaction.store.put(value, key);
		}

		transaction.commit();
	} catch (err) {
		console.error(err);

		transaction.abort();
	}
}
