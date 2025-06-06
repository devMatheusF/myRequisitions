import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

type Region = 'Americas' | 'Europe' | 'Asia';
type Plant = string;

interface PurchaseRequisitionState {
  currentRegion: Region | null;
  currentPlant: Plant | null;
  priceData: Record<string, number>;
  requisitions: {
    fields: []
  }; 
  loading: boolean;
  error: string | null;
  
  regionalData: Record<string, {
    suppliers: string[];
    defaultCurrency: string;
    approvalMatrix: any[];
  }>;
}

const initialState: PurchaseRequisitionState = {
  currentRegion: null,
  currentPlant: null,
  priceData: {},
  requisitions: {fields: []},
  loading: false,
  error: null,
  regionalData: {},
};

export const purchaseRequisitionSlice = createSlice({
  name: 'purchaseRequisition',
  initialState,
  reducers: {
    syncRegionData(state, action: PayloadAction<{ region: Region | null; plant: Plant | null }>) {
      const { region, plant } = action.payload;
      state.currentRegion = region;
      state.currentPlant = plant;
      
  
      if (state.currentRegion !== region) {
        state.priceData = {};
        state.requisitions = {fields: []};
        state.error = null;
      }
    },
    
    // Actions específicas do domínio PR
    setPriceData(state, action: PayloadAction<Record<string, number>>) {
      state.priceData = action.payload;
    },
    
    setRequisitions(state, action: PayloadAction<[]>) {
      state.requisitions.fields = action.payload;
    },
    
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    
    // Action para dados regionais específicos
    setRegionalData(state, action: PayloadAction<{ key: string; data: any }>) {
      const { key, data } = action.payload;
      state.regionalData[key] = data;
    },
  },
});

// Podemos criar também seletores mais simples no mesmo arquivo do slice, vai caber a nós o entendimento do padrao
export const selectPRLoading = (state: RootState) => state.purchaseRequisition.loading;
export const selectCurrentRegion = (state: RootState) => state.purchaseRequisition.currentRegion;

export const { 
  syncRegionData, 
  setPriceData, 
  setRequisitions, 
  setLoading, 
  setError, 
  setRegionalData 
} = purchaseRequisitionSlice.actions;

export default purchaseRequisitionSlice.reducer;