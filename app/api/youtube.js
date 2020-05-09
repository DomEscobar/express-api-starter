const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fetch = require('node-fetch')
var fs = require('fs');
var getSubtitles = require('youtube-captions-scraper').getSubtitles;


router.get('/script', async (req, res) => {

    var link = req.query.id;

    await getSubtitles({
        videoID: link, // youtube video id
        lang: 'en' // default: `en`
    }).then(captions => {
        res.json(captions.map(o => o.text));
    }).catch(err => {
        res.json({ message: "Not found" });
    }
    );

});


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

async function getBase64Image(img) {
    const response = await fetch(img);
    const data = await response.buffer()
    const b64 = data.toString('base64');
    console.log("data:image/png;base64," + b64);
    return "data:image/png;base64," + b64;
}

async function randomYoutube(proxy, word) {
    var randomUseragent = require('random-useragent');
    var page;
    var browser;

    try {
        puppeteer.use(StealthPlugin())
        puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())
        browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files (x86)/BraveSoftware/Brave-Browser/Application/brave.exe", ignoreHTTPSErrors: true, acceptInsecureCerts: true, args: ['--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
        page = await browser.newPage()
        //await page.setUserAgent(randomUseragent.getRandom());
        console.log("watch stealth " + proxy.ip);

        await page.goto('https://www.youtube.com/', { waitUntil: 'load', timeout: 300000 })

        const inputElement = await page.$('input');
        await inputElement.type(word.substring(0, 4), { delay: 110 })
        await inputElement.type(word.substring(4, word.length), { delay: 140 })

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

        await page.waitFor(15660 + randomSecond() * 5);

        // ------------- click random video
        const randomVid = await page.$('ytd-compact-video-renderer')
        randomVid.click();
        await page.waitFor(randomSecond());

        const playBtnTitle2 = await page.$eval('#movie_player', el => el.outerHTML);

        if (playBtnTitle2 != null && playBtnTitle2.includes('paused-mode')) {
            await page.$eval('button[class="ytp-large-play-button ytp-button"]', el => el.click());
        }
        await page.waitFor(5000 + randomSecond() * 3);

        // ---------- random search
        const inputElement2 = await page.$('input[name="search_query"]');

        await page.click('input[name="search_query"]');

        const inputValue = await page.$eval('input[name="search_query"]', el => el.value);
        for (let i = 0; i < inputValue.length; i++) {
            await page.keyboard.press('Backspace');
        }

        await page.waitFor(randomSecond());

        await page.type('input[name="search_query"]', word + '  ' + randomWord() + ' ', { delay: 105 });

        await inputElement2.press('Enter');

        await page.waitFor(randomSecond() * 5);
        page.close()


        await browser.close()
    } catch (err) {
        console.error(err)
        page.close()
        await browser.close()
    }
}