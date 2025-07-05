import axios from "axios";

export interface Repo {
  name: string;
  languages_url: string;
}

export async function fetchRepos(username: string, token?: string): Promise<Repo[]> {
  const headers = token ? { Authorization: `token ${token}` } : {};
  const response = await axios.get<Repo[]>(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );
  return response.data;
}

export async function getLanguageSize(
  languagesUrl: string,
  language: string,
  token?: string
): Promise<number> {
  const headers = token ? { Authorization: `token ${token}` } : {};
  const response = await axios.get<Record<string, number>>(languagesUrl, { headers });
  return response.data[language] ?? 0;
}
