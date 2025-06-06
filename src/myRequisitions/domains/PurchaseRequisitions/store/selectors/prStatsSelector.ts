import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../../../app/store/store';


//Aqui vamos pegar o state do domínio
const selectPurchaseRequisitionState = (state: RootState) => state.purchaseRequisition;

// E aqui vamos adicionar as lógicas mais específicas. O maior motivo é nåo ter que ficar chamando apenas a informação
//nos seletores e fazer o processamento nas pages repetidamente.

export const selectPRStats = createSelector(
  [selectPurchaseRequisitionState],
  (pr) => ({
    totalRequisitions: pr.requisitions.fields.length,
    totalPriceItems: Object.keys(pr.priceData).length,
    hasError: !!pr.error,
    isLoading: pr.loading
  })
);