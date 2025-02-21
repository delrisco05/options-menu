
import { DataInterface, DataStoreInterface } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DataStoreInterface = {
    id: 0,
    name: '',
    level: 0,
    items: []
} 

export const submenusSlice = createSlice({
    name: 'submenus',
    initialState,
    reducers: {
        setSubmenusStore: (_state, action: PayloadAction<DataStoreInterface>)=>{
            return action.payload;
        },
        addSubmenusStore: (state, action: PayloadAction<DataInterface>)=>{
            if (!state.items) {
                state.items = [];
            }
            if (state.items.length === 0) {
                state.items = [action.payload];
            } else {
                state.items.push(action.payload);
            }
        },
        deleteSubmenusStore: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items?.filter(item => item.id !== action.payload.id);
        }  
    }
});

export const {
    setSubmenusStore,
    addSubmenusStore,
    deleteSubmenusStore
} = submenusSlice.actions;