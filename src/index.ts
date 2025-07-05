import { CONFIG } from "./config";
import { fetchRepos, getLanguageSize } from "./github";

async function findTopRepo() {
  try {
    const { GITHUB_USERNAME, TARGET_LANGUAGE, GITHUB_TOKEN } = CONFIG;
    const repos = await fetchRepos(GITHUB_USERNAME, GITHUB_TOKEN);

    let topRepo: string | null = null;
    let maxBytes = 0;

    for (const repo of repos) {
      const bytes = await getLanguageSize(repo.languages_url, TARGET_LANGUAGE, GITHUB_TOKEN);
      if (bytes > maxBytes) {
        maxBytes = bytes;
        topRepo = repo.name;
      }
    }

    if (topRepo) {
      console.log(`🏆 Top repo for "${TARGET_LANGUAGE}":`);
      console.log(`📦 ${topRepo} — ${maxBytes.toLocaleString()} bytes`);
    } else {
      console.log(`❌ No ${TARGET_LANGUAGE} found in ${GITHUB_USERNAME}'s public repos.`);
    }
  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
}

findTopRepo();
