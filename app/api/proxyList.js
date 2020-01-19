const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/', (req, res) => {

  try {
    (async () => {
      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
      const page = await browser.newPage()
      await page.goto('https://free-proxy-list.net/', { waitUntil: 'load', timeout: 0 })
      await page.select('select', '80')
      await page.waitFor(1000)
      await page.click('th[aria-label="Anonymity: activate to sort column ascending"]')
      await page.waitFor(1000)
      await page.click('th[aria-label="Anonymity: activate to sort column descending"]')
      const proxyList = await page.$$eval('#proxylisttable tbody tr', el => el.map(o => {
        const rowData = o.querySelectorAll('td');
        return { ip: rowData[0].textContent, port: rowData[1].textContent, hasHttps: rowData[6].textContent };
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

router.get('/listende', (req, res) => {
  try {
    (async () => {
      const puppeteer = require('puppeteer');

      const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })

      const page = await browser.newPage();
      await page.goto('https://www.proxy-listen.de/Proxy/Proxyliste.html', { waitUntil: 'load', timeout: 0 });
      await page.select('#proxies', '300')
      await page.click('#httphttps')
      await page.click('#submit')
      await page.waitForSelector('table[class="proxyList center"]')

      const proxyList = await page.$$eval('table[class="proxyList center"] tr', el => el.map(o => {
        const rowData = o.querySelectorAll('td');
        return { ip: rowData[0].textContent, port: rowData[1].textContent };
      }))

      global.proxyList2 = proxyList

      res.json('success listende');
      await browser.close()
    })()
  } catch (err) {
    console.error(err)
    res.json(err);
  }
});

module.exports = router;
