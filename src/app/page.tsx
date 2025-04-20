"use client";
import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, Headphones, ShoppingCart, User, Search, ChevronRight,  
  Menu, X, Monitor, Tablet, Watch, CreditCard, Clock, Star
} from 'lucide-react';
import { Button, LoginForm, ChangePasswordForm } from '@/components/ui/index.ui';
import Image from 'next/image';



// Tipo para productos destacados
type FeaturedProduct = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  category: string;
};

// Tipo para categorías
type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const ModernElectronicsStore: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
    console.log(showLogin);

  // Productos destacados de ejemplo
  const featuredProducts: FeaturedProduct[] = [
    { 
      id: 1, 
      name: "iPhone 15 Pro Max", 
      price: 1199.99, 
      oldPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1695048133142-1a884b1c5b0c", 
      rating: 4.8, 
      category: "Smartphones"
    },
    { 
      id: 2, 
      name: "MacBook Air M3", 
      price: 1099.99, 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", 
      rating: 4.9, 
      category: "Laptops"
    },
    { 
      id: 3, 
      name: "Sony WH-1000XM5", 
      price: 349.99, 
      oldPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", 
      rating: 4.7, 
      category: "Audio"
    },
    { 
      id: 4, 
      name: "Samsung Galaxy Tab S9", 
      price: 849.99, 
      image: "https://images.unsplash.com/photo-1527698266440-12104e498b76", 
      rating: 4.6, 
      category: "Tablets"
    },
    { 
      id: 5, 
      name: "Dell XPS 13 Plus", 
      price: 1499.99, 
      oldPrice: 1699.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", 
      rating: 4.5, 
      category: "Laptops"
    },
    { 
      id: 6, 
      name: "Apple Watch Series 9", 
      price: 399.99, 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", 
      rating: 4.7, 
      category: "Wearables"
    },
    { 
      id: 7, 
      name: "LG C3 OLED 65\"", 
      price: 1799.99, 
      oldPrice: 2099.99,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1", 
      rating: 4.9, 
      category: "TV & Monitores"
    },
    { 
      id: 8, 
      name: "Bose QuietComfort Ultra", 
      price: 329.99, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", 
      rating: 4.6, 
      category: "Audio"
    }
  ];

  // Categorías principales
  const categories: Category[] = [
    { id: 1, name: "Smartphones", icon: <Smartphone size={24} /> },
    { id: 2, name: "Laptops", icon: <Laptop size={24} /> },
    { id: 3, name: "Audio", icon: <Headphones size={24} /> },
    { id: 4, name: "Monitores", icon: <Monitor size={24} /> },
    { id: 5, name: "Tablets", icon: <Tablet size={24} /> },
    { id: 6, name: "Wearables", icon: <Watch size={24} /> }
  ];

  // Banner slides
  const bannerSlides = [
    {
      title: "Nueva Serie iPhone 15",
      subtitle: "Experimenta el poder del chip A17 Pro",
      cta: "Comprar ahora",
      bgColor: "from-blue-600 to-purple-600",
      image: "https://images.unsplash.com/photo-1695048133142-1a884b1c5b0c"
    },
    {
      title: "Galaxy S24 Ultra",
      subtitle: "El futuro de la fotografía móvil",
      cta: "Ver detalles",
      bgColor: "from-green-600 to-blue-600",
      image: "https://images.unsplash.com/photo-1706041001387-576f8ae372b0"
    },
    {
      title: "MacBook Air M3",
      subtitle: "Poder y portabilidad incomparables",
      cta: "Descubrir",
      bgColor: "from-purple-600 to-pink-600",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    }
  ];

  // Cambiar slide automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // Renderizar estrellas de calificación
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">        
        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Menú móvil */}
            <div className="flex items-center">
              <button 
                className="mr-4 lg:hidden" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Tech<span className="font-extrabold">Store</span>
              </h1>
            </div>
            
            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Inicio</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Categorías</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Ofertas</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Novedades</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium">Soporte</a>
            </nav>
            {/* Iconos de usuario */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:text-blue-600 transition-colors">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </button>              
              <button 
                className="hidden sm:flex items-center hover:text-blue-600 transition-colors"
                onClick={() => setShowLogin(true)}
              >
                <User size={24} className="mr-2" />
                <span>Cuenta</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t pt-2 pb-4 px-4 shadow-md">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full p-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100">Inicio</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100">Categorías</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100">Ofertas</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium py-2 border-b border-gray-100">Novedades</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 font-medium py-2">Soporte</a>
              <button 
                className="flex items-center text-gray-800 hover:text-blue-600 font-medium py-2 mt-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogin(true);
                }}
              >
                <User size={20} className="mr-2" />
                <span>Mi cuenta</span>
              </button>
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {/* Formularios de login y cambio de contraseña */}
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <LoginForm onClose={() => setShowLogin(false)} />
            </div>
          </div>
        )}

        {showChangePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <ChangePasswordForm onClose={() => setShowChangePassword(false)} />
            </div>
          </div>
        )}
        {/* Hero Banner Slider */}
        <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-black">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="relative h-[400px]">
              {bannerSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 flex ${
                    currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                    <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                    <div>
                      <Button className={`bg-gradient-to-r ${slide.bgColor} text-white px-8 py-3 rounded-full hover:shadow-lg transition-all`}>
                        {slide.cta}
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex w-1/2 items-center justify-center">
                    <Image 
                      src={slide.image} 
                      alt={slide.title} 
                      width={600}
                      height={400}
                      className="max-h-[350px] object-contain"
                      priority={currentSlide === index}
                    />
                  </div>
                </div>
              ))}
              
              {/* Slider Dots */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-white" : "bg-gray-500"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Categorías en cards con iconos */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Descubre nuestras categorías</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <a 
                  key={category.id} 
                  href="#" 
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4 text-blue-600">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-center">{category.name}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Beneficios / Features */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
                <div className="rounded-full bg-blue-100 p-4 mr-4 text-blue-600">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Pago Seguro</h3>
                  <p className="text-gray-600">100% seguro con encriptación</p>
                </div>
              </div>
              <div className="flex items-center p-6 bg-white rounded-lg shadow-sm">
                <div className="rounded-full bg-blue-100 p-4 mr-4 text-blue-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Soporte 24/7</h3>
                  <p className="text-gray-600">Asistencia en todo momento</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending / Top Products */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Productos destacados</h2>
              <a href="#" className="flex items-center text-blue-600 hover:underline">
                Ver todo <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    {product.oldPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      width={500}
                      height={500}
                      className="w-full h-56 object-contain p-6 bg-gray-50 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex mb-2">
                      {renderRatingStars(product.rating)}
                      <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.oldPrice && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      </div>
                      <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para mejorar tu tecnología?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Descubre nuestras increíbles ofertas en los productos más recientes y únete a la revolución tecnológica.
            </p>
            <Button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full text-lg font-medium shadow-lg">
              Explorar ofertas
            </Button>
          </div>
        </section>
        
        {/* Blog/News Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Últimas noticias</h2>
              <a href="#" className="flex items-center text-blue-600 hover:underline">
                Ver blog <ChevronRight size={16} />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img src="/api/placeholder/600/300" alt="Tech News" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">Noticias</div>
                  <h3 className="text-xl font-semibold mb-2">Los mejores smartphones de 2025</h3>
                  <p className="text-gray-600 mb-4">
                    Analizamos los dispositivos más innovadores que han llegado al mercado este año.
                  </p>
                  <a href="#" className="text-blue-600 font-medium hover:underline">Leer más</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img src="/api/placeholder/600/300" alt="Tech Guide" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">Guías</div>
                  <h3 className="text-xl font-semibold mb-2">Cómo elegir tu próximo ordenador</h3>
                  <p className="text-gray-600 mb-4">
                    Todo lo que debes saber antes de invertir en un nuevo equipo para tus necesidades.
                  </p>
                  <a href="#" className="text-blue-600 font-medium hover:underline">Leer más</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img src="/api/placeholder/600/300" alt="Tech Review" className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">Reviews</div>
                  <h3 className="text-xl font-semibold mb-2">Review: Los nuevos auriculares con IA</h3>
                  <p className="text-gray-600 mb-4">
                    Probamos los auriculares que están revolucionando la experiencia de audio.
                  </p>
                  <a href="#" className="text-blue-600 font-medium hover:underline">Leer más</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Mantente actualizado</h2>
              <p className="text-gray-600 mb-8">
                Suscríbete a nuestro newsletter para recibir las últimas noticias, ofertas exclusivas y consejos tecnológicos.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Tienda POS</h3>
              <p className="text-gray-400 mb-6">
                Tu tienda de confianza para todo lo relacionado con tecnología. Ofrecemos los productos más recientes con el mejor servicio.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  {/* Facebook icon would go here */}
                  <span>f</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                  {/* Twitter icon would go here */}
                  <span>t</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  {/* Instagram icon would go here */}
                  <span>i</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Enlaces rápidos</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Productos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ofertas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Ayuda</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Devoluciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Estado del pedido</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Métodos de pago</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Contacto</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  {/* Location icon would go here */}
                  <span className="ml-3">Av. Principal #123, Ciudad</span>
                </li>
                <li className="flex items-start">
                  {/* Phone icon would go here */}
                  <span className="ml-3">+123 456 7890</span>
                </li>
                <li className="flex items-start">
                  {/* Email icon would go here */}
                  <span className="ml-3">contacto@techstore.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 TiendaPOS. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Términos y condiciones</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernElectronicsStore;
