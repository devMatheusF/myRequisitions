import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

interface FieldsConfig {
  name: string;
  disable: boolean;
  type: string;
  readonly: boolean;
  value?: string;
}

//Objeto contendo todos os campos do formulário possíveis
export interface AllFieldsForm {
  name?: FieldsConfig;
  description?: FieldsConfig;
  price?: FieldsConfig;
  plant?: FieldsConfig;
}

interface SpotbuyState {
  fields: AllFieldsForm;
  isSubmitting: boolean;
  submitError: string | null;
}

const initialState: SpotbuyState = {
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
  isSubmitting: false,
  submitError: null,
};

export const spotbuyGranularSlice = createSlice({
  name: 'spotbuyGranular',
  initialState,
  reducers: {
    // Action para submeter dados para purchaseRequisition
    submitToPurchaseRequisition(state, action: PayloadAction<any>) {
      state.isSubmitting = true;
      state.submitError = null;
    },
    
    // Action para quando o submit é bem-sucedido
    submitToPurchaseRequisitionSuccess(state) {
      state.isSubmitting = false;
      state.submitError = null;
    },
    
    // Action para quando o submit falha
    submitToPurchaseRequisitionFailure(state, action: PayloadAction<string>) {
      state.isSubmitting = false;
      state.submitError = action.payload;
    },
    
    // Action para limpar erro
    clearSubmitError(state) {
      state.submitError = null;
    },
  }
});

// Poderia também ser um thunk para submeter para purchaseRequisition
export const submitToPurchaseRequisitionThunk = (payload: any) => async (dispatch: any) => {
  try {
    //Simulacao para salvar na PR
    dispatch(submitToPurchaseRequisition(payload));
    // dispatch(purchaseRequisitionActions.createRequisition(payload));
    dispatch(submitToPurchaseRequisitionSuccess());
  } catch (error) {
    dispatch(submitToPurchaseRequisitionFailure('Erro ao submeter'));
  }
};

export const { 
  submitToPurchaseRequisition,
  submitToPurchaseRequisitionSuccess,
  submitToPurchaseRequisitionFailure,
  clearSubmitError
} = spotbuyGranularSlice.actions;

// Seletores
export const selectSpotbuyFields = (state: RootState) => state.spotbuyGranular.fields;
export const selectIsSubmitting = (state: RootState) => state.spotbuyGranular.isSubmitting;
export const selectSubmitError = (state: RootState) => state.spotbuyGranular.submitError;

export default spotbuyGranularSlice.reducer;