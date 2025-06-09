// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../../../../app/store/store';
// import { updateFieldsConfig } from '../../store/sliceCentralized';

// interface MaterialState {
//   isActive: boolean;
//   materialSpecificData: {
//     materialCode?: string;
//     category?: string;
//   };
// }

// const initialState: MaterialState = {
//   isActive: false,
//   materialSpecificData: {}
// };

// export const materialSlice = createSlice({
//   name: 'material',
//   initialState,
//   reducers: {
//     activateMaterial(state) {
//       state.isActive = true;
//     },
    
//     deactivateMaterial(state) {
//       state.isActive = false;
//     },
    
//     setMaterialData(state, action: PayloadAction<MaterialState['materialSpecificData']>) {
//       state.materialSpecificData = { ...state.materialSpecificData, ...action.payload };
//     }
//   },
// });

// // // Thunk para aplicar configurações de material no spotbuy
// // export const applyMaterialConfig = () => (dispatch: any) => {
// //   dispatch(materialSlice.actions.activateMaterial());
  
// //   // Aplica as regras de material no spotbuy
// //   dispatch(updateFieldsConfig({
// //     name: {
// //       name: "name",
// //       disable: false,
// //       type: "text",
// //       readonly: false
// //     },
// //     description: {
// //       name: "description",
// //       disable: false,
// //       type: "text",
// //       readonly: false
// //     },
// //     price: {
// //       name: "price",
// //       disable: false,
// //       type: "text",
// //       readonly: true // readonly para material
// //     },
// //     plant: {
// //       name: "plant",
// //       disable: true, // disabled para material
// //       type: "text",
// //       readonly: true
// //     }
// //   }));
// // };

// // Seletores
// export const selectMaterialIsActive = (state: RootState) => state.spotbuy.material.items;
// export const selectMaterialData = (state: RootState) => state.spotbuy.material.items[0];

// export const selectMaterialFieldsFromSpotBuy = (state: RootState, dispatch: any) => {
//   const materialItems = state.spotbuy.material.items[0];
  
//   // Aplica as regras específicas de material
//   dispatch(updateFieldsConfig({
//     section: 'material',
//     itemIndex: 0,
//     fields: {
//       description: {
//         ...materialItems.fields.description,
//         disable: true
//       },
//       name: {
//         ...materialItems.fields.name,
//         readonly: true
//       }
//     }
//   }));
// }

// export const { 
//   activateMaterial, 
//   deactivateMaterial, 
//   setMaterialData 
// } = materialSlice.actions;

// export default materialSlice.reducer;