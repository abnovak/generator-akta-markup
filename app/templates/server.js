var express = require('express'),
	app = express(),
	swig = require('swig');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/app/templates');

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use('/js', express.static(__dirname + '/app/js'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/img', express.static(__dirname + '/app/img'));

var titles = {};

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/*.html', function (req, res) {
	var page = req.params[0];
	res.render(page, {page: page, title: titles[page]});
});

app.listen(1337);
console.log('Application Started on http://localhost:1337/');