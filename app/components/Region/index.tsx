import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../../../app/store/store';
import { setRegion, setPlant } from '../../../src/region/domains/selectedPlant/store/regionSlice';
import { useNavigate } from 'react-router-dom';

const plantsByRegion: Record<string, string[]> = {
  Americas: ['Plant A1', 'Plant A2'],
  Europe: ['Plant E1', 'Plant E2'],
  Asia: ['Plant AS1', 'Plant AS2'],
};

export default function RegionSelector() {
  const dispatch = useDispatch();
  const { selectedRegion, selectedPlant } = useSelector((state: RootState) => state.region);

  const navigate = useNavigate();

  const handleRegionClick = (region: string) => {
    dispatch(setRegion(region as any));    
  };

  const handlePlantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPlant(e.target.value));
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="font-bold mb-2">Selecione uma região:</h2>
      <div className="flex gap-2 mb-4">
        {['Americas', 'Europe', 'Asia'].map(region => (
          <button
            key={region}
            className={`px-4 py-2 rounded ${selectedRegion === region ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleRegionClick(region)}
          >
            {region}
          </button>
        ))}
      </div>

      {selectedRegion && (
        <>
          <label className="block mb-1">Selecione uma planta:</label>
          <select value={selectedPlant ?? ''} onChange={handlePlantChange} className="border p-2 rounded">
            <option value="" disabled>Escolha uma planta</option>
            {plantsByRegion[selectedRegion].map(plant => (
              <option key={plant} value={plant}>
                {plant}
              </option>
            ))}
          </select>
        </>
      )}
      <p>{selectedPlant} planta</p>
      <button
        className={`px-4 py-2 rounded`}
        disabled={!selectedRegion || !selectedPlant}
        onClick={() => navigate("/pr")}
      >
        Confirmar
      </button>
    </div>
  );
}
