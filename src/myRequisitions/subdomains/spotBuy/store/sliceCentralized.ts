import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

interface FieldConfig {
  name: string;
  disable: boolean;
  type: string;
  readonly: boolean;
  value?: string;
}

interface SpotbuyState {
  fields: {
    name: FieldConfig;
    description: FieldConfig;
    price: FieldConfig;
    plant: FieldConfig;
  };
}

const initialState: SpotbuyState = {
  fields: {
    name: {
      name: "name",
      disable: false,
      type: "text",
      readonly: false,
      value: ""
    },
    description: {
      name: "description",
      disable: false,
      type: "text",
      readonly: false,
      value: ""
    },
    price: {
      name: "price",
      disable: false,
      type: "text",
      readonly: false,
      value: ""
    },
    plant: {
      name: "plant",
      disable: false,
      type: "text",
      readonly: false,
      value: ""
    }
  }
};

export const spotbuySlice = createSlice({
  name: 'spotbuy',
  initialState,
  reducers: {
    // Action para atualizar configuração de um campo específico
    updateFieldConfig(state, action: PayloadAction<{ fieldName: keyof SpotbuyState['fields']; config: Partial<FieldConfig> }>) {
      const { fieldName, config } = action.payload;
      state.fields[fieldName] = { ...state.fields[fieldName], ...config };
    },
    
    // Action para atualizar configuração de múltiplos campos
    updateFieldsConfig(state, action: PayloadAction<Partial<SpotbuyState['fields']>>) {
      Object.keys(action.payload).forEach((fieldName) => {
        const key = fieldName as keyof SpotbuyState['fields'];
        if (action.payload[key]) {
          state.fields[key] = { ...state.fields[key], ...action.payload[key] };
        }
      });
    },
    
    // Action para resetar todos os campos para o estado inicial
    resetFields(state) {
      state.fields = initialState.fields;
    },
    
    // Action para atualizar valor de um campo
    updateFieldValue(state, action: PayloadAction<{ fieldName: keyof SpotbuyState['fields']; value: string }>) {
      const { fieldName, value } = action.payload;
      state.fields[fieldName].value = value;
    }
  },
});

// Seletores
export const selectedTypeItem = (state: RootState) => state.purchaseRequisition.itemType;
export const selectSpotbuyFields = (state: RootState) => state.spotbuy.fields;
export const selectSpotbuyField = (fieldName: keyof SpotbuyState['fields']) => 
  (state: RootState) => state.spotbuy.fields[fieldName];

export const { 
  updateFieldConfig, 
  updateFieldsConfig, 
  resetFields,
  updateFieldValue
} = spotbuySlice.actions;

export default spotbuySlice.reducer;