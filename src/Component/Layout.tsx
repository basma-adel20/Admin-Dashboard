// src/components/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.tsx';

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Header />}
      
      <main className={`flex-1 ${!isLoginPage ? 'pt-8' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
}