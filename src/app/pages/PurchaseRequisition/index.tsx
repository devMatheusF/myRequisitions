import { useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { useCurrentUser } from '../../lib/sharedData/useCurrentUser';
import { Form } from '../../../myRequisitions/subdomains/spotBuy/material/components/Form';

export default function PurchaseRequisitionPage() {
  const { currentPlant, currentRegion } = useSelector((state: RootState) => state.purchaseRequisition);
  const { name } = useCurrentUser();

  return (
    <div>
      <h1 className="text-xl font-bold">Página de Purchase Requisition: {name}</h1>
      <p>Região selecionada: {currentRegion || 'Nenhuma'}</p>
      <p>Planta selecionada: {currentPlant || 'Nenhuma'}</p>

      <Form />
      {/* Aqui você pode usar selectedRegion e selectedPlant para buscar dados específicos */}
    </div>
  );
}
