const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/click', async (req, res) => {

    var link = req.query.id;

    try {

        if (global.proxyList == null) {
            res.json('noclick');
            return;
        }

        global.working = true;

        for (let proxy of global.proxyList) {

            const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
            const page = await browser.newPage()
            await page.goto(link, { waitUntil: 'load', timeout: 300000 })
            console.log("watch" + proxy.ip);
            await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
            await page.waitFor(70000);
            await browser.close()
        }

        global.working = false;
        res.json('fin');
    } catch (err) {
        console.error(err)
        global.working = false;
        res.json(err);
    }
});

router.get('/click2', async (req, res) => {

    var link = req.query.id;

    try {

        if (global.proxyList2 == null) {
            res.json('noclick2');
            return;
        }

        global.working2 = true;


        for (let proxy of global.proxyList2) {

            const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
            const page = await browser.newPage()
            await page.goto(link, { waitUntil: 'load', timeout: 300000 })
            console.log("watch2" + proxy.ip);
            await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
            await page.waitFor(70000);
            await browser.close()
        }

        global.working2 = false;
        res.json('fin');
    } catch (err) {
        console.error(err)
        global.working2 = false;
        res.json(err);
    }
});

module.exports = router;
