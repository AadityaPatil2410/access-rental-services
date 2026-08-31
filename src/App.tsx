import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { WaitlistModal } from './components/WaitlistModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage, isAuthModalOpen, closeAuthModal } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Routing Switch */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <CatalogPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'confirmation' && <ConfirmationPage />}
        {currentPage === 'my-bookings' && <MyBookingsPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <WaitlistModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
