// src/app/layout/DefaultLayout.tsx
import RegionSelector from '../../app/components/Region';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className='w-full items-center flex justify-center'>
      <header className="p-4 shadow">
        <RegionSelector />
      </header>
      <main className="p-4">{<Outlet/>}</main>
    </div>
  );
}
