import type { SdrButton } from '../components/SdrButton';
import type { SdrCard } from '../components/SdrCard';
import type { SdrDialog } from '../components/SdrDialog';
import type { SdrDropArea } from '../components/SdrDropArea';

declare global {
	interface HTMLElementTagNameMap {
		'sdr-button': SdrButton,
		'sdr-card': SdrCard,
		'sdr-dialog': SdrDialog,
		'sdr-drop-area': SdrDropArea
	}
}
