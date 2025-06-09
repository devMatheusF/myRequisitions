import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../../app/store/store';
import { updateFieldsConfig, addItems, updateFieldValue, type ItemType } from '../../store/sliceCentralized';


const initialState: ItemType = {
  firstSectionOfFormItem: {
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
      }
    },
  },
  secondSectionOfFormItem: {
    key: 'second',
    fields: {
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
    }
  }
};

// Template inicial para items de material
const createMaterialItem = (): ItemType => ({
  firstSectionOfFormItem: {
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
      }
    },
  },
  secondSectionOfFormItem: {
    key: 'second',
    fields: {
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
    }
  }
});

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    // Nova action para atualizar campos do formulário com valores específicos
    updateMaterialFormFields(state, action: PayloadAction<{
      itemIndex: number;
      section: 'firstSectionOfFormItem' | 'secondSectionOfFormItem';
      fieldUpdates: {
        fieldName: string;
        value?: string;
        config?: {
          disable?: boolean;
          readonly?: boolean;
          type?: string;
        };
      }[];
    }>) {
      // Esta action será usada junto com thunks para dispatch no spotbuy
    }
  },
});

// Thunk para inicializar material no spotbuy
export const initializeMaterial = () => (dispatch: any, getState: () => RootState) => {
  const state = getState();
  
  // Verifica se já existe items na seção material
  if (state.spotbuy.material.items.length === 0) {
    // Adiciona o item inicial
    dispatch(addItems({
      item: 'material',
      items: [createMaterialItem()]
    }));
  }
};

// Thunk para adicionar novo item de material
export const addMaterialItem = () => (dispatch: any) => {
  dispatch(addItems({
    item: 'material',
    items: [createMaterialItem()]
  }));
};

// Seletores
export const selectMaterialState = (state: RootState) => state.material;

export const selectMaterialItems = (state: RootState) => 
  state.spotbuy.material.items;

export const selectMaterialFieldsFromSpotBuy = (itemIndex: number = 0) => (state: RootState) => {
  const materialItems = state.spotbuy.material.items[itemIndex];
  return {
    firstSection: materialItems?.firstSectionOfFormItem?.fields || {},
    secondSection: materialItems?.secondSectionOfFormItem?.fields || {}
  };
};

export const selectMaterialFieldValue = (
  itemIndex: number,
  section: 'firstSectionOfFormItem' | 'secondSectionOfFormItem',
  fieldName: 'name' | 'description' | 'price' | 'plant'
) => (state: RootState) => {
  return state.spotbuy.material.items[itemIndex]?.[section]?.fields?.[fieldName]?.value || '';
};

export const { 
  updateMaterialFormFields
} = materialSlice.actions;

export default materialSlice.reducer;