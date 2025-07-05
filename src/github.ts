// src/github.ts
import axios from "axios";

interface Repo {
  name: string;
  languages_url: string;
}

export async function fetchRepos(username: string, token?: string): Promise<Repo[]> {
  const headers = token ? { Authorization: `token ${token}` } : {};
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
  return res.data;
}

export async function getLanguageSize(url: string, language: string, token?: string): Promise<number> {
  const headers = token ? { Authorization: `token ${token}` } : {};
  const res = await axios.get(url, { headers });
  return res.data?.[language] ?? 0;
}

export async function getTopReposByLanguages(username: string, languages: string[], token?: string) {
  const repos = await fetchRepos(username, token);
  const results: Record<string, { name: string; bytes: number }[]> = {};

  for (const lang of languages) {
    const stats: { name: string; bytes: number }[] = [];

    for (const repo of repos) {
      const bytes = await getLanguageSize(repo.languages_url, lang, token);
      if (bytes > 0) {
        stats.push({ name: repo.name, bytes });
      }
    }

    results[lang] = stats
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 3); // Top 3
  }

  return results;
}
