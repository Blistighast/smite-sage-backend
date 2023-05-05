import puppeteer from "puppeteer";

const webScraper = async () => {
  const url = "https://www.smitegame.com/news/";

  console.log(`scraping ${url}`);
  // { headless: false } use in launch to see browser for testing
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".home-tile");

    let godTiles = await page.evaluate(() => {
      let tileElements = document.body.querySelectorAll(".posts-wrapper a");
      let godTiles = Object.values(tileElements)
        .map((tile) => {
          const subhead =
            tile.querySelector(".subhead.right").textContent ?? null;
          if (
            subhead === "Console,Dev Insights" &&
            tile.querySelector(".headline").textContent.includes("Bonus")
          ) {
            return {
              type: "minorPatchInfo",
              articleUrl: tile.getAttribute("href"),
              headLine: tile.querySelector(".headline").textContent,
            };
          } else if (subhead === "Console,Dev Insights") {
            return {
              type: "majorPatchInfo",
              articleUrl: tile.getAttribute("href"),
              headLine: tile.querySelector(".headline").textContent,
            };
          } else if (subhead === "Dev Insights,Gods") {
            return {
              type: "godInfo",
              articleUrl: tile.getAttribute("href"),
              headLine: tile.querySelector(".headline").textContent,
            };
          } else if (subhead === "Dev Insights,News") {
            return {
              type: "seasonInfo",
              articleUrl: tile.getAttribute("href"),
              headLine: tile.querySelector(".headline").textContent,
            };
          } else {
            return;
          }
        })
        .filter((tile) => tile);
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
