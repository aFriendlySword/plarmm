var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.get('/findservers',function(req, res) {
        res.sendFile(__dirname + '/views/pages/findservers/findservers.html');
});

app.get('/',function(req, res) {
        res.sendFile(__dirname + '/views/pages/index.html');
});
app.use('/',express.static(__dirname + '/views/pages'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});