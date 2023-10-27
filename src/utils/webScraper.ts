import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import getDateFromTimeAgo from "./getDateFromTimeAgo";
import "dotenv/config";

let retry = 0;
let maxRetries = 5;

const webScraper = async () => {
  const newsUrl = "https://www.smitegame.com/news/";

  console.log(`scraping ${newsUrl}`);

  retry++;

  //OLD
  // { headless: false } use in launch to see browser for testing
  // { headless: "new" } change to new headless and stops warning
  // const browser = await puppeteer.launch({
  //   headless: "new",
  // });

  //local
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.IS_LOCAL
      ? "/tmp/localChromium/chromium/win64-1213059/chrome-win/chrome"
      : await chromium.executablePath(),

    headless: process.env.IS_LOCAL ? "new" : chromium.headless,
    ignoreHTTPSErrors: true,
    userDataDir: "/dev/null",
  });

  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   // args: process.env.IS_LOCAL ? puppeteer.defaultArgs() : chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath(),

  //   // executablePath: process.env.IS_LOCAL
  //   //   ? "/tmp/localChromium/chromium/win64-1213059/chrome-win/chrome"
  //   //   : await chromium.executablePath(), //use local chrome install in dev

  //   headless: chromium.headless,
  //   // headless: process.env.IS_LOCAL ? false : chromium.headless,
  // });
  console.log("launched puppeteer");

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
    );

    await page.goto(newsUrl);
    await page.waitForSelector(".home-tile");

    const articleTiles = await page.evaluate(() => {
      const tileElements = document.body.querySelectorAll(".posts-wrapper a");

      const articleTiles = Object.values(tileElements)
        .map((tile) => {
          const baseUrl = "https://www.smitegame.com";
          const subhead =
            tile.querySelector(".subhead.right").textContent ?? null;

          const article = {
            articleUrl: `${baseUrl}${tile.getAttribute("href")}`,
            headline: tile.querySelector(".headline").textContent,
            datePosted: tile.querySelector(".subhead.left").textContent,
          };

          if (
            subhead === "Console,Dev Insights" &&
            tile.querySelector(".headline").textContent.includes("Bonus")
          ) {
            return {
              type: "minorPatchInfo",
              ...article,
            };
          } else if (subhead === "Console,Dev Insights") {
            return {
              type: "majorPatchInfo",
              ...article,
            };
          } else if (subhead === "Dev Insights,Gods") {
            return {
              type: "godInfo",
              ...article,
            };
          } else if (subhead === "Dev Insights,News") {
            return {
              type: "seasonInfo",
              ...article,
            };
          } else {
            return;
          }
        })
        .filter((tile) => tile);

      return articleTiles;
    });

    const articles = [];

    for (let article of articleTiles) {
      try {
        let page = await browser.newPage();
        console.log(`scraping ${article.headline}`);
        await page.goto(article.articleUrl, { waitUntil: "load" });
        await page.waitForSelector(".featured-image");

        const articleImage = await page.evaluate(() => {
          const articleImageElement =
            document.body.querySelector(".featured-image");

          const articleImageUrl = articleImageElement.getAttribute("style");
          return articleImageUrl.split('"')[1];
        });

        articles.push({
          ...article,
          datePosted: getDateFromTimeAgo(article.datePosted),
          imageUrl: articleImage,
        });
        await page.close();
      } catch (err) {
        console.error(err);
      }
    }
    await browser.close();
    console.log("scrape done");
    return articles;
  } catch (err) {
    console.error(err);
    await browser.close();
    console.log("scrape failed");
    if (retry < maxRetries) {
      console.log("retrying scrape");
      webScraper();
    }
  }
};

export default webScraper;
