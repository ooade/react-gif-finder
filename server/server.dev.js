var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require('../config/webpack.config.dev');

var app = express();
var port = process.env.PORT || 3000;
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.disable('x-powered-by');

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('==> 🌎 App Listening on port %s', port);
});
