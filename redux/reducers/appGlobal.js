import { APP_GLOBAL_USE } from '../type';

const initState = {
    cNumber: [],
};

const app = (state = initState, action) => {
    switch (action.type) {
        case APP_GLOBAL_USE.C_NUMBER:
            return {
                ...state,
                cNumber: (state.cNumber = action.payload),
            };

        default:
            return state;
    }
};
export default app;
