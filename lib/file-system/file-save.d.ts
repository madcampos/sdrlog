/**
 * Saves a file to disk.
 * @returns Optional file handle to save in place.
 */
 export default function fileSave(
	/** To-be-saved blob */
	blob: Blob,

	options?: {
		/** Suggested file name. Defaults to "Untitled". */
		fileName?: string
	}
): Promise<void>;
