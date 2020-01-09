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
       } else {
         console.log('error' + response.statusCode);
       }
     });
}

setInterval(fetchProxies, 300000); // every 5 minutes (300000)

fetchProxies()