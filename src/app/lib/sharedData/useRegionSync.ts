import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { syncRegionData } from '../../../../src/myRequisitions/domains/PurchaseRequisitions/store/slice';

export const useRegionSync = () => {
  const dispatch = useDispatch();
  const { selectedRegion, selectedPlant } = useSelector((state: RootState) => state.region);

  return () => {
    dispatch(syncRegionData({
      region: selectedRegion,
      plant: selectedPlant,
    }));
  };
};
