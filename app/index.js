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
      console.log('sucess!' + response);
    } else {
      console.log('error' + response);
    }
    clickYoutube()
    fetchProxies2()
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
    } else {
      console.log('error' + response);
    }
  });
}

function clickYoutube() {

  request({
    url: `https://www.youtube.com/watch?v=KorwezlLFjo&t=2s`,
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
    url: `http://localhost:${port}/api/v1/youtube/click2?id=https://www.youtube.com/watch?v=_jLohHNrmT4`,
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

setInterval(fetchProxies, 300100); // every 10 minutes (300000)
setInterval(fetchProxies2, 300100); // every 10 minutes (300000)

fetchProxies()
