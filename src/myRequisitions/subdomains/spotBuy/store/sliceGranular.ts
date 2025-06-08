import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

interface FieldConfig {
  name: string;
  disable: boolean;
  type: string;
  readonly: boolean;
  value?: string;
}

interface ItemType {
  fields: {
    name: FieldConfig;
    description: FieldConfig;
    price: FieldConfig;
    plant: FieldConfig;
  };
}

interface SpotbuyState {
  items: ItemType[]
}

const initialState: SpotbuyState = {
  items: [
    {
      fields: {
        name: {
          name: 'name',
          disable: false,
          type: 'text',
          readonly: false,
        },
        description: {
          name: 'description',
          disable: false,
          type: 'text',
          readonly: false,
        },
        price: {
          name: 'price',
          disable: false,
          type: 'number',
          readonly: false,
        },
        plant: {
          name: 'plant',
          disable: true,
          type: 'text',
          readonly: true,
        },
      },
    },
  ],
};

export const spotbuySlice = createSlice({
  name: 'spotbuy',
  initialState,
  reducers: {
    addNewItemForSpotBuy(state) {
      state.items = {...state.items}
    }
  }    
});


export const { 
  
} = spotbuySlice.actions;

export default spotbuySlice.reducer;