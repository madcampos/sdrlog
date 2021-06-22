export declare function setPDFNetworkStreamFactory(pdfNetworkStreamFactory: (params: DocumentInitParameters) => Promise<ReadableStream>): Promise<ReadableStream>;
type TypedArray = Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array;

interface GetViewportParameters {
	scale: number,
	rotation?: number,
	offsetX?: number,
	offsetY?: number,
	dontFlip?: boolean
}

interface GetTextContentParameters {
	normalizeWhitespace: boolean,
	disableCombineTextItems: boolean,
	includeMarkedContent?: boolean
}

interface TextItem {
	str: string,
	dir: string,
	transform: unknown[],
	width: number,
	height: number,
	fontName: string
}

interface TextMarkedContent {
	type: string,
	id: string
}

interface TextStyle {
	ascent: number,
	descent: number,
	vertical: boolean,
	fontFamily: string
}

interface TextContent {
	items: (TextItem | TextMarkedContent)[],
	styles: Record<string, TextStyle>
}

interface GetAnnotationsParameters {
	intent: string
}

interface PageViewportParameters {
	viewBox: [xMin: number, yMin: number, xMax: number, yMax: number],
	scale: number,
	rotation: number,
	offsetX?: number,
	offsetY?: number,
	dontFlip?: boolean
}

interface PageViewportCloneParameters {
	scale: number,
	rotation: number,
	offsetX?: number,
	offsetY?: number,
	dontFlip?: boolean
}

interface PageViewport {
	clone(params: PageViewportCloneParameters): PageViewport,
	convertToViewportPoint(x: number, y: number): Object,
	convertToViewportRectangle(rect: [xMin: number, yMin: number, xMax: number, yMax: number]): [x: number, y: number],
	convertToPdfPoint(x: number, y: number): Object,
	viewBox: [xMin: number, yMin: number, xMax: number, yMax: number],
	scale: number,
	rotation: number,
	offsetX: number,
	offsetY: number,
	dontFlip: boolean,
	width: number,
	height: number
}

interface RenderParameters {
	canvasContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null,
	viewport: PageViewport,
	intent?: string,
	renderInteractiveForms?: boolean,
	transform?: unknown[],
	imageLayer?: Object,
	canvasFactory?: Object,
	background?: Object | string,
	includeAnnotationStorage?: boolean,
	optionalContentConfigPromise?: Promise<Object>
}

interface StructTreeContent {
	type: string,
	id: string
}

interface StructTreeNode {
	children: (StructTreeNode | StructTreeContent)[],
	role: string
}


interface PDFOperatorList {
	fnArray: number[],
	argsArray: unknown[]
}


interface PDFWorkerParameters {
	name?: string,
	port?: Object,
	verbosity?: number
}

export interface PDFDataRangeTransport {
	length: number,
	initialData: Uint8Array,
	progressiveDone?: boolean,
	contentDispositionFilename?: string
}

interface DocumentInitParameters {
	url?: string|URL,
	data?: TypedArray|number[]|string,
	httpHeaders?: Object,
	withCredentials?: boolean,
	password?: string,
	initialData?: TypedArray,
	length?: number,
	range?: PDFDataRangeTransport,
	rangeChunkSize?: number,
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	worker: PDFWorker,
	verbosity?: number,
	docBaseUrl?: string,
	cMapUrl?: string,
	cMapPacked?: boolean,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CMapRenderFactory?: Object,
	stopAtErrors?: boolean,
	maxImageSize?: number,
	isEvalSupported?: boolean,
	disableFontFace?: boolean,
	fontExtraProperties?: boolean,
	enableXfa?: boolean,
	ownerDocument?: HTMLDocument,
	disableRange?: boolean,
	disableStream?: boolean,
	disableAutoFetch?: boolean,
	pdfBug?: boolean
}

interface PDFDocumentLoadingTask {
	docId: string,
	destroyed: boolean,
	onPassword(cd: Function, reason: string): unknown,
	onProgress({ loaded, total }: { loaded: number, total: number }): unknown,
	onUnsuportedFeature(unsuportedFeatures: unknown): unknown,
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	promise: Promise<PDFDocumentProxy>,
	destroy(): Promise<void>
}

export declare function getDocument(src: string | URL | TypedArray | PDFDataRangeTransport | DocumentInitParameters): PDFDocumentLoadingTask;


interface RefProxy {
	num: number,
	gen: number
}


interface OutlineNode {
	title: string,
	bold: boolean,
	italic: boolean,
	color: Uint8ClampedArray,
	dest: string | unknown[] | null,
	url: string | null,
	unsafeUrl: string | undefined,
	newWindow: boolean | undefined,
	count: number | undefined,
	items: OutlineNode[]
}

interface MarkInfo {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Marked: boolean,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	UserProperties: boolean,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Suspects: boolean
}


interface PDFDocumentStats {
	streamTypes: Record<string, boolean>,
	fontTypes: Record<string, boolean>
}

declare class Metadata {
	constructor({ parsedData, rawData }: { parsedData: Object, rawData: Object });
	getRaw(): Object;
	get(name: string): string;
	getAll(): Object;

	has(name: string): boolean;
}

interface AnnotationStorage {
	getValue(key: string, defaultValue: Object): Object,
	setValue(key: String, valueObject: Object): void,
	getAll(): Object,
	readonly size: number,
	resetModified(): void,
	readonly serializable: Object
}
export interface PDFDocumentProxy {
	annotationStorage: AnnotationStorage,
	numnPages: number,
	fingerprint: string,
	isPureXfa: boolean,
	getPage(pageNumber: number): Promise<PDFPageProxy>,
	getPageIndex(ref: RefProxy): Promise<number>,
	getDestinations(id: string): Promise<Record<string, unknown[]>>,
	getPageLabels(): Promise<string[] | null>,
	getPageLayout(): Promise<string>,
	getPageMode(): Promise<string>,
	getViewerPreferences(): Promise<Object | null>,
	getOpenAction(): Promise<unknown | null>,
	getAttachments(): Promise<unknown>,
	getJavaScript(): Promise<string[] | null>,
	getJSActions(): Promise<Object | null>,
	getOutline(): Promise<OutlineNode[]>,
	getOptionalContentConfig(): Promise<Object>,
	getPermissions(): Promise<number[] | null>,
	getMetadata(): Promise<{ info: Object, metadata: Metadata }>,
	getMarkInfo(): Promise<MarkInfo | null>,
	getData(): Promise<TypedArray>,
	getDownloadInfo(): Promise<{ length: number }>,
	getStats(): Promise<PDFDocumentStats>,
	cleanup(keepLoadedFonts: boolean): Promise<void>,
	destroy(): Promise<void>,
	loadingParams: DocumentInitParameters,
	loadingTask: PDFDocumentLoadingTask,
	saveDocument(): Promise<Uint8Array>,
	getFileObjects(): Promise<Object[] | null>,
	hasJSActions(): Promise<boolean>,
	getCalculationOrderIds(): Promise<string[] | null>
}

export interface PDFPageProxy {
	pageNumber: number,
	rotate: number,
	ref: Object,
	userUnit: number,
	view: number[],
	getViewport(params: GetViewportParameters): PageViewport,
	getAnnotations(params: GetAnnotationsParameters): Promise<unknown[]>,
	getJSActions(): Promise<Object>,
	getXfa(): Promise<Object | null>,
	render(params: RenderParameters): RenderTask,
	getOperatorList(): Promise<PDFOperatorList>,
	streamTextContent(params: GetTextContentParameters): ReadableStream,
	getTextContent(params: GetTextContentParameters): Promise<TextContent>,
	getStructTree(): Promise<StructTreeNode>,
	cleanup(resetStats: boolean): boolean,
	stats: Object
}

export interface LoopbackPort {
	postMessage(obj: Object, transfers: unknown): void,
	addEventListener(name: string, listener: Function): void,

	removeEventListener(name: string, listener: Function): void,
	terminate(): void
}

export interface PDFWorker {
	port: number,
	name: string,
	verbosity: string,
	destroyed: boolean,
	postMessageTransfers: boolean,
	promise: Promise<Object>,
	messageHandler: Function,
	destroy(): void,
	fromPort(params: PDFWorkerParameters): PDFWorker,
	getWorkerSrc(): string
}


interface RenderTask {
	promise: Promise<void>,
	cancel(): void
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export declare const DefaultCanvasFactory: Object;

// eslint-disable-next-line @typescript-eslint/naming-convention
export declare const DefaultCMapReaderFactory: Object;

export declare const build: string;

export declare const version: string;

export interface PDFjsModule {
	getDocument({ url }: { url: string }): { promise: Promise<PDFDocumentProxy> },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	GlobalWorkerOptions: {
		workerSrc: string
	}
}
