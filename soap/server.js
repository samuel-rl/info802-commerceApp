var soap = require('soap');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
var path = require('path');

const service = {
	price_Service: {
		price_Port: {
			calculatePrice(args) {
				console.log(args);
				const weight = args.weight;
				const country = args.country;
				let frais = 0;
				switch (country) {
					case 'FR':
						frais = 0.5 * weight;
						break;
					case 'BE':
						frais = 1 * weight;
						break;
					default:
						frais = 2 * weight;
						break;
				}
				return { frais: frais };
			},
		},
	},
};

var xml = require('fs').readFileSync('./pricecalculator.wsdl', 'utf8');
soap.listen(app, '/pricecalculator', service, xml);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`server lancé`);
});

app.get('/payementSuccess', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
