import { SdrItemDetails } from '../item-details/item-details';

export function checkForMatchingId(idToCheck: string) {
	if (window.location.hash === '#information') {
		return false;
	}

	const id = window.location.hash.replace('#', '');

	return id === idToCheck;
}

export function updateItemModalFromURL(id: string, title: string) {
	void SdrItemDetails.openMaterialModal(id, title);
}
