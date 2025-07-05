Top GitHub Repo by Language
===========================

A TypeScript script that finds your most significant public GitHub repository based on a specific programming language, using GitHub’s API and byte size analysis.

---------------------------
🚀 Features
---------------------------
- Fetches up to 100 public repositories for a user.
- Inspects language usage per repo via GitHub’s languages_url.
- Finds the top 3 repositories (by byte size) for each specified language.
- Supports analyzing multiple programming languages in one run.
- Supports authentication via GitHub Personal Access Token (PAT) for higher rate limits or private repos (optional).

---------------------------
📦 Technologies
---------------------------
- TypeScript
- ts-node
- Axios
- dotenv
- GitHub REST API v3

---------------------------
🛠️ Setup & Installation
---------------------------
1. Clone the repository:
   git clone https://github.com/Mr-LuaM/top-repo-lang.git
   cd top-repo-lang

2. Install dependencies:
   npm install

---------------------------
🔐 GitHub Token (Optional)
---------------------------
To avoid rate limiting or access private repos:

1. Go to https://github.com/settings/tokens
2. Generate a "Personal Access Token (classic)"
3. Copy and paste the token into a `.env` file in the project root:

   GITHUB_TOKEN=ghp_your_token_here

⚠️ Do not commit your `.env` file!

---------------------------
⚙️ Configuration
---------------------------
Edit `src/config.ts` to set your GitHub username and the language to search:

export const CONFIG = {
  GITHUB_USERNAME: "Mr-LuaM",
  TARGET_LANGUAGES: ["JavaScript", "Python", "TypeScript"], // Analyze multiple languages
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
};

---------------------------
▶️ Running the Script
---------------------------
npm start

Example output:
🏆 Top 3 repos for "JavaScript":

🔹 #1: NewsPortal — 17,895 bytes
🔹 #2: VoPet — 12,430 bytes
🔹 #3: Portfolio — 9,501 bytes

🏆 Top 3 repos for "Python":

🔹 #1: SentimentAPI — 22,480 bytes
🔹 #2: FlaskAdmin — 8,214 bytes


---------------------------
🗂️ Project Structure
---------------------------
top-repo-lang/
├── src/
│   ├── index.ts       → Main entry point
│   ├── config.ts      → Loads env + config
│   └── github.ts      → GitHub API logic
├── .env               → Your GitHub token
├── package.json
├── tsconfig.json
└── README.txt

---------------------------
💡 Future Improvements
---------------------------
- Support for more than 100 repos (pagination)
- Language distribution chart
- Multiple language rankings
