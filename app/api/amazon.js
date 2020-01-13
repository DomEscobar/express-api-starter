const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/', (req, res) => {

  try {

    (async () => {
      const browser = await puppeteer.launch({ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=148.251.200.192:1080', '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService']})
      const page = await browser.newPage()
      await page.goto('https://duckduckgo.com/', { waitUntil: 'load', timeout: 0 })  
      await page.type('#search_form_input_homepage', 'Puppeteer')
      await page.keyboard.press('Enter'); 
      await page.waitForNavigation()
      await page.waitForSelector('#r1-0')
      const searchValue = await page.$eval('#r1-0', el => el.innerHTML)
      res.json({ str : searchValue});
      await browser.close()
    })()
  } catch (err) {
    console.error(err)
    res.json(err);
  }
});

module.exports = router;
