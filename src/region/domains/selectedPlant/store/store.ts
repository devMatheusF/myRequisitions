// src/region/domains/SelectedPlant/regionSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';

type Region = 'Americas' | 'Europe' | 'Asia';
type Plant = string;

interface RegionState {
  selectedRegion: Region | null;
  selectedPlant: Plant | null;
}

const initialState: RegionState = {
  selectedRegion: null,
  selectedPlant: null,
};

export const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<Region>) {
      state.selectedRegion = action.payload;
      state.selectedPlant = null; // reset plant on region change
    },
    setPlant(state, action: PayloadAction<Plant>) {
      state.selectedPlant = action.payload;
    },
  },
});

export const { setRegion, setPlant } = regionSlice.actions;
export default regionSlice.reducer;
