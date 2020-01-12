const app = require('./app');
const request = require('request');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

function fetchProxies()
{
    request({
       url: "http://localhost:5000/api/v1/proxy",
       method: "GET",
       timeout: 10000
     }, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         console.log('sucess!' + response);
         clickYoutube();
       } else {
         console.log('error' + response.statusCode);
       }
     });
}

function clickYoutube()
{
  request({
    url: "http://localhost:5000/api/v1/youtube/click?id=https://www.youtube.com/watch?v=_jLohHNrmT4",
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

setInterval(fetchProxies, 600000); // every 10 minutes (300000)

fetchProxies()