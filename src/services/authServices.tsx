import axios from "axios";

export const logoutService = async (email: string, token: string, uiDispatch?: any ): Promise<void> => {

    try {
        await axios.post(
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
        uiDispatch({type: "SET_ALERT", payload: error.response ? error.response.data : "An error has ocurred in the logout requisition"})
    }
};
