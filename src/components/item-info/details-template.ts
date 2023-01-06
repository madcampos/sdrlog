/* eslint-disable no-ternary */
import type { MaterialLink } from '../../../public/data/data';

export function formatLink({ url, title }: MaterialLink, isEditing = false) {
	return `
		<edit-list-item stretch ${isEditing ? 'edit' : ''} value="${encodeURI(JSON.stringify({ title, url }))}">
			<a
				href="${url}"
				target="_blank"
				rel="noopener"
			>${title}</a>
		</edit-list-item>
	`;
}
