import { CONFIG } from "./config.js";
import { fetchRepos, getLanguageSize } from "./github.js";

async function findTopRepos() {
  try {
    const { GITHUB_USERNAME, TARGET_LANGUAGE, GITHUB_TOKEN } = CONFIG;
    const repos = await fetchRepos(GITHUB_USERNAME, GITHUB_TOKEN);

    const languageStats: { name: string; bytes: number }[] = [];

    for (const repo of repos) {
      const bytes = await getLanguageSize(repo.languages_url, TARGET_LANGUAGE, GITHUB_TOKEN);
      if (bytes > 0) {
        languageStats.push({ name: repo.name, bytes });
      }
    }

    if (languageStats.length === 0) {
      console.log(`❌ No ${TARGET_LANGUAGE} found in ${GITHUB_USERNAME}'s public repos.`);
      return;
    }

    // Sort descending
    languageStats.sort((a, b) => b.bytes - a.bytes);

    // Print top 3
    console.log(`🏆 Top 3 repos for "${TARGET_LANGUAGE}":\n`);
    languageStats.slice(0, 3).forEach((repo, index) => {
      console.log(`🔹 #${index + 1}: ${repo.name} — ${repo.bytes.toLocaleString()} bytes`);
    });
  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}

findTopRepos();
