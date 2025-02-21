
import { DataInterface, DataStoreInterface } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DataStoreInterface = {
    id: 0,
    name: '',
    level: 0,
    items: []
} 

export const menusSlice = createSlice({
    name: 'menus',
    initialState,
    reducers: {
        setMenusStore: (_state, action: PayloadAction<DataStoreInterface>)=>{
            return action.payload;
        },
        addMenusStore: (state, action: PayloadAction<DataInterface>) => {
            if (!state.items) {
                state.items = [];
            }
            if (state.items.length === 0) {
                state.items = [action.payload];
            } else {
                state.items.push(action.payload);
            }
        },  
        editMenuStore: (state, action: PayloadAction<{ name: string }>) => {
            if (action.payload.name) {
                state.name = action.payload.name;
            }
        },  
        deleteMenusStore: (state, action: PayloadAction<{ id: number }>) => {
            state.items = state.items?.filter(item => item.id !== action.payload.id);
        }  
    }
});

export const {
    setMenusStore,
    addMenusStore,
    editMenuStore,
    deleteMenusStore
} = menusSlice.actions;