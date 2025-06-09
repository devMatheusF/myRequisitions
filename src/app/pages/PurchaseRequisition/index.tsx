import { useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { useCurrentUser } from '../../lib/sharedData/useCurrentUser';
import { Form } from '../../../myRequisitions/subdomains/spotBuy/material/components/Form';
import { FormGranular } from '../../../myRequisitions/subdomains/spotBuy/material/components/FormGranular';

export default function PurchaseRequisitionPage() {
  const { currentPlant, currentRegion } = useSelector((state: RootState) => state.purchaseRequisition);
  const { name } = useCurrentUser();

  return (
    <div className="space-y-6 w-full">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4">Página de Purchase Requisition: {name}</h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Região selecionada: {currentRegion || 'Nenhuma'}</p>
          <p>Planta selecionada: {currentPlant || 'Nenhuma'}</p>
        </div>
      </div>

      {/* Container para os formulários com largura 100% e gap de 24px */}
      <div className="w-full flex flex-col gap-6">
        <Form />
        <FormGranular />
      </div>
    </div>
  );
}