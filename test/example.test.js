const puppeteer = require("puppeteer");

describe("Testing", () => {
  it("EX", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.example.com");
    await browser.close();
  });
});
