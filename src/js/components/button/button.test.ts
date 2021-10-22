/* eslint-env mocha */
/* eslint-disable @typescript-eslint/no-duplicate-imports */

import { assert } from 'chai';
import { CustomButton } from './button';
import './button';

describe('<custom-button>', () => {
	it('Register the custom element', () => {
		const button = document.createElement('custom-button');

		assert(button instanceof CustomButton);
	});

	it('Can set text correctly', () => {
		const div = document.createElement('div');

		div.innerHTML = '<custom-button>TEST</custom-button>';
		document.body.appendChild(div);

		const button = div.querySelector('custom-button') as CustomButton;

		assert(button.innerHTML === 'TEST');
	});

	it('Text is translated correctly', () => {
		const div = document.createElement('div');

		div.innerHTML = '<custom-button>t("TEST")</custom-button>';
		document.body.appendChild(div);

		const button = div.querySelector('custom-button') as CustomButton;

		assert(button.innerHTML === 'TEST');
	});

	it('Set icon correctly', () => {
		const button = document.createElement('custom-button') as CustomButton;

		button.icon = '💩';

		assert(button.icon === '💩');
	});
});
