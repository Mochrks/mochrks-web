
import axiosInstance from '@/utils/axiosConfig';

// Get data
export const fetchRSSData = async (rssUrl: string) => {
    try {
        const response = await axiosInstance.get('api.json', {
            params: { rss_url: rssUrl }
        });
        return response; 
    } catch (error) {
        throw error; 
    }
};