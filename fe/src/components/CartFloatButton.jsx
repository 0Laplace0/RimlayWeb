import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { swalUtils } from '../utils/swalUtils.js';
import Swal from 'sweetalert2';

const CartFloatButton = () => {
  const { groupedItems, totalAmount, currentCurrency, clearCart, updateQuantity, removeFromCart } = useCart();
  const isCartOpenRef = useRef(false);

  useEffect(() => {
    const handleCartAction = (e) => {
      const { action, id } = e.detail;
      if (action === 'increase') updateQuantity(id, 1);
      if (action === 'decrease') updateQuantity(id, -1);
      if (action === 'remove') removeFromCart(id);
    };

    window.addEventListener('cart-item-action', handleCartAction);
    return () => window.removeEventListener('cart-item-action', handleCartAction);
  }, [updateQuantity, removeFromCart]);

  const getCartHtml = () => `
    <style>
      /* ตกแต่ง Scrollbar สำหรับตะกร้าสินค้า */
      .custom-cart-scroll::-webkit-scrollbar {
        width: 8px;
      }
      .custom-cart-scroll::-webkit-scrollbar-track {
        background: #181128; /* สีพื้นหลัง Track */
        border-radius: 10px;
      }
      .custom-cart-scroll::-webkit-scrollbar-thumb {
        background: #5b21b6; /* สีม่วงเข้ม */
        border-radius: 10px;
        border: 2px solid #181128; /* เพิ่มขอบให้ดูมีมิติ */
      }
      .custom-cart-scroll::-webkit-scrollbar-thumb:hover {
        background: #7c3aed; /* สีม่วงสว่างเมื่อชี้เมาส์ */
      }
    </style>

    <div class="custom-cart-scroll" style="width: 100%; color: #ffffff; font-size: 13px; font-family: sans-serif; text-align: left; max-height: 420px; overflow-y: auto; padding-right: 8px;">
      
      <!-- Table Header -->
      <div style="display: flex; border-bottom: 2px solid #374151; padding-bottom: 10px; margin-bottom: 12px; font-weight: bold; color: #a78bfa; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; position: sticky; top: 0; background: #0f0a1c; z-index: 10;">
        <div style="width: 42%;">Product</div>
        <div style="width: 18%; text-align: left;">Price</div>
        <div style="width: 22%; text-align: center;">Quantity</div>
        <div style="width: 18%; text-align: right;">Total</div>
      </div>
      
      <!-- Table Body -->
      ${groupedItems.length === 0 ? '<div style="text-align: center; padding: 20px; color: #9ca3af;">ไม่มีสินค้าในตะกร้า</div>' : 
        groupedItems.map(item => `
          <div style="display: flex; padding: 12px 0; border-bottom: 1px solid #27272a; align-items: center;">
            
            <!-- Product Info -->
            <div style="width: 42%; display: flex; align-items: center; gap: 10px;">
              <img src="${item.image}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; background: #27272a; border: 1px solid #3f3f46;" />
              <div style="overflow: hidden;">
                <div style="font-weight: 600; color: #f43f5e; margin-bottom: 2px; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
                <div style="color: #9ca3af; font-size: 11px; margin-bottom: 4px;">White / M</div>
                <button 
                  onclick="window.dispatchEvent(new CustomEvent('cart-item-action', { detail: { action: 'remove', id: '${item.id}' } }))"
                  style="background: none; border: none; color: #9ca3af; padding: 0; cursor: pointer; font-size: 11px; text-decoration: underline;"
                  onmouseover="this.style.color='#f43f5e'" onmouseout="this.style.color='#9ca3af'"
                >Remove</button>
              </div>
            </div>

            <!-- Price -->
            <div style="width: 18%; color: #d4d4d8; font-size: 12px;">
              $${item.price.toLocaleString()}
            </div>

            <!-- Quantity Controls -->
            <div style="width: 22%; display: flex; justify-content: center; align-items: center; gap: 8px; background: #181128; padding: 4px 6px; border-radius: 6px; border: 1px solid #3f3f46;">
              <button 
                onclick="window.dispatchEvent(new CustomEvent('cart-item-action', { detail: { action: 'decrease', id: '${item.id}' } }))"
                style="background: none; border: none; cursor: pointer; color: #d4d4d8; font-size: 14px; font-weight: bold; width: 20px;"
              >-</button>
              <span style="font-weight: 600; font-size: 12px; min-width: 16px; text-align: center; color: #ffffff;">${item.quantity}</span>
              <button 
                onclick="window.dispatchEvent(new CustomEvent('cart-item-action', { detail: { action: 'increase', id: '${item.id}' } }))"
                style="background: none; border: none; cursor: pointer; color: #d4d4d8; font-size: 14px; font-weight: bold; width: 20px;"
              >+</button>
            </div>

            <!-- Total Item Price -->
            <div style="width: 18%; text-align: right; font-weight: 600; color: #ffffff; font-size: 12px;">
              $${(item.price * item.quantity).toLocaleString()}
            </div>

          </div>
        `).join('')}

      <!-- Total Summary Footer -->
      ${groupedItems.length > 0 ? `
        <div style="display: flex; justify-content: flex-end; align-items: center; padding-top: 16px; font-size: 14px; font-weight: bold; color: #ffffff;">
            <div style="margin-right: 16px; font-size: 12px; text-transform: uppercase; color: #9ca3af;">Estimated Total :</div>
            <div style="font-size: 18px; color: #34d399;">$${totalAmount.toLocaleString()} ${currentCurrency}</div>
        </div>
      ` : ''}
    </div>
  `;

  useEffect(() => {
    if (isCartOpenRef.current) {
      if (groupedItems.length === 0) {
        Swal.close();
        isCartOpenRef.current = false;
      } else {
        const htmlContainer = Swal.getHtmlContainer();
        if (htmlContainer) {
          const dynamicArea = htmlContainer.querySelector('#cart-dynamic-table-container');
          if (dynamicArea) {
            dynamicArea.innerHTML = getCartHtml();
          }
        }
      }
    }
  }, [groupedItems, totalAmount]);

  const handleCheckout = async () => {
    isCartOpenRef.current = true;

    const wrappedHtml = `
      <div id="cart-dynamic-table-container" style="width: 100%;">
        ${getCartHtml()}
      </div>
    `;

    const confirmed = await swalUtils.previewConfirm({
        actionTitle: 'YOUR CART',
        fields: [{ value: wrappedHtml }],
        confirmText: 'CHECKOUT',
        cancelText: 'CLOSE'
    });

    isCartOpenRef.current = false;

    if (confirmed) {
      swalUtils.success('สั่งซื้อสำเร็จ!', 'ชำระเงินเรียบร้อยแล้ว');
      clearCart();
    }
  };

  if (groupedItems.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={handleCheckout}
        className="relative flex items-center justify-center w-16 h-16 bg-black rounded-full border border-purple-900/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-110 transition-transform duration-200"
      >
        <span className="text-2xl">🛒</span>
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold border-2 border-black">
          {groupedItems.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </button>
    </div>
  );
};

export default CartFloatButton;