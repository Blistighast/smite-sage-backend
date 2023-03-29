import mongoose from "mongoose";

//schema
const playerSchema = new mongoose.Schema({
  Id: Number,
  ActivePlayerId: Number,
  Name: String,
  hz_player_name: String,
  hz_gamer_tag: String || null,
  Platform: String,
  Region: String,
  Personal_Status_Message: String,
  TeamId: Number,
  Team_Name: String,
  Created_Datetime: String,
  Last_Login_Datetime: String,
  HoursPlayed: Number,
  MinutesPlayed: Number,
  Level: Number,
  MasteryLevel: Number,
  Wins: Number,
  Losses: Number,
  Leaves: Number,
  Total_Achievements: Number,
  Total_Worshippers: Number,
  Avatar_URL: String,
  Rank_Stat_Conquest: Number,
  Rank_Stat_Conquest_Controller: Number,
  Rank_Stat_Duel: Number,
  Rank_Stat_Duel_Controller: Number,
  Rank_Stat_Joust: Number,
  Rank_Stat_Joust_Controller: Number,
  Tier_Conquest: Number,
  Tier_Duel: Number,
  Tier_Joust: Number,
  RankedConquest: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
  RankedConquestController: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
  RankedDuel: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
  RankedDuelController: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
  RankedJoust: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
  RankedJoustController: {
    Leaves: Number,
    Losses: Number,
    Name: String,
    Points: Number,
    PrevRank: Number,
    Rank: Number,
    Rank_Stat: Number,
    Rank_Stat_Conquest: Number || null,
    Rank_Stat_Joust: Number || null,
    Rank_Variance: Number,
    Round: Number,
    Season: Number,
    Tier: Number,
    Trend: Number,
    Wins: Number,
    player_id: Number || null,
  },
});

//model
const PlayerModel = mongoose.model("Player", playerSchema);

export default PlayerModel;
