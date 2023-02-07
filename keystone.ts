import "dotenv/config";
// //
// // Keystone imports the default export of this file, expecting a Keystone configuration object
// //   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// // to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// // authentication is configured separately here too, but you might move this elsewhere
// // when you write your list-level access control functions, as they typically rely on session data
// import { withAuth, session } from "./auth";

import type { ServerConfig, AdminConfig } from "@keystone-6/core/types";

// export default withAuth(
//   config({
//     db: {
//       // we're using sqlite for the fastest startup experience
//       //   for more information on what database might be appropriate for you
//       //   see https://keystonejs.com/docs/guides/choosing-a-database#title
//       provider: "sqlite",
//       url: "file:./keystone.db",
//     },
//     lists,
//     session,
//     server: {
//       cors: { origin: [] },
//     },
//   })
// );

const databaseUrl =
  process.env.dataBaseUrl || "mongodb://localhost/keystone-smite-sage";
const frontendUrl = process.env.frontendUrl || "http://localhost:3000";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long to stay signed in
  secret: process.env.cookie_secret,
};

export default config({
  server: {
    cors: {
      origin: [frontendUrl],
      credentials: true,
    },
    port: 4000,
  },
  db: {
    provider: "sqlite",
    url: databaseUrl,
    // add data seeding here
  },
  lists,
  ui: {
    //change how can access
    isAccessAllowed: () => true,
  },
  // add session values here
});
