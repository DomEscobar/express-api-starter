const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.goto('https://www.youtube.com/', { waitUntil: 'load', timeout: 300000 })
      const inputElement = await page.$('input');
            await inputElement.type('E-BEWEISER wirvsvirus', {delay: 110})
           await inputElement.press('Enter');

            await page.waitFor(1000);

const videoElementFirst = await page.$('ytd-video-renderer')
videoElementFirst.click();
            await page.waitFor(1000);

const randomVid = await page.$('ytd-compact-video-renderer')
randomVid.click();
            await page.waitFor(1000);

      const inputElement2 = await page.$('input[name="search_query"]');
await inputElement2.press('Backspace');
await inputElement2.press('Backspace');
await inputElement2.press('Backspace');
await inputElement2.press('Backspace');
await inputElement2.press('Backspace');
await inputElement2.press('Backspace');

   await inputElement2.type('E-BEWEISER new', {delay: 110})
           await inputElement2.press('Enter');

            await page.waitFor(1000);

        await page.screenshot({path: 'news.png', fullPage: true});
  await browser.close();
