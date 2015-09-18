
import Receipt from './index';

let r = new Receipt('./templates/index.html');

r.send('gbadi@mailjet.com', {
	products: [
		{name: 'tshirt', quantity: 3, price: '$80'},
		{name: 'trousers', quantity: 2, price: '$90'},
		{name: 'unicorn', quantity: 1, price: '$424242'},
	],
}).then(console.log, console.log);
