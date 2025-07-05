import { CONFIG } from "./config.js";
import { fetchRepos, getLanguageSize } from "./github.js";

async function findTopReposForLanguage(language: string) {
  const { GITHUB_USERNAME, GITHUB_TOKEN } = CONFIG;
  const repos = await fetchRepos(GITHUB_USERNAME, GITHUB_TOKEN);

  const languageStats: { name: string; bytes: number }[] = [];

  for (const repo of repos) {
    const bytes = await getLanguageSize(repo.languages_url, language, GITHUB_TOKEN);
    if (bytes > 0) {
      languageStats.push({ name: repo.name, bytes });
    }
  }

  if (languageStats.length === 0) {
    console.log(`❌ No ${language} found in ${GITHUB_USERNAME}'s public repos.\n`);
    return;
  }

  languageStats.sort((a, b) => b.bytes - a.bytes);

  console.log(`🏆 Top 3 repos for "${language}":\n`);
  languageStats.slice(0, 3).forEach((repo, index) => {
    console.log(`🔹 #${index + 1}: ${repo.name} — ${repo.bytes.toLocaleString()} bytes`);
  });
  console.log();
}

async function run() {
  for (const lang of CONFIG.TARGET_LANGUAGES) {
    await findTopReposForLanguage(lang);
  }
}

run();
