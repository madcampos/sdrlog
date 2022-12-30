/* eslint-disable @typescript-eslint/naming-convention */
export interface EmulatorModule extends EmscriptenModule {
	canvas: HTMLCanvasElement,
	_cmd_savefiles(): void,
	_cmd_save_state(): void,
	_cmd_load_state(): void,
	_cmd_toggle_menu(): void,
	_cmd_undo_save_state(): void,
	_cmd_undo_load_state(): void,
	setCanvasSize(width: number, height: number): void,
	pauseMainLoop(): void,
	resumeMainLoop(): void,
	callMain(args: string[]): void,
	FS: typeof FS
}

export interface EmulatorInitializer {
	canvas: HTMLCanvasElement,
	onRuntimeInitialized(): Promise<void> | void
}

export type EmulatorInitializerFunction = (moduleInitializer: EmulatorInitializer) => EmulatorModule;
