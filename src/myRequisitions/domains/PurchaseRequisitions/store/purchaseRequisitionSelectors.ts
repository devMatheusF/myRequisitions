import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../../../../app/store/store';

//Aqui vamos pegar o state do domínio
const selectPurchaseRequisitionState = (state: RootState) => state.purchaseRequisition;

// E aqui vamos adicionar as lógicas mais específicas. O maior motivo é nåo ter que ficar chamando apenas a informação
//nos seletores e fazer o processamento nas pages repetidamente.
export const selectIsRegionSynced = createSelector(
  [(state: RootState) => state.region, selectPurchaseRequisitionState],
  (region, pr) => {
    return region.selectedRegion === pr.currentRegion && 
           region.selectedPlant === pr.currentPlant;
  }
);

export const selectPRStats = createSelector(
  [selectPurchaseRequisitionState],
  (pr) => ({
    currentPlant: pr.currentPlant,
    currentRegion: pr.currentRegion,
    hasError: !!pr.error,
    itemType: pr.itemType,
    isLoading: pr.loading
  })
);


