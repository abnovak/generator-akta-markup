var fs = require('fs');
var ncp = require('ncp').ncp;
var http = require('http');
var rmdir = require('rimraf');


var data = fs.readFileSync('./file_config.json'), urls;

try {
    urls = JSON.parse(data);
    // console.dir(urls);
  }
  catch (err) {
    console.log('There has been an error parsing your JSON.')
    console.log(err);
  }
  
var path = 'build',
url_base = 'http://localhost:1337/';

rmdir(path, function() {
	fs.mkdirSync(path);
	urls.forEach(function(page) {
		var file = fs.createWriteStream(path + '/' + page);
		var request = http.get(url_base + page, function(response) {
		  response.pipe(file);
		});
	});

	ncp('app/css', path + '/css', function (err) {});
	ncp('app/img', path + '/img', function (err) {});
	ncp('app/js', path + '/js', function (err) {});
	ncp('app/less', path + '/less', function (err) {});
});