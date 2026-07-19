import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, unit) => {
  setCartItems((prev) => [...prev, { ...product, unit, cartId: Date.now() }]);
};

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  // ฟังก์ชันจัดกลุ่มสินค้าเพื่อแสดงผลรายการ
  const groupedItems = useMemo(() => {
    const groups = {};
    cartItems.forEach(item => {
      if (!groups[item.name]) {
        groups[item.name] = { ...item, count: 0, totalPrice: 0 };
      }
      groups[item.name].count += 1;
      groups[item.name].totalPrice += item.price;
    });
    return Object.values(groups);
  }, [cartItems]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, groupedItems, totalAmount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);