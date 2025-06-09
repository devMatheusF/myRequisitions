// src/app/layout/DefaultLayout.tsx
import RegionSelector from '../../app/components/Region';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header com o botão de região */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Sistema de Requisições</h1>
          <RegionSelector />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}