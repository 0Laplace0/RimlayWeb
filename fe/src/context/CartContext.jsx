import { createContext, useContext, useState } from 'react';
import { swalUtils } from '../utils/swalUtils.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, currencyType = 'Cash') => {
    const qty = Number(quantity) || 1;

    // ถ้าระบบบล็อก จะเด้ง Alert Error และส่งค่า false กลับไป
    if (cartItems.length > 0 && cartItems[0].currency !== currencyType) {
      swalUtils.error(
        'ไม่สามารถเพิ่มสินค้าคนละประเภทได้', 
        `ในตะกร้าของคุณมีสินค้าประเภท <b>${cartItems[0].currency}</b> อยู่แล้ว<br/>กรุณาชำระเงินหรือล้างตะกร้าก่อนเพิ่มสินค้าประเภท <b>${currencyType}</b>`
      );
      return false; 
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [...prev, { ...product, quantity: qty, currency: currencyType }];
      }
    });

    // ส่งค่า true กลับไปเมื่อเพิ่มสำเร็จ (เอา swalUtils.success ออกจากตรงนี้)
    return true;
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const groupedItems = cartItems;
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currentCurrency = cartItems[0]?.currency || 'Cash';

  return (
    <CartContext.Provider value={{ 
      cartItems: groupedItems, 
      groupedItems, 
      totalAmount, 
      currentCurrency, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);