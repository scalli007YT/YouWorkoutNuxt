export default defineEventHandler(async (event) => {
  const repo = "scalli007YT/YouWorkoutNuxt"; // Your repo path
  const token = process.env.NUXT_GITHUB_TOKEN;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits/main`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API Error: ${errorData.message}`);
    }

    const commitData = await response.json();
    return { commitId: commitData.sha };
  } catch (error) {
    console.error("Error fetching commit data:", error.message);
    return { error: "Failed to fetch commit data. Please try again later." };
  }
});
