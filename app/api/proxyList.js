const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    (async () => {
      const browser = await puppeteer.launch({ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService']})
      const page = await browser.newPage()
      await page.goto('https://free-proxy-list.net/', { waitUntil: 'load', timeout: 0 })  
      const proxyList = await page.$$eval('#proxylisttable tbody tr', el => el.map(o =>{
        const rowData = o.querySelectorAll('td');
        return {ip : rowData[0].textContent, port : rowData[1].textContent, hasHttps : rowData[6].textContent};
      }))

      global.proxyList = proxyList;
      res.json(proxyList);
      await browser.close()
    })()
  } catch (err) {
    console.error(err)
    res.json(err);
  }
});

module.exports = router;
