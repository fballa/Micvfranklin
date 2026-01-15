import React, { useState } from 'react';
import { ShoppingCart, Search, User, Phone, Menu, X, Facebook, Instagram, Twitter, MapPin, Mail, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  setView: (view: ViewState) => void;
  onNavigate?: (view: ViewState, params?: any) => void;
  cartCount: number;
  currentView: ViewState;
}

export const Layout: React.FC<LayoutProps> = ({ children, setView, onNavigate, cartCount, currentView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewState, params?: any) => {
    if (onNavigate) {
      onNavigate(view, params);
    } else {
      setView(view);
    }
    setMobileMenuOpen(false);
  };

  const navLinkClass = (view: ViewState) => 
    `cursor-pointer px-3 py-2 text-sm font-medium transition-colors hover:text-red-600 ${currentView === view ? 'text-red-600' : 'text-gray-700'}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="hidden sm:block">Envío gratis en pedidos superiores a $5000 MXN</p>
          <div className="flex gap-4 items-center ml-auto">
            <a href="#" className="hover:text-red-400 flex items-center gap-1"><Phone size={12} /> 55-1234-5678</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-red-400">Soporte 24/7</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('HOME')}>
              <div className="text-3xl font-extrabold italic tracking-tighter text-gray-900">
                TIRE<span className="text-red-600">PRO</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <button onClick={() => handleNavClick('HOME')} className={navLinkClass('HOME')}>Inicio</button>
              <button onClick={() => handleNavClick('CATALOG')} className={navLinkClass('CATALOG')}>Comprar Llantas</button>
              <button onClick={() => handleNavClick('CATALOG', { clear: true })} className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600">Marcas</button>
              <button onClick={() => handleNavClick('CATALOG', { onlyOffers: true })} className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600">Ofertas</button>
              <button className="cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600">Blog</button>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-3 py-1.5">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-transparent border-none focus:outline-none text-sm ml-2 w-32 text-gray-700 placeholder-gray-400"
                />
              </div>
              
              <button className="text-gray-600 hover:text-red-600 transition-colors">
                <User size={24} />
              </button>
              
              <button 
                className="text-gray-600 hover:text-red-600 transition-colors relative"
                onClick={() => handleNavClick('CART')}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
              <button onClick={() => handleNavClick('HOME')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md w-full text-left">Inicio</button>
              <button onClick={() => handleNavClick('CATALOG')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md w-full text-left">Comprar Llantas</button>
              <button onClick={() => handleNavClick('CATALOG', { clear: true })} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md w-full text-left">Marcas</button>
              <button onClick={() => handleNavClick('CATALOG', { onlyOffers: true })} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md w-full text-left">Ofertas</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-2xl font-extrabold italic tracking-tighter text-white mb-6">
                TIRE<span className="text-red-600">PRO</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-gray-400">
                Líderes en venta de llantas y rines. Calidad garantizada, envíos rápidos y el mejor servicio al cliente del mercado automotriz.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Enlaces Rápidos</h3>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => handleNavClick('HOME')} className="hover:text-red-500 transition-colors">Buscar por Vehículo</button></li>
                <li><button onClick={() => handleNavClick('CATALOG', { onlyOffers: true })} className="hover:text-red-500 transition-colors">Ofertas del Mes</button></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Blog Automotriz</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Localizador de Tiendas</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Mi Cuenta</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Servicio al Cliente</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Contáctanos</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Política de Envíos</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Devoluciones</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Garantías</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Contacto</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin size={18} className="mr-3 text-red-600 mt-1 flex-shrink-0" />
                  <span>Edificio Delta, Managua, Nicaragua</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-3 text-red-600 flex-shrink-0" />
                  <span>55-1234-5678</span>
                </li>
                <li className="flex items-center">
                  <Mail size={18} className="mr-3 text-red-600 flex-shrink-0" />
                  <span>ventas@tirepro.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 TirePro Inc. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Términos</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};