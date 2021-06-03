import type { MozJPEGOptions } from './options';

declare type ImagePointer = number;

export interface MozJPEGModule extends EmscriptenModule {
	encode(image: BufferSource, imageWidth: number, imageHeight: number, inputChannels: number, outputOptions: MozJPEGOptions): ImagePointer,
	getImage(imagePointer: ImagePointer): Buffer,
	freeImage(imagePointer: ImagePointer): void
}

export default function(mozjpeg?: { onRuntimeInitialized(): void }): Promise<MozJPEGModule>;
