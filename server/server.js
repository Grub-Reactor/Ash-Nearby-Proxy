const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://ec2-52-43-228-173.us-west-2.compute.amazonaws.com/';
const serverTwo = 'http://localhost:3004';
const serverThree = 'http://localhost:3005';
const serverFour = 'http://localhost:3002';

// const restaurantId = window.location.pathname.split('/')[1];

app.use('/grub-reactor/:id', express.static('public'));

app.all('/grub-reactor/:id/menu', function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: serverOne});
});

app.all('/grub-reactor/:id/carousel', function(req, res) {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, {target: serverTwo});
});

app.all("/restaurants/banners/:rest_id", function(req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: serverThree});
});

app.all("/:restaurantID/allreviews/reviews/*", function(req, res) {
  console.log('redirecting to Server4');
  apiProxy.web(req, res, {target: serverFour});
});

app.listen(port, () => console.log(`Express is listening on port ${port}!`));