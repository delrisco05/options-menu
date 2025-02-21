import { DataInterface, DataStoreInterface } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DataStoreInterface = {
    id: 0,
    name: '',
    description: '',
    level: 0,
    items: []
} 

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        setModulesStore: (_state, action: PayloadAction<DataStoreInterface>) => {
            return action.payload;
        },
        getModulesStore: (state, _action: PayloadAction<void>) => {
            return state;
        },
        addModulesStore: (state, action: PayloadAction<DataInterface>) => {
            if(action.payload.idParent === null){
                state.items!.push(action.payload);
            }
            modifyItemById(state.items!, action.payload.idParent!, (item) => {
                if (!item.items) {
                    item.items = [];
                }
                item.items.push(action.payload);
            });
        },
        editModulesStore: (state, action: PayloadAction<{ id: number, name?: string, description?: string, url?: string }>) => {
            modifyItemById(state.items!, action.payload.id, (item) => {
                if (action.payload.name) {
                    item.name = action.payload.name;
                }
                if (action.payload.description) {
                    item.description = action.payload.description;
                }
                if (action.payload.url) {
                    item.url = action.payload.url;
                }
            });
        },
        
        moveModulesStore: (state, action: PayloadAction<{ idFrom: number, idTo: number }>) => {
            let fromItem: DataInterface | null = null;
            modifyItemById(state.items!, action.payload.idFrom, (item) => {
                fromItem = { ...item };
            });
            if (fromItem) {
                state.items = deleteItemById(state.items!, action.payload.idFrom);
                modifyItemById(state.items, action.payload.idTo, (item) => {
                    if (!item.items) {
                        item.items = [];
                    }
                    item.items.push(fromItem!);
                });
            }
        },
        deleteModulesStore: (state, action: PayloadAction<{ id: number }>) => {
            state.items = deleteItemById(state.items!, action.payload.id);
        }
    }
});

const modifyItemById = (items: DataInterface[], idParent: number, callback: (item: DataInterface) => void): boolean => {
    for (const item of items) {
        if (item.id === idParent) {
            callback(item);
            return true;
        }

        if (item.items) {
            const found = modifyItemById(item.items, idParent, callback);
            if (found) {
                return true;
            }
        }
    }
    return false;
};
const deleteItemById = (items: DataStoreInterface[], id: number): any[] => {
    return items.reduce((acc: any[], item) => {
        if (item.id === id) {
            return acc;
        }
        if (item.items) {
            item.items = deleteItemById(item.items, id);
        }
        acc.push(item);
        return acc;
    }, []);
};

export const {
    setModulesStore,
    addModulesStore,
    moveModulesStore,
    deleteModulesStore,
    getModulesStore,
    editModulesStore,
} = modulesSlice.actions;