"use client";
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  LogOut, 
  Search, 
  X, 
  Plus, 
  Minus,
//   ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/index.ui';

// Tipos para nuestros productos
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const ClienteDashboard: React.FC = () => {
  // Estados para la aplicación
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [categories] = useState<string[]>([
    'Todos', 'Smartphones', 'Laptops', 'Accesorios', 'Audio', 'Monitores'
  ]);

  // Simular carga de productos
  useEffect(() => {
    // Aquí normalmente harías un fetch a tu API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        description: "El último modelo de Apple con A17 Pro y cámara mejorada",
        price: 999.99,
        image: "/api/placeholder/300/300",
        category: "Smartphones",
        stock: 15
      },
      {
        id: 2,
        name: "Samsung Galaxy S24",
        description: "Pantalla Dynamic AMOLED 2X y procesador Exynos potente",
        price: 899.99,
        image: "/api/placeholder/300/300",
        category: "Smartphones",
        stock: 20
      },
      {
        id: 3,
        name: "MacBook Pro 16",
        description: "Con chip M3 Pro, 32GB RAM y 1TB SSD",
        price: 2499.99,
        image: "/api/placeholder/300/300",
        category: "Laptops",
        stock: 8
      },
      {
        id: 4,
        name: "Dell XPS 15",
        description: "Intel Core i9, 32GB RAM, RTX 4070",
        price: 1999.99,
        image: "/api/placeholder/300/300",
        category: "Laptops",
        stock: 10
      },
      {
        id: 5,
        name: "AirPods Pro 2",
        description: "Cancelación de ruido activa y audio espacial",
        price: 249.99,
        image: "/api/placeholder/300/300",
        category: "Audio",
        stock: 25
      },
      {
        id: 6,
        name: "Monitor LG UltraGear 27",
        description: "Monitor gaming 1440p, 165Hz, 1ms",
        price: 349.99,
        image: "/api/placeholder/300/300",
        category: "Monitores",
        stock: 12
      },
      {
        id: 7,
        name: "Logitech MX Master 3S",
        description: "Mouse inalámbrico premium para productividad",
        price: 99.99,
        image: "/api/placeholder/300/300",
        category: "Accesorios",
        stock: 30
      },
      {
        id: 8,
        name: "Samsung T7 SSD 1TB",
        description: "SSD externo portátil de alta velocidad",
        price: 129.99,
        image: "/api/placeholder/300/300",
        category: "Accesorios",
        stock: 22
      },
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Funciones para filtrar productos
  useEffect(() => {
    let result = [...products];
    
    // Filtro por categoría
    if (selectedCategory !== 'Todos') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filtro por término de búsqueda
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);
  
  // Función para agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };
  
  // Función para eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };
  
  // Función para cambiar cantidad en el carrito
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Cálculo del total del carrito
  const cartTotal = cart.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">TechStore</h1>
          
          {/* Barra de búsqueda */}
          <div className="flex-grow max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full p-2 rounded-md border border-gray-300 text-gray-800 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          
          {/* Íconos de navegación */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="p-2">
              <Heart size={24} />
            </button>
            <div className="flex items-center">
              <User size={24} className="mr-2" />
              <span className="hidden md:block">Usuario</span>
            </div>
            <button className="p-2">
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar de categorías */}
          <aside className="w-full md:w-64 mb-4 md:mb-0 md:mr-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Categorías</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`w-full text-left p-2 rounded-md ${
                        selectedCategory === category 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          {/* Lista de productos */}
          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                {selectedCategory === 'Todos' ? 'Todos los Productos' : selectedCategory}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Ordenar por:</span>
                <select className="border rounded p-1">
                  <option>Relevancia</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Más vendidos</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-contain bg-gray-100 p-4" 
                    />
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                      <div className="mt-2 text-blue-600 font-bold text-xl">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                      </div>
                    </div>
                    <div className="p-4 pt-0 mt-auto">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Carrito lateral */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tu Carrito</h2>
            <button onClick={() => setShowCart(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex border-b pb-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-contain bg-gray-100 rounded" 
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <div className="text-blue-600">${item.product.price.toFixed(2)}</div>
                      <div className="flex items-center mt-2">
                        <button 
                          className="p-1 border rounded"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          className="p-1 border rounded"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Envío:</span>
              <span>Calculado en el checkout</span>
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={cart.length === 0}
            >
              Proceder al pago
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay para carrito en móviles */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setShowCart(false)}
        />
      )}
      
      <footer className="bg-slate-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TechStore</h3>
              <p className="text-sm text-gray-300">
                Tu tienda de confianza para todos tus productos electrónicos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Inicio</a></li>
                <li><a href="#" className="hover:text-blue-400">Productos</a></li>
                <li><a href="#" className="hover:text-blue-400">Ofertas</a></li>
                <li><a href="#" className="hover:text-blue-400">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Servicio al cliente</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Ayuda</a></li>
                <li><a href="#" className="hover:text-blue-400">Devoluciones</a></li>
                <li><a href="#" className="hover:text-blue-400">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
              <ul className="space-y-2 text-sm">
                <li>contacto@techstore.com</li>
                <li>+123 456 7890</li>
                <li>Av. Principal #123, Ciudad</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2024 TechStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClienteDashboard;
