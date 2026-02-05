import { mediumApiInstance } from "@/utils/axios-config";
import { RSSData } from "@/types/rss";

export const fetchRSSData = async (rssUrl: string): Promise<RSSData> => {
  try {
    const response = await mediumApiInstance.get<RSSData>("api.json", {
      params: { rss_url: rssUrl },
    });
    return response as unknown as RSSData;
  } catch (error: unknown) {
    console.error("Error fetching RSS data:", error);
    throw error;
  }
};
