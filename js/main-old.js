// Constants

const thumbsFolder = './thumbs/';

let selectedCard = null;

// Functions

function dehumanizeSize(humanSize){
	const powers = {'k': 1, 'm': 2, 'g': 3, 't': 4};
	const regex = /(\d+)(?:\.(\d+))?\s?(k|m|g|t)?b?/i.exec(humanSize);
	let result = regex[1] * 1024 ** powers[regex[3].toLowerCase()];

	if (regex[2]) {
		result = result + regex[2] * 1024 ** (powers[regex[3].toLowerCase()] - 1)
	}

	return result;
}

function humanizeSize(size, precision=4){
	const units = [' B', ' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
	const exp = Math.min(Math.floor(Math.log10(size) / 3), units.length - 1);

	return `${(size / 1024 ** exp).toPrecision(precision)} ${units[exp]}`;
}

function toogleCardDetails(evt){
	evt.stopPropagation();
	evt.preventDefault();

	selectedCard = this.parentElement;

	const cardData = data.get(selectedCard.id);
	const itemDetails = document.getElementById('itemDetails');

	itemDetails.querySelector('.title').innerText = cardData.name;
	itemDetails.querySelector('.sku').innerText = cardData.sku.join(', ');
	itemDetails.querySelector('.edition').innerText = cardData.edition;
	itemDetails.querySelector('.gameDate').innerText = (new Date(cardData.gameDate)).toLocaleDateString('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'});
	itemDetails.querySelector('.category').innerText = cardData.category;
	itemDetails.querySelector('.type').innerText = cardData.type;
	itemDetails.querySelector('.publisher').innerText = cardData.publisher.join(', ');
	itemDetails.querySelector('.description').innerText = cardData.description;

	if (cardData.releaseDate) {
		itemDetails.querySelector('.releaseDate').innerText = cardData.releaseDate.map((date) => (new Date(date)).toLocaleDateString('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'})).join(', ');
	} else {
		itemDetails.querySelector('.releaseDate').innerText = 'Unreleased';
	}

	if (cardData.notes) {
		itemDetails.querySelector('.notes').innerText = cardData.notes;
	}

	if (cardData.files) {
		const files = itemDetails.querySelector('.files ul');
		cardData.files.forEach((file) => {
			const li = document.createElement('li');
			const a = document.createElement('a');

			a.href = file.url || file.path;
			a.innerText = `${file.name || file.url || file.path} (${humanizeSize(file.size)})`;

			li.appendChild(a);
			files.appendChild(li);
		});
	} else {
		itemDetails.querySelector('.files').classList.add('hidden');
	}
}


// Data filter
document.getElementById('loadOverlay').classList.toggle('hidden');
main.classList.toggle('hidden');