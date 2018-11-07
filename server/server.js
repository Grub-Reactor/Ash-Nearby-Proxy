const express = require('express');
const port = 3000;
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3001';
const serverTwo = 'http://localhost:3004';
const serverThree = 'http://localhost:3005';
const serverFour = 'http://localhost:3002';

app.use(express.static('public'));

// app.use('/', proxy('http://localhost:3004/'));
// app.use('/', proxy('http://localhost:3001/grub-reactor/:id'));

app.all('/grub-reactor/:id/menu', function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: serverOne});
});

app.all('/restaurant/:id', function(req, res) {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, {target: serverTwo});
});

app.all("/restaurants/banners/:rest_id", function(req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: serverThree});
});

app.all("/restaurants/:restaurantID/", function(req, res) {
  console.log('redirecting to Server4');
  apiProxy.web(req, res, {target: serverFour});
});

app.listen(port, () => console.log(`Express is listening on port ${port}!`));