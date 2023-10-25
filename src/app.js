const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url =
    "https://promo.nj.betmgm.com/en/promo/geolocator?orh=sports.betmgm.com";

  await page.goto(url, { timeout: 50000 });

  const divs = await page.$$eval("p", (elements) =>
    elements.map((el) => el.outerHTML)
  );
  const content = [];

  for (const div of divs) {
    content.push(div);
  }

  console.log(content);

  await browser.close();
})();
