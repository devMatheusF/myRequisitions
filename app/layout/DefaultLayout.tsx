// src/app/layout/DefaultLayout.tsx
import RegionSelector from '../../app/components/Region';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div>
      <header className="p-4 bg-gray-100 shadow">
        <RegionSelector />
      </header>
      <main className="p-4">{<Outlet/>}</main>
    </div>
  );
}
