import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store/store.ts';
import { Provider } from 'react-redux';
import DefaultLayout from './app/layout/DefaultLayout.tsx'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import PurchaseRequisitionPage from './app/pages/PurchaseRequisition';
import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/pr",
        element: <PurchaseRequisitionPage />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>  
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
