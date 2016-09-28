var path = require('path');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use('/', express.static(process.cwd() + '/public'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('==> 🌎 App Listening on port %s', port);
});
