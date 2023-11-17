import ArticleModel from "../schema/articleSchema";
import webScraper from "../utils/webScraper";

const articleUpdater = async () => {
  console.log("scraping for new smite articles");
  const articles = await webScraper();

  console.log(`articles scraped`);
  console.log(articles);

  // articles.forEach(async (article) => {
  //   const dbarticle = await ArticleModel.find({
  //     articleUrl: article.articleUrl,
  //   });

  //   if (dbarticle.length) {
  //     console.log("already exists not adding");
  //   } else {
  //     console.log("adding article");
  //     await ArticleModel.create(article);
  //   }
  // });

  return articles;
};

export default articleUpdater;
