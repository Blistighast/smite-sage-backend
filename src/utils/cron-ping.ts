import cron from "node-cron";
import serverPing from "./../api/serverPing";

//ping server every 14 min so it doesnt go to sleep
// cron.schedule("1 * * * *", () => {
//   serverPing();
// });
