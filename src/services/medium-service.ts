import { mediumApiInstance } from '@/utils/axios-config';

export const fetchRSSData = async (rssUrl: string) => {
    try {
        const response = await mediumApiInstance.get('api.json', {
            params: { rss_url: rssUrl }
        });
        return response; 
    } catch (error) {
        console.error('Error fetching RSS data:', error);
        throw error; 
    }
};