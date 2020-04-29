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

            await randomYoutube(proxy, link)
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
            console.log("watch TWO" + proxy.ip);

            await randomYoutube(proxy, link)
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

function randomWord() {
    var things = ['new', 'old', 'current', 'brand new', 'with color', 'not', 'pewdipie', 'corona'];
    return things[Math.floor(Math.random() * things.length)];
}

function randomSecond() {
    return 1000 + Math.floor(Math.random() * 600);
}

async function randomYoutube(proxy, word) {

    const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
    const page = await browser.newPage()
    console.log("watch " + proxy.ip);

    await page.goto('https://www.youtube.com/', { waitUntil: 'load', timeout: 300000 })

    const inputElement = await page.$('input');
    await inputElement.type(word, { delay: 110 })
    await inputElement.press('Enter');

    //------------- click first element
    await page.waitFor(randomSecond());
    const videoElementFirst = await page.$('ytd-video-renderer')
    videoElementFirst.click();
    await page.waitFor(2000 + randomSecond());

    const playBtnTitle = await page.$eval('#movie_player', el => el.outerHTML);

    if (playBtnTitle != null && playBtnTitle.includes('paused-mode')) {
        console.log('pushing ok')
        await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
    }

    await page.waitFor(12660 + randomSecond()+ randomSecond()+ randomSecond());

    // ------------- click random video
    const randomVid = await page.$('ytd-compact-video-renderer')
    randomVid.click();
    await page.waitFor(randomSecond());

    const playBtnTitle2 = await page.$eval('#movie_player', el => el.outerHTML);

    if (playBtnTitle != null && playBtnTitle2.includes('paused-mode')) {
        console.log('pushing ok')
        await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
    }
    await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
    await page.waitFor(5000 + randomSecond());

    // ---------- random search
    const inputElement2 = await page.$('input[name="search_query"]');

    await page.click('input[name="search_query"]');

    const inputValue = await page.$eval('input[name="search_query"]', el => el.value);
    for (let i = 0; i < inputValue.length; i++) {
        await page.keyboard.press('Backspace');
    }

    await page.waitFor(randomSecond());

    await page.type('input[name="search_query"]', word + '  ' + randomWord() + ' ');

    await inputElement2.press('Enter');

    await page.waitFor(randomSecond());
    await browser.close()
}