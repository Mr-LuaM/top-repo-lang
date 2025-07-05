import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  GITHUB_USERNAME: "Mr-LuaM",
  TARGET_LANGUAGES: ["JavaScript", "Python", "PHP"], // ← now an array!
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
};
