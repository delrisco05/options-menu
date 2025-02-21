import { configureStore } from "@reduxjs/toolkit";
import { extraItemSlice, menusSlice, modulesSlice, systemSlice } from "./slices";
import { submenusSlice } from "./slices/submenus.slice";

export const store = configureStore({
    reducer: {
        dataModule: modulesSlice.reducer,
        dataMenu: menusSlice.reducer,
        dataSubmenu: submenusSlice.reducer,
        dataExtraItem: extraItemSlice.reducer,
        dataSystem: systemSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

