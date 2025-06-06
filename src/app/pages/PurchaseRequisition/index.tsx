import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { useRegionSync } from '../../lib/sharedData/useRegionSync';
import { useCurrentUser } from '../../lib/sharedData/useCurrentUser';
import { useEffect } from 'react';
import { setLoading, setPriceData, setRequisitions } from '../../../myRequisitions/domains/PurchaseRequisitions/store/slice';

export default function PurchaseRequisitionPage() {
  const dispatch = useDispatch();
  const { selectedRegion, selectedPlant } = useSelector((state: RootState) => state.region);
  const { isRegionSelected, plant, region } = useRegionSync();
  const { name } = useCurrentUser();

  
  useEffect(() => {
    if (isRegionSelected) {
      loadPurchaseRequisitionData(region!, plant!);
    }
  }, [region, plant, isRegionSelected]);

  const loadPurchaseRequisitionData = async (region: string, plant: string) => {
    dispatch(setLoading(true));
    
    try {
      const priceResponse = await fetch(`https://odata.com/api/prices?region=${region}&plant=${plant}`);
      const priceData = await priceResponse.json();
      dispatch(setPriceData(priceData));

      const requisitionsResponse = await fetch(`https://odata.com/api/requisitions?region=${region}&plant=${plant}`);
      const requisitionsData = await requisitionsResponse.json();
      dispatch(setRequisitions(requisitionsData));
      
    } catch (error) {
      console.error('Erro ao carregar dados de PR:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Página de Purchase Requisition: {name}</h1>
      <p>Região selecionada: {selectedRegion || 'Nenhuma'}</p>
      <p>Planta selecionada: {selectedPlant || 'Nenhuma'}</p>

      {/* Aqui você pode usar selectedRegion e selectedPlant para buscar dados específicos */}
    </div>
  );
}
