/**
 * Opens a directory from disk using the File System Access API.
 * @returns Contained files.
 */
 export default function directoryOpen(options?: {
	/** Whether to recursively get subdirectories. */
	recursive: boolean,

	/**
	 * Configurable cleanup and `Promise` rejector usable with legacy API for
	 * determining when (and reacting if) a user cancels the operation. The
	 * method will be passed a reference to the internal `rejectionHandler` that
	 * can, e.g., be attached to/removed from the window or called after a
	 * timeout. The method should return a function that will be called when
	 * either the user chooses to open a file or the `rejectionHandler` is
	 * called. In the latter case, the returned function will also be passed a
	 * reference to the `reject` callback for the `Promise` returned by
	 * `fileOpen`, so that developers may reject the `Promise` when desired at
	 * that time.
	 * ToDo: Remove this workaround once
	 *   https://github.com/whatwg/html/issues/6376 is specified and supported.
	 */
	setupLegacyCleanupAndRejection?: (
		rejectionHandler?: () => void
	) => (reject: (reason?: any) => void) => void
}): Promise<File[]>;