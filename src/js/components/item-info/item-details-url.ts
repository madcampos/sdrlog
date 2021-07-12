import { getMaterial } from '../data-operations/idb-persistence';
import { ItemDetails } from './item-details';

export async function updateItemModalFromURL() {
	const url = new URL(window.location.toString());

	if (url.hash === '#information') {
		return;
	}

	const id = url.hash.replace('#', '');
	const material = await getMaterial(id);

	if (material) {
		await ItemDetails.openMaterialModal(id, material.name);
	}
}
