export interface UpdateMessage {
	type: 'update',
	url: string,
	updatedAt: string
}

export interface WorkerReadyMessage {
	type: 'worker-ready',
	status: 'success' | 'fail' | 'offline'
}
