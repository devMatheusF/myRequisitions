import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateFieldValue, selectItemFields, addItems } from './materialGranularSlice';

// Tipagem que virá da store material
interface AllFieldsForm {
  name?: {
    name: string;
    disable: boolean;
    type: string;
    readonly: boolean;
    value?: string;
  };
  description?: {
    name: string;
    disable: boolean;
    type: string;
    readonly: boolean;
    value?: string;
  };
  price?: {
    name: string;
    disable: boolean;
    type: string;
    readonly: boolean;
    value?: string;
  };
  plant?: {
    name: string;
    disable: boolean;
    type: string;
    readonly: boolean;
    value?: string;
  };
}

interface ItemType {
  firstSectionOfFormItem: {
    fields: AllFieldsForm;
  };
  secondSectionOfFormItem: {
    key: string;
    fields: AllFieldsForm;
  };
}

interface RootState {
  spotbuy: {
    material: {
      items: ItemType[];
    };
  };
}

// Mock da store material para demonstração
const mockState: RootState = {
  spotbuy: {
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
                value: ''
              },
              description: {
                name: 'description',
                disable: false,
                type: 'text',
                readonly: false,
                value: ''
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
                value: ''
              },
              plant: {
                name: 'plant',
                disable: true,
                type: 'text',
                readonly: true,
                value: ''
              },
            }
          }
        }
      ]
    }
  }
};

// Mock do useSelector para demonstração -> Esta configuração virá da store material
const useSelector = (selector: (state: RootState) => any) => {
  return selector(mockState);
};

// Mock do useDispatch
const useDispatch = () => {
  return (action: any) => {
    console.log('Action dispatched:', action);
  };
};

export function FormGranular() {
  const dispatch = useDispatch();
  
  // Selecionando o primeiro item (index 0) da lista de materiais
  const currentItemIndex = 0;
  
  // Usando os seletores da store material
  const firstSectionFields = useSelector((state: RootState) => 
    state.spotbuy.material.items[currentItemIndex]?.firstSectionOfFormItem?.fields || {}
  );
  
  const secondSectionFields = useSelector((state: RootState) => 
    state.spotbuy.material.items[currentItemIndex]?.secondSectionOfFormItem?.fields || {}
  );

  // State local para os valores do formulário
  const [formValues, setFormValues] = useState<{ [key: string]: string | number }>({});

  // Função que posteriormente daria pra usar pra atualizar a store com dispatch
  const handleInputChange = (fieldName: string, value: string | number) => {
    setFormValues(prev => {
      const newValues = {
        ...prev,
        [fieldName]: value
      };
      
      // Se value === 'caneta', atualiza o campo planta para '001'
      if (value === 'papel') {
        // Isso é pra mostrar que um campo tem efeito colateral no outro. 
        // Aqui podemos abstrair em um custom hook que consulta API externa e salva valores de preço e etc baseado
        // Na planta e região
        newValues.plant = '003';
      }
      
      return newValues;
    });
    
    // Exemplo de dispatch real que seria usado:
    // dispatch(updateFieldValue({
    //   itemIndex: currentItemIndex,
    //   currentSection: fieldName === 'name' || fieldName === 'description' ? 'firstSectionOfFormItem' : 'secondSectionOfFormItem',
    //   fieldName: fieldName as keyof AllFieldsForm,
    //   value: value.toString()
    // }));
  };

  // Função que irá salvar os dados na store de spotbuy
  const handleSubmit = () => {
    console.log('Form submitted with values:', formValues);
    
    // Aqui seria feito o dispatch para submeter para requisição de compra
    // dispatch(submitToPurchaseRequisition({
    //   materialData: {
    //     items: [
    //       {
    //         firstSectionOfFormItem: { fields: firstSectionFields },
    //         secondSectionOfFormItem: { fields: secondSectionFields }
    //       }
    //     ]
    //   }
    // }));
  };

  // Função para adicionar novo item
  const handleAddNewItem = () => {
    const newItem: ItemType = {
      firstSectionOfFormItem: {          
        fields: {
          name: {
            name: 'name',
            disable: false,
            type: 'text',
            readonly: false,
            value: ''
          },
          description: {
            name: 'description',
            disable: false,
            type: 'text',
            readonly: false,
            value: ''
          }
        },
      },
      secondSectionOfFormItem: {
        key: `second-${Date.now()}`,
        fields: {
          price: {
            name: 'price',
            disable: false,
            type: 'number',
            readonly: false,
            value: ''
          },
          plant: {
            name: 'plant',
            disable: true,
            type: 'text',
            readonly: true,
            value: 'Planta Padrão'
          },
        }
      }
    };

    // dispatch(addItems({ items: [newItem] }));
    console.log('New item would be added:', newItem);
  };

  const renderField = (fieldKey: string, fieldConfig: any) => {
    if (!fieldConfig) return null;
    
    const { name, disable, type, readonly } = fieldConfig;
    const value = formValues[name] || fieldConfig.value || '';

    return (
      <div key={fieldKey} className="mb-4">
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2 capitalize"
        >
          {name}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          disabled={disable}
          readOnly={readonly}
          onChange={(e) => {
            if (!disable && !readonly) {
              handleInputChange(name, type === 'number' ? Number(e.target.value) : e.target.value);
            }
          }}
          className={`
            w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${disable ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${readonly ? 'bg-gray-50' : ''}
          `}
          placeholder={`Digite ${name}`}
        />
      </div>
    );
  };

  return (
    <div className="w-full mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Formulário de Material Granular</h1>
      
      <div className="space-y-8">
        {/* Primeira Seção - Informações Básicas */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Informações Básicas
          </h2>
          <div className="grid gap-4">
            {Object.entries(firstSectionFields).map(([key, field]) =>
              renderField(key, field)
            )}
          </div>
        </div>

        {/* Segunda Seção - Detalhes Comerciais */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Detalhes Comerciais
          </h2>
          <div className="grid gap-4">
            {Object.entries(secondSectionFields).map(([key, field]) =>
              renderField(key, field)
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Enviar para Requisição de Compra
          </button>
          <button
            type="button"
            onClick={handleAddNewItem}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Adicionar Item
          </button>
          <button
            type="button"
            onClick={() => setFormValues({})}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Valores Atuais:</h3>
        <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>

      {/* Store Debug Info */}
      {/* <div className="mt-4 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Configuração dos Campos (Store):</h3>
        <div className="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto">
          <div className="mb-2">
            <strong>Primeira Seção:</strong>
            <pre>{JSON.stringify(firstSectionFields, null, 2)}</pre>
          </div>
          <div>
            <strong>Segunda Seção:</strong>
            <pre>{JSON.stringify(secondSectionFields, null, 2)}</pre>
          </div>
        </div>
      </div> */}
    </div>
  );
}