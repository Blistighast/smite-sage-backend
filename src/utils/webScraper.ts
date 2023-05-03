import puppeteer from "puppeteer";

const webScraper = async () => {
  const url = "https://www.smitegame.com/news/";

  console.log(`scraping ${url}`);
  // { headless: false } use in launch to see browser for testing
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".home-tile");
    // await page.waitForSelector('.headline')
    // await page.waitForSelector('.subhead-right')
    let godTiles = await page.evaluate(() => {
      let tileElements = document.body.querySelectorAll(".posts-wrapper a");
      let godTiles = Object.values(tileElements).map((tile) => {
        // if ()
        return {
          tileUrl: tile.getAttribute("href"),
          headLine: tile.querySelector(".headline").textContent ?? null,
          // subhead: tile.querySelector(".subhead-right div").contains("div")
        };
      });
      return godTiles;
    });
    await browser.close();
    console.log(godTiles);
    return godTiles;
  } catch (err) {
    console.error(err);
    console.log("scrape failed");
    await browser.close();
  }
};

export default webScraper;
