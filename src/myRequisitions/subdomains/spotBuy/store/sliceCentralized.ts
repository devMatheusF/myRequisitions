import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store/store';

interface FieldConfig {
  name: string;
  disable: boolean;
  type: string;
  readonly: boolean;
  value?: string;
}

interface FieldConfigByName {
  name?: FieldConfig;
  description?: FieldConfig;
  price?: FieldConfig;
  plant?: FieldConfig;
}

export interface ItemType {
  firstSectionOfFormItem: {
    fields: {
      name?: FieldConfig;
      description?: FieldConfig;
      price?: FieldConfig;
      plant?: FieldConfig;
    }
  },
  secondSectionOfFormItem: {
    key: string;
    fields: {
      name?: FieldConfig;
      description?: FieldConfig;
      price?: FieldConfig;
      plant?: FieldConfig;
    }
  }
}

interface SpotbuyState {
  material: {
    items: ItemType[];
  },
  limit: {
    items: ItemType[];
  },
  catalog: {
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
  },
  limit: {
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
  },
  catalog: {
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
              name: 'price2',
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

export const spotbuySlice = createSlice({
  name: 'spotbuy',
  initialState,
  reducers: {
    // Action para atualizar configuração de um campo específico em uma seção
    updateFieldConfig(state, action: PayloadAction<{ 
      item: keyof SpotbuyState;
      itemIndex: number;
      currentSection: keyof ItemType; 
      fieldName: keyof FieldConfigByName; 
      config: Partial<FieldConfig>;
    }>) {
      const { item, itemIndex, currentSection, fieldName, config } = action.payload;
    
      const section = state[item].items[itemIndex][currentSection];
    
      if (section?.fields?.[fieldName]) {
        section.fields[fieldName] = {
          ...section.fields[fieldName],
          ...config
        };
      }
    },
    
    // Action para atualizar configuração de múltiplos campos em uma seção
    updateFieldsConfig(state, action: PayloadAction<{ 
      item: keyof SpotbuyState; 
      itemIndex: number;
      currentSection: keyof ItemType;
      fields: Partial<FieldConfigByName>;
    }>) {
      const { item, itemIndex, currentSection, fields } = action.payload;
      
      const section = state[item].items[itemIndex][currentSection];

      if (!section || !section.fields) return;

      Object.entries(fields).forEach(([fieldName, config]) => {
        const key = fieldName as keyof FieldConfigByName;

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
      item: keyof SpotbuyState; // 'material' | 'limit' | 'catalog'
      itemIndex: number;
      currentSection: keyof ItemType; // 'firstSectionOfFormItem' | 'secondSectionOfFormItem'
      fieldName: keyof FieldConfigByName;
      value: string;
    }>) {
      const { item, itemIndex, currentSection, fieldName, value } = action.payload;
    
      const section = state[item].items[itemIndex][currentSection];
    
      if (section?.fields?.[fieldName]) {
        section.fields[fieldName]!.value = value;
      }
    },

    // Action para adicionar novos itens em uma seção
    addItems(state, action: PayloadAction<{
      item: keyof SpotbuyState;
      items: ItemType[];
    }>) {
      const { item, items } = action.payload;
      if (state[item].items.length === 0) {
        state[item].items = items;
      } else {
        state[item].items = [...state[item].items, ...items];
      }
    }
  },
});

// Seletores
export const selectSectionItems = (section: keyof SpotbuyState) => 
  (state: RootState) => state.spotbuy[section].items;

export const selectItemFields = (
  item: keyof SpotbuyState,
  itemIndex: number,
  currentSection: keyof ItemType
) => (state: RootState) =>
  state.spotbuy[item].items[itemIndex][currentSection]?.fields ?? {};

  export const selectFieldConfig = (
    item: keyof SpotbuyState,
    itemIndex: number,
    currentSection: keyof ItemType,
    fieldName: keyof FieldConfigByName
  ) => (state: RootState) =>
    state.spotbuy[item].items[itemIndex][currentSection]?.fields?.[fieldName];

export const { 
  updateFieldConfig, 
  updateFieldsConfig, 
  resetSection,
  updateFieldValue,
  addItems
} = spotbuySlice.actions;

export default spotbuySlice.reducer;