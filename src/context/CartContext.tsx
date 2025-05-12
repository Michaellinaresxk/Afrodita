'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Context para manejar el estado global del carrito
import { createContext, useContext } from 'react';
import SideCart from '@/components/ui/SideCart';
// import SideCart from '@/components/ui/SideCart';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  // Estado del carrito
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const router = useRouter();

  // Calcular totales cuando cambia el carrito
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotalValue = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setCartCount(count);
    setSubtotal(subtotalValue);

    // Opcional: guardar en localStorage para persistencia
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Error parsing cart from localStorage', e);
        }
      }
    }
  }, []);

  // Método para añadir al carrito
  const addToCart = (product, quantity = 1) => {
    const selectedSize = product.selectedSize || 'Estándar';

    setCartItems((prevItems) => {
      // Comprobar si el producto ya está en el carrito con el mismo tamaño
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Actualizar cantidad si ya existe
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Añadir nuevo producto
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            imageSrc:
              product.imageSrc ||
              product.images?.[0] ||
              '/img/productos/jabon-6.jpg',
            selectedSize,
            quantity,
          },
        ];
      }
    });

    // Abrir el carrito
    setIsCartOpen(true);
  };

  // Eliminar del carrito
  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      )
    );
  };

  // Actualizar cantidad
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  // Ir a checkout
  const goToCheckout = () => {
    setIsCartOpen(false);
    router.push('/payment');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        goToCheckout,
      }}
    >
      {children}
      <SideCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        subtotal={subtotal}
      />
    </CartContext.Provider>
  );
};

export default CartProvider;
