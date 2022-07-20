const puppeteer = require('puppeteer');

async function getNewPage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto('https://pptr.dev/');
    await page.type('.navbar__search-input', 'pdf');
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    await page.waitForSelector('#remarks');
    await page.pdf({ path: 'newPage.pdf', format: 'A4' });

    await browser.close();
  } catch (error) {
    await browser.close();
  } finally {
    await browser.close();
  }
}

async function changeStyle() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://pptr.dev/');
    await page.evaluate(() => {
      document.querySelector('.navbar').style.backgroundColor = '#1f54c0';
    });

    await page.screenshot({ path: 'changeColor.png' });

    await browser.close();
  } catch (error) {
    await browser.close();
  } finally {
    await browser.close();
  }
}

getNewPage();
changeStyle();
