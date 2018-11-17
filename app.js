var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
//init app
var app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static path
app.use(express.static(path.join(__dirname, 'public')));
//home route
app.get('/', function (req, res) {
	res.render('public');
});

app.get("/allData", function (req, res) {
	console.log(req.url);
	console.log(req.query);
	var temp = req.query;
	var data = temp.newData;

	urlNp = "http://api.openweathermap.org/data/2.5/weather?lat=" + req.query.lat + "&lon=" + req.query.lon + "&appid=ba6ef401f6d70d1c7f50509ad91be1d0";

	var urlNew = urlNp.replace(/ /g, '+');
	console.log(urlNp);
	var urlNew = encodeURI(urlNp);
	request.get({
		url: urlNew,
		json: true,
		headers: { 'User-Agent': 'request' }
	}, (err, response, data) => {
		if (err) {
			console.log('Error:', err);
		}
		else if (res.statusCode !== 200) {
			console.log('Status:', response.statusCode);
		} else {

			console.log(data);
			res.setHeader('content-type', 'application/json');
			res.json(data);
		}
	});

});

//start server
app.listen(8888, function () {
	console.log('Server started on port 8888..')
});
