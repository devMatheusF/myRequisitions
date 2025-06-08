import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

type Region = 'Americas' | 'Europe' | 'Asia';
type Plant = string;
type ItemType = 'material' | 'catalog' | 'limit';

interface PurchaseRequisitionState {
  currentRegion: Region | null;
  currentPlant: Plant | null;
  itemType: ItemType | null;
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseRequisitionState = {
  currentRegion: null,
  currentPlant: null,
  itemType: null,
  loading: false,
  error: null,
};

export const purchaseRequisitionSlice = createSlice({
  name: 'purchaseRequisition',
  initialState,
  reducers: {
    syncRegionData(state, action: PayloadAction<{ region: Region | null; plant: Plant | null }>) {
      const { region, plant } = action.payload;
      state.currentRegion = region;
      state.currentPlant = plant;
    },
    
    setItemType(state, action: PayloadAction<ItemType | null>) {
      state.itemType = action.payload;
    },
    
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Seletores
export const selectCurrentRegion = (state: RootState) => state.purchaseRequisition.currentRegion;
export const selectCurrentPlant = (state: RootState) => state.purchaseRequisition.currentPlant;
export const selectItemType = (state: RootState) => state.purchaseRequisition.itemType;
export const selectPRLoading = (state: RootState) => state.purchaseRequisition.loading;
export const selectPRError = (state: RootState) => state.purchaseRequisition.error;

export const { 
  syncRegionData, 
  setItemType,
  setLoading, 
  setError
} = purchaseRequisitionSlice.actions;

export default purchaseRequisitionSlice.reducer;