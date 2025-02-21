import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  loading?: boolean;
  modal?: boolean;
  modalType?: string;
  toast?: boolean;
  toastMessage?: string;
  action?: string;
}

const initialState: SystemState = {
  loading: false,
  modal: false,
  modalType: 'submenu | extraitem',
  toast: false,
  toastMessage: '',
  action: 'create | update'
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setSystemStore: (state, action: PayloadAction<SystemState>) => {
      return { ...state, ...action.payload };
    },
  }
});

export const {
  setSystemStore,
} = systemSlice.actions;

export default systemSlice.reducer;