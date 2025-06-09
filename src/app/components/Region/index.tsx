import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { setRegion, setPlant } from '../../../../src/region/domains/selectedPlant/store/store';
import { useNavigate } from 'react-router-dom';
import { useRegionSync } from '../../lib/sharedData/useRegionSync';

const plantsByRegion: Record<string, string[]> = {
  Americas: ['Plant A1', 'Plant A2'],
  Europe: ['Plant E1', 'Plant E2'],
  Asia: ['Plant AS1', 'Plant AS2'],
};

export default function RegionSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedRegion, selectedPlant } = useSelector((state: RootState) => state.region);

  const navigate = useNavigate();
  const syncRegion = useRegionSync();

  const handleRegionClick = (region: string) => {
    dispatch(setRegion(region as any));    
  };

  const handlePlantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlant(e.target.value));
  };

  const handleConfirmRegion = () => {
    syncRegion();
    navigate("/pr");
    setIsModalOpen(false); // Fechar modal após confirmar
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Componente do Modal
  const Modal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative">
          {/* Botão de fechar */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>

          {/* Conteúdo do modal (mesmo conteúdo anterior) */}
          <div className="flex flex-col gap-4">
            <h2 className="font-bold mb-2 text-gray-800 text-2xl">Selecione uma região:</h2>
            
            <div className="flex gap-2 mb-4 w-full justify-center">
              {['Americas', 'Europe', 'Asia'].map(region => (
                <button
                  key={region}
                  className={`px-4 py-2 rounded ${selectedRegion === region ? 'bg-green-600' : 'bg-green-400'} text-white`}
                  onClick={() => handleRegionClick(region)}
                >
                  {region}
                </button>
              ))}
            </div>

            {selectedRegion && (
              <>
                <label className="block mb-1 text-gray-700">Selecione uma planta:</label>
                <select 
                  value={selectedPlant ?? ''} 
                  onChange={handlePlantChange} 
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Escolha uma planta</option>
                  {plantsByRegion[selectedRegion].map(plant => (
                    <option key={plant} value={plant}>
                      {plant}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex gap-3 mt-4">
              <button
                className={`px-4 py-2 rounded flex-1 ${
                  (!selectedRegion || !selectedPlant) 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                } text-white`}
                disabled={!selectedRegion || !selectedPlant}
                onClick={handleConfirmRegion}
              >
                Confirmar
              </button>

              <button
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
      >
        Região
      </button>

      {/* Modal */}
      <Modal />
    </>
  );
}