import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  GITHUB_USERNAME: "Mr-LuaM", // change as needed
  TARGET_LANGUAGE: "Python", // change as needed
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
};
