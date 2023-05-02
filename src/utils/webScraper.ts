import { load } from "cheerio";
import fetch from "node-fetch";

const webScraper = async () => {
  console.log("scraped a website");
  // const url = "https://www.theguardian.com/uk";
  // const url = "https://www.smitegame.com/news/";
  const url =
    "http://webcache.googleusercontent.com/search?q=cache:https://www.smitegame.com/news/";
  // const url = "http://localhost:3000/gods";
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = load(html);
    const articles = [];
    // console.log($(`.posts-wrapper`, html));
    // $(`.fc-item__link`, html).each((i, ele) => {
    // $(`.home-tile`, html).each((i, ele) => {
    // const $a = $(".posts-wrapper").find('a').each((i, ele) => {
    //   console.log(ele)
    // });
    const links = [...$("a")].map((e) => $(e).attr("href"));
    console.log(links);
    // $(".posts-wrapper")
    //   .find("a")
    //   .each((i, ele) => {
    //     console.log(ele);
    //   });
    // console.log("ele", $a);
    // $(`.posts-wrapper a`, html).each((i, ele) => {
    //   console.log("index", i);
    //   console.log("ele", ele);
    //   const title = $(ele).text();
    //   const link = $(ele).find("a").attr("href");
    //   console.log(link);
    //   const article = {};
    // });
    return links;
  } catch (err) {
    console.error(err);
  }
  // console.log(articles);
  // const god = { link: null };
  // $(`.card_godCard__kb9Ew`, html).each((i, ele) => {
  //   const list = $(ele).text();
  //   const link = $(ele).attr("href");
  //   console.log(link);
  //   god.link = link;
  // });
  // console.log(god.link);
};

export default webScraper;
