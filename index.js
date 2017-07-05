var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.set('view engine', 'js');

app.get('/', function(request, response) {
  response.render('pages/client');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});