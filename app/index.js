const app = require('./app');
const request = require('request');

const port = process.env.PORT || 3500;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

function fetchProxies() {

  if (global.working == true) {
    return;
  }

  request({
    url: `http://localhost:${port}/api/v1/proxy`,
    method: "GET",
    timeout: 10000
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('sucess Fetching Proxies!');
      clickYoutube()
    } else {
      console.log('error' + response);
    }
  });
}

function fetchProxies2() {

  if (global.working2 == true) {
    return;
  }

  request({
    url: `http://localhost:${port}/api/v1/proxy/listende`,
    method: "GET",
    timeout: 10000
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('sucess!' + response);
      clickYoutube2()
    } else {
      console.log('error' + response);
    }
  });
}

function clickYoutube() {

  request({
    url: `http://localhost:${port}/api/v1/youtube/click?id=Timetrackgo`,
    method: "GET",
    timeout: 0
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('sucessYoutube!' + response);
    } else {
      console.log('error' + response);
    }
  });
}

function clickYoutube2() {


  request({
    url: `http://localhost:${port}/api/v1/youtube/click2?id=Timetrackgo`,
    method: "GET",
    timeout: 0
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('sucessYoutube2!' + response);
    } else {
      console.log('error' + response);
    }
  });
}

function createGmail() {

  request({
    url: `http://localhost:${port}/api/v1/amazon/`,
    method: "GET",
    timeout: 0
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('sucessYoutube!' + response);
    } else {
      console.log('error' + response);
    }
  });
}