import mongoose from "mongoose";
import { skinSchema } from "./skinSchema";

//schema
const godSchema = new mongoose.Schema({
  id: Number,
  Name: String,
  Pantheon: String,
  Roles: String,
  Title: String,
  Lore: String,
  Type: String,
  godCard_URL: String,
  godIcon_URL: String,
  latestGod: String,
  AttackSpeed: Number,
  AttackSpeedPerLevel: Number,
  AutoBanned: String,
  Cons: String,
  HP5PerLevel: Number,
  Health: Number,
  HealthPerFive: Number,
  HealthPerLevel: Number,
  MP5PerLevel: Number,
  MagicProtection: Number,
  MagicProtectionPerLevel: Number,
  MagicalPower: Number,
  MagicalPowerPerLevel: Number,
  Mana: Number,
  ManaPerFive: Number,
  ManaPerLevel: Number,
  OnFreeRotation: String,
  PhysicalPower: Number,
  PhysicalPowerPerLevel: Number,
  PhysicalProtection: Number,
  PhysicalProtectionPerLevel: Number,
  Pros: String,
  Speed: Number,
  Ability1: String,
  Ability2: String,
  Ability3: String,
  Ability4: String,
  Ability5: String,
  AbilityId1: Number,
  AbilityId2: Number,
  AbilityId3: Number,
  AbilityId4: Number,
  AbilityId5: Number,
  godAbility1_URL: String,
  godAbility2_URL: String,
  godAbility3_URL: String,
  godAbility4_URL: String,
  godAbility5_URL: String,
  Ability_1: {
    Id: Number,
    Summary: String,
    URL: String,
    Description: {
      itemDescription: {
        cooldown: String,
        cost: String,
        description: String,
        menuitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
        rankitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
      },
    },
  },
  Ability_2: {
    Id: Number,
    Summary: String,
    URL: String,
    Description: {
      itemDescription: {
        cooldown: String,
        cost: String,
        description: String,
        menuitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
        rankitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
      },
    },
  },
  Ability_3: {
    Id: Number,
    Summary: String,
    URL: String,
    Description: {
      itemDescription: {
        cooldown: String,
        cost: String,
        description: String,
        menuitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
        rankitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
      },
    },
  },
  Ability_4: {
    Id: Number,
    Summary: String,
    URL: String,
    Description: {
      itemDescription: {
        cooldown: String,
        cost: String,
        description: String,
        menuitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
        rankitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
      },
    },
  },
  Ability_5: {
    Id: Number,
    Summary: String,
    URL: String,
    Description: {
      itemDescription: {
        cooldown: String,
        cost: String,
        description: String,
        menuitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
        rankitems: [
          { description: String, value: String },
          { description: String, value: String },
        ],
      },
    },
  },
  abilityDescription1: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
    },
  },
  abilityDescription2: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
    },
  },
  abilityDescription3: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
    },
  },
  abilityDescription4: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
    },
  },
  abilityDescription5: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
    },
  },
  basicAttack: {
    itemDescription: {
      cooldown: String,
      cost: String,
      description: String,
      menuitems: [
        { description: String, value: String },
        { description: String, value: String },
      ],
      rankitems: [],
    },
  },
  skins: [skinSchema],
  // skins: [
  //   {
  //     god_id: Number,
  //     skin_id1: Number,
  //     skin_id2: Number,
  //     god_name: String,
  //     skin_name: String,
  //     godIcon_URL: String,
  //     godSkin_URL: String,
  //     obtainability: String,
  //     price_favor: Number,
  //     price_gems: Number,
  //   },
  // ],
});

//model
const GodModel = mongoose.model("God", godSchema);

export default GodModel;
