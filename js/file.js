/**
 * Export filesystem operation methods based on one of 3 alternatives:
 * - node fs (Electron/nw.js) = https://electronjs.org/docs/api/file-object
 * - cordova = https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html
 * - WinRT = https://docs.microsoft.com/en-us/uwp/api/windows.storage
 *
 * - Create file info based on the data available. (name or sku)
 * - Update data to include buy stuff from rpgdrivethru/amazon/catalyst
 *
 * Steps:
 * 1. init and load methods based on platform
 * 2. read storage to see if there is any file located
 * 3. test if saved file paths are still the same
 * 4. mark paths that don't exist as errors
 * 5. add listener to open externally/default app to existing and working
 * 6. add file loader (picker) to get local files
 * 7. rebuild cache of local files and locations
 */