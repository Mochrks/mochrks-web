import { githubApiInstance } from '@/utils/axiosConfig';

// Fetch GITHUB GET DATA
export const GihubData = async (per_page: number) => {
    try {
        const response = await githubApiInstance.get('repos', {
            params: { per_page: per_page }
        });
     
        return response; 
    } catch (error) {
        console.error('Error fetching Github data:', error);
        throw error; 
    }
};
