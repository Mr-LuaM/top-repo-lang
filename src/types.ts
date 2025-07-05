export interface RepoStat {
  name: string;
  bytes: number;
}

export interface TopReposResponse {
  username: string;
  topRepos: Record<string, RepoStat[]>;
}
