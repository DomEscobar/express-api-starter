const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/click', async (req, res) => {

    var link = req.query.id;

    try {

        if (global.proxyList == null) {
            return;
        }

        for (let proxy of global.proxyList) {

            const browser = await puppeteer.launch({ headless:true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
            const page = await browser.newPage()
            await page.goto(link, { waitUntil: 'load', timeout: 0 })
            const selector = '.ytp-time-current';
            await page.waitForFunction(
                selector => document.querySelector(selector).innerText ==  '0:31',
                {timeout : 0},
                selector
            );
            console.log("finwatching");
            await browser.close()
        }
        res.json('fin');
    } catch (err) {
        console.error(err)
        res.json(err);
    }
});

module.exports = router;
