const express = require('express');
const puppeteer = require('puppeteer-extra')
const router = express.Router();
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')

router.get('/', async (req, res) => {

  try {

    if (global.proxyList == null) {
      res.json('noclick');
      return;
    }

    global.working = true;

    for (let proxy of global.proxyList) {

      await createGmail(proxy)
      return
    }

    global.working = false;
    res.json('fin');
  } catch (err) {
    console.error(err)
    global.working = false;
    res.json(err);
  }
});

module.exports = router;


function randomNr(max) {
  return Math.floor(Math.random() * max) + 1;
}

async function createGmail(proxy) {

  const firstnameTxt = 'busulva'
  const lastnameTxt = 'mascop'
  const email = 'brunubaumrzo'
  const pw = 'Joker12345'
  puppeteer.use(StealthPlugin())
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
  puppeteer.use(require('puppeteer-extra-plugin-anonymize-ua')())

  const browser = await puppeteer.launch({headless: false, args: ['--disk-cache-size=0', '--proxy-server=' + proxy.ip + ':' + proxy.port, '--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'] })
  const page = await browser.newPage()

  await page.goto('https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ltmpl=googlemail&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp', { waitUntil: 'load', timeout: 300000 });

  await page.waitFor(2000);
  console.log('firstnameasdasd');
  const firstname = await page.$('input[name="firstName"]');
  await firstname.type(firstnameTxt, { delay: 110 })

  console.log('lastname');
  const lastname = await page.$('input[name="lastName"]');
  await lastname.type(lastnameTxt, { delay: 115 })

  const username = await page.$('input[name="Username"]');
  await username.type(email, { delay: 106 })

  const pw1 = await page.$('input[name="Passwd"]');
  await pw1.type(pw, { delay: 103 })

  const pw2 = await page.$('input[name="ConfirmPasswd"]');
  await pw2.type(pw, { delay: 101 })

  await page.keyboard.press('Enter');
  await page.waitFor(5000);

  await page.screenshot({
    path: "./screenshot.jpg",
    type: "jpeg",
    fullPage: true
  });

  console.log(await page.content());

  const day = await page.$('input[jsname="YPqjbf"]');
  await day.type(randomNr(20), { delay: 101 })

  const month = await page.$('input[jsname="sC6rpf"]');
  await month.select(randomNr(9) + "")

  const year = await page.$('input[jsname="YPqjbf"]');
  await year.type(1990 + "", { delay: 101 })

  const gender = await page.$('input[jsname="sC6rpf"]');
  await gender.select(2 + "")
}