import { githubApiInstance } from "@/utils/axios-config";
import { GitHubProject } from "@/types/github";

export const getGithubRepos = async (per_page: number = 10): Promise<GitHubProject[]> => {
  try {
    const response = await githubApiInstance.get<GitHubProject[]>("repos", {
      params: { per_page },
    });

    // Axios interceptor returns response.data, but types might still see it as AxiosResponse
    // We cast it if necessary or ensure the interceptor type is reflected
    return response as unknown as GitHubProject[];
  } catch (error: unknown) {
    console.error("Error fetching Github data:", error);
    throw error;
  }
};
