import { SdrComicBookReader } from './reader';
import { SdrButton } from '../../components/button/button';
import { SdrMenuBar } from '../../components/menu-bar/menu-bar';

customElements.define('sdr-cbz-reader', SdrComicBookReader);
customElements.define('sdr-button', SdrButton);
customElements.define('sdr-menu-bar', SdrMenuBar);

SdrComicBookReader.updateFromURL();
