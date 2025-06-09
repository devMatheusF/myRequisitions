import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../../app/store/store';
import { type AllFieldsForm } from '../../store/sliceGranular';

export interface FieldConfig {
  name: string;
  disable: boolean;
  type: string;
  readonly: boolean;
  value?: string;
}


export interface ItemType {
  firstSectionOfFormItem: {
    fields: AllFieldsForm,
  },
  secondSectionOfFormItem: {
    key: string;
    fields: AllFieldsForm,
  }
}

interface SpotbuyState {
  material: {
    items: ItemType[];
  }
}

const initialState: SpotbuyState = {
  material: {
    items: [
      {
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
      }
    ]
  }
};

export const materialGranularSlice = createSlice({
  name: 'materialGranular',
  initialState,
  reducers: {
    // Action para atualizar configuração de um campo específico em uma seção
    updateFieldConfig(state, action: PayloadAction<{ 
      itemIndex: number;
      currentSection: keyof ItemType; 
      fieldName: keyof AllFieldsForm; 
      config: Partial<FieldConfig>;
    }>) {
      const { itemIndex, currentSection, fieldName, config } = action.payload;
    
      const section = state["material"].items[itemIndex][currentSection];
    
      if (section?.fields?.[fieldName]) {
        section.fields[fieldName] = {
          ...section.fields[fieldName],
          ...config
        };
      }
    },
    
    // Action para atualizar configuração de múltiplos campos em uma seção
    updateFieldsConfig(state, action: PayloadAction<{       
      itemIndex: number;
      currentSection: keyof ItemType;
      fields: Partial<AllFieldsForm>;
    }>) {
      const {itemIndex, currentSection, fields } = action.payload;
      
      const section = state["material"].items[itemIndex][currentSection];

      if (!section || !section.fields) return;

      Object.entries(fields).forEach(([fieldName, config]) => {
        const key = fieldName as keyof AllFieldsForm;

        if (config && section.fields[key]) {
          section.fields[key] = {
            ...section.fields[key],
            ...config,
          };
        }
      });
    },
    
    // Action para resetar uma seção para o estado inicial
    resetSection(state, action: PayloadAction<keyof SpotbuyState>) {
      const section = action.payload;
      state[section] = initialState[section];
    },
    
    // Action para atualizar valor de um campo em uma seção
    updateFieldValue(state, action: PayloadAction<{ 
      itemIndex: number;
      currentSection: keyof ItemType; // 'firstSectionOfFormItem' | 'secondSectionOfFormItem'
      fieldName: keyof AllFieldsForm;
      value: string;
    }>) {
      const { itemIndex, currentSection, fieldName, value } = action.payload;
    
      const section = state["material"].items[itemIndex][currentSection];
    
      if (section?.fields?.[fieldName]) {
        section.fields[fieldName]!.value = value;
      }
    },

    // Action para adicionar novos itens em uma seção
    addItems(state, action: PayloadAction<{      
      items: ItemType[];
    }>) {
      const { items } = action.payload;
      if (state["material"].items.length === 0) {
        state["material"].items = items;
      } else {
        state["material"].items = [...state["material"].items, ...items];
      }
    }
  },
});

// Seletores
export const selectSectionItems = (section: keyof SpotbuyState) => 
  (state: RootState) => state.spotbuy[section].items;

export const selectItemFields = (  
  itemIndex: number,
  currentSection: keyof ItemType
) => (state: RootState) =>
  state.spotbuy["material"].items[itemIndex][currentSection]?.fields ?? {};

  export const selectFieldConfig = (
    itemIndex: number,
    currentSection: keyof ItemType,
    fieldName: keyof AllFieldsForm
  ) => (state: RootState) =>
    state.spotbuy["material"].items[itemIndex][currentSection]?.fields?.[fieldName];

export const { 
  updateFieldConfig, 
  updateFieldsConfig, 
  resetSection,
  updateFieldValue,
  addItems
} = materialGranularSlice.actions;

export default materialGranularSlice.reducer;