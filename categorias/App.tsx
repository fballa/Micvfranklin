import React, { useState } from 'react';
import { Layout } from './Layout';
import { IMAGES, MOCK_PRODUCTS, BRANDS, TESTIMONIALS } from './constants';
import { Product, CartItem, ViewState, FilterState, Review } from './types';
import ThreeDTire from './ThreeDTire';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Filter, 
  ChevronRight,
  Search,
  Plus,
  Minus
} from 'lucide-react';

// --- SUB-COMPONENTS ---

interface HeroProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  onNavigate: (view: ViewState, params?: any) => void;
}

const Hero: React.FC<HeroProps> = ({ filters, setFilters, onNavigate }) => {
  const [searchMode, setSearchMode] = useState<'TIRE' | 'VEHICLE'>('TIRE');
  const [vehicleSearch, setVehicleSearch] = useState({ brand: '', model: '', year: '' });

  const handleVehicleSearch = () => {
    if (vehicleSearch.brand && vehicleSearch.model) {
      const vehicleString = `${vehicleSearch.brand} ${vehicleSearch.model} ${vehicleSearch.year}`;
      onNavigate('CATALOG', { vehicle: vehicleString });
    } else {
      onNavigate('CATALOG');
    }
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.BANNER_HERO} 
          alt="Banner Hero" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-20 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in-up">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Oferta de Temporada
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Domina el camino <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                con seguridad
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Encuentra las llantas perfectas para tu vehículo con nuestro buscador avanzado. Instalación gratuita en la compra de 4 llantas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onNavigate('CATALOG')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                Ver Catálogo <ChevronRight size={20}/>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 transform transition-transform hover:-translate-y-1">
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                className={`flex-1 pb-3 text-center font-bold text-sm ${searchMode === 'TIRE' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                onClick={() => setSearchMode('TIRE')}
              >
                Por Medida
              </button>
              <button 
                className={`flex-1 pb-3 text-center font-bold text-sm ${searchMode === 'VEHICLE' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
                onClick={() => setSearchMode('VEHICLE')}
              >
                Por Vehículo
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Search className="text-red-600" />
              {searchMode === 'TIRE' ? 'Buscador de Llantas' : 'Busca tu Auto'}
            </h2>
            
            <div className="space-y-4">
              {searchMode === 'TIRE' ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Ancho</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none transition-shadow"
                      value={filters.width}
                      onChange={(e) => setFilters({...filters, width: e.target.value})}
                    >
                      <option value="">Ancho</option>
                      <option value="205">205</option>
                      <option value="225">225</option>
                      <option value="245">245</option>
                      <option value="265">265</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Perfil</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none transition-shadow"
                      value={filters.profile}
                      onChange={(e) => setFilters({...filters, profile: e.target.value})}
                    >
                      <option value="">Perfil</option>
                      <option value="40">40</option>
                      <option value="45">45</option>
                      <option value="55">55</option>
                      <option value="60">60</option>
                      <option value="70">70</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Rin</label>
                    <select 
                      className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none transition-shadow"
                      value={filters.rim}
                      onChange={(e) => setFilters({...filters, rim: e.target.value})}
                    >
                      <option value="">Rin</option>
                      <option value="16">16"</option>
                      <option value="17">17"</option>
                      <option value="18">18"</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Marca</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Toyota" 
                      className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none"
                      value={vehicleSearch.brand}
                      onChange={(e) => setVehicleSearch({...vehicleSearch, brand: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Modelo</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Corolla" 
                        className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none"
                        value={vehicleSearch.model}
                        onChange={(e) => setVehicleSearch({...vehicleSearch, model: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Año</label>
                      <input 
                        type="text" 
                        placeholder="Ej: 2022" 
                        className="w-full border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-500 border p-2.5 outline-none"
                        value={vehicleSearch.year}
                        onChange={(e) => setVehicleSearch({...vehicleSearch, year: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                onClick={searchMode === 'TIRE' ? () => onNavigate('CATALOG') : handleVehicleSearch}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-lg mt-4 transition-colors flex justify-center items-center gap-2"
              >
                {searchMode === 'TIRE' ? 'Buscar Llantas' : 'Buscar para mi Auto'}
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
               <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Check size={16} className="text-green-500"/> Stock real</span>
                  <span className="flex items-center gap-1"><Check size={16} className="text-green-500"/> Precios bajos</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 hidden xl:block z-0 pointer-events-none">
          <ThreeDTire />
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
    <div className="relative p-6 flex-grow flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors">
      {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              AHORRA ${(product.originalPrice - product.price).toLocaleString()}
          </div>
      )}
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-48 h-48 object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" 
      />
      <div className="absolute top-4 left-4 opacity-50 grayscale group-hover:grayscale-0 transition-all">
        <img src={product.brandLogo} alt={product.brand} className="h-6 object-contain" />
      </div>
    </div>
    
    <div className="p-6 border-t border-gray-100 bg-white relative z-10">
      <div className="text-xs text-gray-500 mb-1 font-medium">{product.brand}</div>
      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 h-12 overflow-hidden">{product.name}</h3>
      
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-2">({product.reviews})</span>
      </div>
      
      <div className="flex items-end justify-between mb-4">
        <div>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>}
          <div className="text-2xl font-bold text-red-600">${product.price.toLocaleString()}</div>
        </div>
        <div className="text-right">
           <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
             {product.specs.width}/{product.specs.profile}R{product.specs.rim}
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
          <button 
          onClick={() => onSelect(product)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm"
          >
          Ver Detalle
          </button>
          <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-2 rounded-lg transition-colors flex items-center justify-center text-sm gap-1"
          >
          <ShoppingCart size={16}/> Agregar
          </button>
      </div>
    </div>
  </div>
);

// --- VIEWS ---

const HomeView = ({ filters, setFilters, onNavigate, onSelect, onAddToCart }: any) => (
  <>
    <Hero filters={filters} setFilters={setFilters} onNavigate={onNavigate} />
    
    {/* Brands Strip */}
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Marcas Premium Asociadas</p>
        <div className="flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {BRANDS.map(brand => (
            <img key={brand.name} src={brand.logo} alt={brand.name} className="h-10 object-contain" />
          ))}
          <div className="text-xl font-bold text-gray-300 font-serif italic">CONTINENTAL</div>
          <div className="text-xl font-bold text-gray-300 font-serif italic">BRIDGESTONE</div>
        </div>
      </div>
    </div>

    {/* Featured Categories */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo Más Buscado</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Seleccionamos las mejores opciones basadas en las preferencias de nuestros clientes y expertos automotrices.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {MOCK_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onSelect={onSelect} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Opiniones de Nuestros Clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 p-8 rounded-xl relative">
                  <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < testimonial.rating ? "currentColor" : "none"} />
                      ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                  <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 uppercase">{testimonial.role}</p>
                  </div>
              </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Banner */}
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-red-50 p-3 rounded-full text-red-600">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Garantía Extendida</h3>
              <p className="text-gray-500 text-sm">Todas nuestras llantas cuentan con garantía de fabricante y opción a cobertura contra baches.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-red-50 p-3 rounded-full text-red-600">
              <Truck size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Envío Nacional Rápido</h3>
              <p className="text-gray-500 text-sm">Entregamos en 24-48 horas en ciudades principales. Rastreo en tiempo real.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-red-50 p-3 rounded-full text-red-600">
              <CreditCard size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Pagos Seguros</h3>
              <p className="text-gray-500 text-sm">Aceptamos todas las tarjetas, PayPal y ofrecemos meses sin intereses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const CatalogView = ({ filters, setFilters, onSelect, onAddToCart }: any) => {
  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    if (filters.width && p.specs.width.toString() !== filters.width) return false;
    if (filters.profile && p.specs.profile.toString() !== filters.profile) return false;
    if (filters.rim && p.specs.rim.toString() !== filters.rim) return false;
    if (filters.season && p.specs.season !== filters.season) return false;
    if (filters.onlyOffers && (!p.originalPrice || p.originalPrice <= p.price)) return false;
    // Note: We don't filter by 'vehicle' string as we don't have vehicle data in products, 
    // but we can use it to show a UI message.
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Filtros</h3>
              <Filter size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temporada</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                  value={filters.season}
                  onChange={(e) => setFilters({...filters, season: e.target.value})}
                >
                  <option value="">Todas</option>
                  <option value="Verano">Verano</option>
                  <option value="All Season">All Season</option>
                </select>
              </div>

              <div className="flex items-center">
                  <input 
                      type="checkbox" 
                      id="offers"
                      checked={!!filters.onlyOffers}
                      onChange={(e) => setFilters({...filters, onlyOffers: e.target.checked})}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="offers" className="ml-2 text-sm text-gray-700">Solo Ofertas</label>
              </div>
              
              <button 
                onClick={() => setFilters({width: '', profile: '', rim: '', brand: '', season: '', onlyOffers: false, vehicle: undefined})}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catálogo de Llantas</h1>
              {filters.vehicle && (
                <div className="mt-2 inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <Truck size={14} className="mr-2"/>
                  Resultados sugeridos para: <strong>{filters.vehicle}</strong>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelect={onSelect} onAddToCart={onAddToCart} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500">No se encontraron productos con estos filtros.</p>
              <button 
                onClick={() => setFilters({width: '', profile: '', rim: '', brand: '', season: '', onlyOffers: false, vehicle: undefined})}
                className="mt-4 text-red-600 font-medium"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetailView = ({ product, onBack, addToCart, reviews, addReview }: any) => {
  if (!product) return null;
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

  const handleReviewSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newReview: Review = {
          id: Date.now().toString(),
          userName: reviewForm.name,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          date: new Date().toLocaleDateString()
      };
      addReview(product.id, newReview);
      setReviewForm({ name: '', rating: 5, comment: '' });
  };

  const productReviews = reviews[product.id] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={onBack} className="text-gray-500 hover:text-gray-900 mb-8 flex items-center">
        &larr; Volver al catálogo
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 bg-gray-50 flex items-center justify-center relative">
             <div className="absolute top-6 left-6">
                <img src={product.brandLogo} alt={product.brand} className="h-8 md:h-12 object-contain mix-blend-multiply opacity-80" />
             </div>
             <img src={product.image} alt={product.name} className="max-w-full max-h-[500px] object-contain drop-shadow-2xl" />
          </div>
          
          <div className="p-8 lg:p-12">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-500 mb-6">{product.model}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-3">{product.reviews + productReviews.length} reseñas verificadas</span>
            </div>
            
            <div className="text-4xl font-bold text-red-600 mb-8">
              ${product.price.toLocaleString()} 
              <span className="text-lg text-gray-400 font-normal ml-2">mxn / unidad</span>
            </div>
            
            <div className="prose prose-sm text-gray-600 mb-8">
              <p>{product.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div>
                <span className="block text-xs text-gray-400 uppercase font-bold">Medida</span>
                <span className="font-mono text-gray-900 font-bold">{product.specs.width}/{product.specs.profile}R{product.specs.rim}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase font-bold">Índice</span>
                <span className="font-mono text-gray-900 font-bold">{product.specs.loadIndex}{product.specs.speedRating}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase font-bold">Temporada</span>
                <span className="font-mono text-gray-900 font-bold">{product.specs.season}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase font-bold">Run Flat</span>
                <span className="font-mono text-gray-900 font-bold">{product.specs.runFlat ? 'Sí' : 'No'}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 border-t border-gray-100 pt-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button className="px-4 py-3 text-gray-600 hover:bg-gray-100" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span className="px-4 py-3 font-bold text-gray-900 w-12 text-center">{qty}</span>
                <button className="px-4 py-3 text-gray-600 hover:bg-gray-100" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button 
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-red-600/30 transition-all transform hover:scale-105"
              >
                Agregar al Carrito - ${(product.price * qty).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
              <h3 className="text-2xl font-bold mb-6">Reseñas del Producto</h3>
              {productReviews.length === 0 ? (
                  <p className="text-gray-500 italic">No hay reseñas nuevas aún. ¡Sé el primero!</p>
              ) : (
                  <div className="space-y-6">
                      {productReviews.map(review => (
                          <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                  <span className="font-bold">{review.userName}</span>
                                  <span className="text-xs text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex text-yellow-400 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                  ))}
                              </div>
                              <p className="text-gray-600 text-sm">{review.comment}</p>
                          </div>
                      ))}
                  </div>
              )}
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
              <h3 className="text-xl font-bold mb-4">Escribir una reseña</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input 
                          required 
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" 
                          value={reviewForm.name}
                          onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                      <select 
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                          value={reviewForm.rating}
                          onChange={e => setReviewForm({...reviewForm, rating: Number(e.target.value)})}
                      >
                          <option value="5">5 Estrellas - Excelente</option>
                          <option value="4">4 Estrellas - Muy Bueno</option>
                          <option value="3">3 Estrellas - Bueno</option>
                          <option value="2">2 Estrellas - Regular</option>
                          <option value="1">1 Estrella - Malo</option>
                      </select>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Comentario</label>
                      <textarea 
                          required 
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none" 
                          value={reviewForm.comment}
                          onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                      />
                  </div>
                  <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition-colors">
                      Enviar Reseña
                  </button>
              </form>
          </div>
      </div>
    </div>
  );
};

const CartView = ({ cart, updateCartQuantity, removeFromCart, onNavigate }: any) => {
  const cartTotal = cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <ShoppingCart size={64} className="mx-auto text-gray-200 mb-6" />
          <p className="text-xl text-gray-500 mb-8">Tu carrito está vacío</p>
          <button onClick={() => onNavigate('CATALOG')} className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold">
            Ir a Comprar
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cart.map((item: CartItem) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.specs.width}/{item.specs.profile}R{item.specs.rim}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="font-bold text-lg mb-2">${item.price.toLocaleString()}</div>
                  
                  <div className="flex items-center border border-gray-200 rounded-lg mb-2">
                    <button 
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                    <button 
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                        <Plus size={14} />
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:underline">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Resumen</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Envío</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('CHECKOUT')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-md transition-colors"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CheckoutView = ({ cartTotal, onComplete }: any) => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Juan Pérez" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input required type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none" placeholder="juan@email.com" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de Envío</label>
          <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Calle, Número, Colonia..." />
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CP</label>
            <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 mt-6">
          <h3 className="font-bold text-lg mb-4">Método de Pago</h3>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 border border-red-500 bg-red-50 p-4 rounded-lg flex items-center justify-center cursor-pointer">
              <CreditCard className="mr-2 text-red-600"/> Tarjeta
            </div>
            <div className="flex-1 border border-gray-200 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400">
              <span className="font-bold italic text-blue-800">PayPal</span>
            </div>
          </div>
          <div className="space-y-4">
             <input type="text" placeholder="Número de Tarjeta" className="w-full border border-gray-300 rounded-lg p-3" />
             <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg p-3" />
               <input type="text" placeholder="CVC" className="w-full border border-gray-300 rounded-lg p-3" />
             </div>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg text-lg mt-8">
          Pagar ${cartTotal.toLocaleString()}
        </button>
      </form>
    </div>
  </div>
);

const SuccessView = ({ onNavigate }: any) => (
  <div className="max-w-2xl mx-auto px-4 py-20 text-center">
    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Check size={48} className="text-green-600" />
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Gracias por tu compra!</h1>
    <p className="text-xl text-gray-500 mb-8">Tu pedido #MX-{Math.floor(Math.random() * 10000)} ha sido confirmado. Hemos enviado los detalles a tu correo electrónico.</p>
    <button onClick={() => onNavigate('HOME')} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800">
      Volver al Inicio
    </button>
  </div>
);

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [filters, setFilters] = useState<FilterState>({
    width: '',
    profile: '',
    rim: '',
    brand: '',
    season: '',
    onlyOffers: false
  });

  // Navigation Handler
  const handleNavigate = (newView: ViewState, params?: any) => {
    setView(newView);
    if (newView === 'CATALOG') {
      if (params?.onlyOffers) {
        setFilters({ ...filters, onlyOffers: true });
      } else if (params?.clear) {
        setFilters({ width: '', profile: '', rim: '', brand: '', season: '', onlyOffers: false, vehicle: undefined });
      } else if (params?.vehicle) {
        setFilters({ ...filters, vehicle: params.vehicle });
      }
    }
  };

  const addToCart = (product: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });
    // Optional: Auto navigate to cart or show toast
    setView('CART');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const addReview = (productId: string, review: Review) => {
    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), review]
    }));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('PRODUCT');
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Layout setView={setView} onNavigate={handleNavigate} cartCount={cart.length} currentView={view}>
      {view === 'HOME' && (
        <HomeView 
          filters={filters} 
          setFilters={setFilters} 
          onNavigate={handleNavigate} 
          onSelect={handleSelectProduct}
          onAddToCart={(p: Product) => addToCart(p, 1)}
        />
      )}
      {view === 'CATALOG' && (
        <CatalogView 
          filters={filters} 
          setFilters={setFilters} 
          onSelect={handleSelectProduct}
          onAddToCart={(p: Product) => addToCart(p, 1)}
        />
      )}
      {view === 'PRODUCT' && selectedProduct && (
        <ProductDetailView 
          product={selectedProduct} 
          onBack={() => setView('CATALOG')} 
          addToCart={addToCart}
          reviews={reviews}
          addReview={addReview}
        />
      )}
      {view === 'CART' && (
        <CartView 
          cart={cart} 
          updateCartQuantity={updateCartQuantity} 
          removeFromCart={removeFromCart} 
          onNavigate={handleNavigate}
        />
      )}
      {view === 'CHECKOUT' && (
        <CheckoutView 
          cartTotal={cartTotal} 
          onComplete={() => {
            setCart([]);
            setView('SUCCESS');
          }}
        />
      )}
      {view === 'SUCCESS' && (
        <SuccessView onNavigate={handleNavigate} />
      )}
    </Layout>
  );
};

export default App;