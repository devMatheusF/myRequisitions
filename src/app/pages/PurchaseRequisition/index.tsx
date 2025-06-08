import { useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { useCurrentUser } from '../../lib/sharedData/useCurrentUser';

export default function PurchaseRequisitionPage() {
  const { currentPlant, currentRegion } = useSelector((state: RootState) => state.purchaseRequisition);
  const { name } = useCurrentUser();

  return (
    <div>
      <h1 className="text-xl font-bold">Página de Purchase Requisition: {name}</h1>
      <p>Região selecionada: {currentRegion || 'Nenhuma'}</p>
      <p>Planta selecionada: {currentPlant || 'Nenhuma'}</p>

      {/* Aqui você pode usar selectedRegion e selectedPlant para buscar dados específicos */}
    </div>
  );
}
