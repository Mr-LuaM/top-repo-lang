import express, { Request, Response } from "express";
import cors from "cors";
import { CONFIG } from "./config.js";
import { getTopReposByLanguages } from "./github.js";
import { TopReposResponse } from "./types.js"; // ← import your type

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/top-repos", async (req: Request, res: Response<TopReposResponse | { error: string }>): Promise<void> => {
  const username = req.query.username as string;
  const languagesParam = req.query.languages as string;

  if (!username || !languagesParam) {
    res.status(400).json({ error: "Missing 'username' or 'languages' parameters." });
    return;
  }

  const languages = languagesParam.split(",").map((lang) => lang.trim());

  try {
    const topRepos = await getTopReposByLanguages(username, languages, CONFIG.GITHUB_TOKEN);
    res.json({ username, topRepos });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
