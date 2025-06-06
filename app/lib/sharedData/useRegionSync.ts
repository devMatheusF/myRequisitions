import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { syncRegionData } from '../../../src/myRequisitions/domains/PurchaseRequisitions/store/slice';

export const useRegionSync = () => {
  const dispatch = useDispatch();
  const { selectedRegion, selectedPlant } = useSelector((state: RootState) => state.region);
  const { currentRegion, currentPlant } = useSelector((state: RootState) => state.purchaseRequisition);

  useEffect(() => {
    if (selectedRegion !== currentRegion || selectedPlant !== currentPlant) {
      dispatch(syncRegionData({ 
        region: selectedRegion, 
        plant: selectedPlant 
      }));
    }
  }, [selectedRegion, selectedPlant, currentRegion, currentPlant, dispatch]);

  return {
    region: currentRegion,
    plant: currentPlant,
    isRegionSelected: !!(currentRegion && currentPlant)
  };
};
