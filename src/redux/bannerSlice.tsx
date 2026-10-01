import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Banner } from '../api/banners';

export type BannersState = {
  banners: Banner[];
};

const initialState: BannersState = {
  banners: [],
};

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setBanners(state, action: PayloadAction<Banner[]>) {
      state.banners = action.payload;
    },
  },
});

export default bannersSlice.reducer;
export const { setBanners } = bannersSlice.actions;
