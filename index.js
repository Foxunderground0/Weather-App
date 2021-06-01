var express = require('express');
var bodyParser = require('body-parser');
var http = require('http')
var app = express();
var count = 0;

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render("index");
})


app.post('/getweather', function (req, res) {
	let weather_data;
	let data_buffer =[];
	var buffer;
	//console.log(req.body);
	http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&units=metric&appid=235a00b3c6dc62cc5cd17446e4ac2fc9`, 
	(response) => {
		if (response.statusCode === 200) {
		  response.on("data", (data) => {
			data_buffer.push(data);
		  }
		 ).on('end', () => {
		 buffer = Buffer.concat(data_buffer);
        	weather_data =  buffer.toString();
			console.log(weather_data);
			res.send(weather_data);
		}
		 )}
	}
	);
  })
let port = process.env.PORT || 8081;
var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log(`Example app listening at http://${host}:${port}`)
})

