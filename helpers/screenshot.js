const puppeteer = require('puppeteer');
const md5 = require('md5');

module.exports = async function capture(url, device) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices[device]);
    await page.goto(url);
    const pageTitle = await page.title();
    const filePath = '/home/benjamin/private/screenshot3/public/images/' + md5(pageTitle + device) + '.png';
    await page.screenshot({ path: filePath });
    await browser.close();
    return filePath;
  };