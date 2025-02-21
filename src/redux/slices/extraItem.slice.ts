
import { DataStoreInterface } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DataStoreInterface = {
    id: 0,
    name: "",
    level: 0,
    url: null,
}

export const extraItemSlice = createSlice({
    name: 'extraitem',
    initialState,
    reducers: {
        setExtraItemStore: (_state, action: PayloadAction<DataStoreInterface>)=>{
            return action.payload;
        },
    }
});

export const {
    setExtraItemStore,
} = extraItemSlice.actions;