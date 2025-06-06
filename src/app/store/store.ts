import { configureStore } from '@reduxjs/toolkit';
import regionReducer from '../../region/domains/selectedPlant/store/store';
import purchaseRequisitionReducer from '../../myRequisitions/domains/PurchaseRequisitions/store/slice';
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
