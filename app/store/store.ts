import { configureStore } from '@reduxjs/toolkit';
import regionReducer from '../../src/region/domains/selectedPlant/store/regionSlice';
import purchaseRequisitionReducer from '../../src/myRequisitions/domains/PurchaseRequisitions/store/slice';
import userReducer from './currentUserSlice';

export const store = configureStore({
  reducer: {
    region: regionReducer,
    purchaseRequisition: purchaseRequisitionReducer,
    currentUser: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
