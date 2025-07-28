// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const misoranSlice = createSlice({
    name: "misoran",

    initialState: {
        decodedToken: null,
        authenticated: false,
        settings: {},
    },
    reducers: {
        preloadAuth: (state, actions) => {
            (state.decodedToken = actions.payload.decodedToken), (state.authenticated = actions.payload.authenticated);
        },
        getSettngs: (state, actions) => {
            state.settings = actions.payload.settings;
        },
    },
});

export const { preloadAuth, getSettngs } = misoranSlice.actions;

const store = configureStore({
    reducer: {
        misoran: misoranSlice.reducer,
    },
});

export default store;
