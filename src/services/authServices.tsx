import axios from "axios";

export const logoutService = async (email: string, token: string): Promise<void> => {
    try {
        const response = await axios.post(
            'https://teste.reobote.tec.br/api/logout',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        )
    } catch (error: any) {
        console.error(error.response ? error.response.data : error.message);
    }
};
