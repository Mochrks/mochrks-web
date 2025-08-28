import { githubApiInstance } from '@/utils/axios-config';


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
