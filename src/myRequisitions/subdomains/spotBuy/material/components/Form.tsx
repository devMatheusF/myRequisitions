import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

//Tipagem que virá do spotbuy
interface RootState {
  MaterialReducer: {
    firstSectionOfFormItem: {
      fields: {
        [key: string]: {
          name: string;
          disable: boolean;
          type: string;
          readonly: boolean;
        };
      };
    };
    secondSectionOfFormItem: {
      key: string;
      fields: {
        [key: string]: {
          name: string;
          disable: boolean;
          type: string;
          readonly: boolean;
        };
      };
    };
  };
}

// Mock do spotbuy para demonstração
const mockState: RootState = {
  MaterialReducer: {
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
};

// Mock do useSelector para demonstração -> Esta configuração virá da store de spotbuy
const useSelector = (selector: (state: RootState) => any) => {
  return selector(mockState);
};

// Mock do useDispatch
const useDispatch = () => {
  return (action: any) => {
    console.log('Action dispatched:', action);
  };
};

export function Form() {
  const { firstSectionOfFormItem, secondSectionOfFormItem } = useSelector(
    (state: RootState) => state.MaterialReducer
  );
  
  const dispatch = useDispatch();

  // State local para os valores do formulário
  const [formValues, setFormValues] = useState<{ [key: string]: string | number }>({});

  
  //Funcao que posteriormente daria pra usar pra atualizar a store com um dispatch
  const handleInputChange = (fieldName: string, value: string | number) => {
    setFormValues(prev => {
      const newValues = {
        ...prev,
        [fieldName]: value
      };
      
      // Se value === 'caneta', atualiza o campo planta para '001'
      if (value === 'caneta') {
        //Isso é pra mostrar que um campo tem efeito colateral no outro. 
        //Aqui podemos abstrair em um custom hook que consulta API externa e salva valores de preço e etc baseado
        //Na planta e região
        newValues.plant = '002';
      }
      
      return newValues;
    });
    
    // dispatch({ type: 'UPDATE_FIELD', payload: { fieldName, value } });
  };

  // Funcao que irá salvar os dados na store de spotbuy
  const handleSubmit = () => {
    console.log('Form submitted with values:', formValues);
        
    // dispatch(useSelector(addNewItem,formValues));
  };

  const renderField = (fieldKey: string, fieldConfig: any) => {
    const { name, disable, type, readonly } = fieldConfig;
    const value = formValues[name] || '';
    console.log(value);

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Formulário de Material Centralizado</h1>
      
      <form className="space-y-8">
        {/* Primeira Seção */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Informações Básicas
          </h2>
          <div className="grid gap-4">
            {Object.entries(firstSectionOfFormItem.fields).map(([key, field]) =>
              renderField(key, field)
            )}
          </div>
        </div>

        {/* Segunda Seção */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
            Detalhes Comerciais
          </h2>
          <div className="grid gap-4">
            {Object.entries(secondSectionOfFormItem.fields).map(([key, field]) =>
              renderField(key, field)
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={() => setFormValues({})}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Limpar
          </button>
        </div>
      </form>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Valores Atuais:</h3>
        <pre className="text-xs text-gray-600 bg-white p-2 rounded border overflow-auto">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  )
}