import axios from 'axios';
import { APP_GLOBAL_USE } from '../type';

const cNumberPayload = (payload) => {
    return {
        type: APP_GLOBAL_USE.C_NUMBER,
        payload,
    };
};

export const _onFetchNumber = (cpNum) => {
    const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${cpNum}?truncateResponse=false `;
    return async (dispatch) => {
        try {
            const respone = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'hibp-api-key': '2d2e33cafe3f460aba6d185d810aa27b',
                },
            });

            const result = respone.data;

            dispatch(cNumberPayload(result));
        } catch (error) {
            console.log('error', error);
        }
    };
};
