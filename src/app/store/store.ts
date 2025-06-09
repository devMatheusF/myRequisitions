import { configureStore } from '@reduxjs/toolkit';
import regionReducer from '../../region/domains/selectedPlant/store/store';
import purchaseRequisitionReducer from '../../myRequisitions/domains/PurchaseRequisitions/store/slice';
import spotbuyReducer from '../../myRequisitions/subdomains/spotBuy/store/sliceCentralized';
import materialReducer from '../../myRequisitions/subdomains/spotBuy/material/store/sliceCentralized';
import userReducer from './currentUserSlice';

export const store = configureStore({
  reducer: {
    region: regionReducer,
    purchaseRequisition: purchaseRequisitionReducer,
    spotbuy: spotbuyReducer,
    material: materialReducer,
    // Aqui você adicionaria catalog e limit quando criar
    // catalog: catalogReducer,
    // limit: limitReducer,
    currentUser: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;