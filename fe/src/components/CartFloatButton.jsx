import { useCart } from '../context/CartContext.jsx';
import { swalUtils } from '../utils/swalUtils.js';

const CartFloatButton = () => {
  const { groupedItems, totalAmount, clearCart, removeFromCart } = useCart();

  const handleCheckout = async () => {
    const tableHtml = `
      <div style="width: 100%; color: #ffffff; font-size: 13px; margin-top: 10px; font-family: sans-serif;">
        <!-- Header -->
        <div style="display: flex; border-bottom: 1px solid #4b5563; padding-bottom: 8px; margin-bottom: 8px; color: #a78bfa; font-weight: bold;">
          <div style="width: 10%; text-align: left;"></div>
          <div style="width: 60%; text-align: left;">รายการสินค้า</div>
          <div style="width: 10%; text-align: center;">จำนวน</div>
          <div style="width: 20%; text-align: right;">ราคา</div>
        </div>
        
        <!-- Items -->
        ${groupedItems.map(item => `
          <div style="display: flex; padding: 6px 0; border-bottom: 1px solid #1f2937; align-items: center;">
            <div style="width: 10%; text-align: left;">
              <button 
                onclick="window.dispatchEvent(new CustomEvent('remove-cart-item', { detail: '${item.name}' }))"
                style="background: #ef4444; color: white; border: none; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: bold;"
              >X</button>
            </div>
            <div style="width: 60%; text-align: left;">${item.name}</div>
            <div style="width: 10%; text-align: center;">${item.count}</div>
            <div style="width: 20%; text-align: right;">${item.totalPrice.toLocaleString()}</div>
          </div>
        `).join('')}

        <!-- Total -->
        <div style="display: flex; justify-content: flex-end; align-items: center; padding-top: 12px; font-size: 14px; font-weight: bold;">
            <div style="margin-right: 8px;">ราคารวม :</div>
            <div>${totalAmount.toLocaleString()} ${groupedItems[0]?.unit || 'Cash'}</div>
        </div>
      </div>
    `;

    const handleRemove = (e) => {
        // ตัวอย่างนี้คือการลบสินค้าที่ชื่อนั้นออกจากตะกร้าทั้งหมด
        // คุณอาจต้องเพิ่มฟังก์ชัน removeAllByName ใน CartContext
    };
    
    window.addEventListener('remove-cart-item', handleRemove);

    const confirmed = await swalUtils.previewConfirm({
        actionTitle: 'ตะกร้าสินค้าของคุณ',
        fields: [{ value: tableHtml }],
        confirmText: 'ชำระเงิน',
        cancelText: 'ปิด'
    });

    window.removeEventListener('remove-cart-item', handleRemove);

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
          {groupedItems.reduce((sum, item) => sum + item.count, 0)}
        </div>
      </button>
    </div>
  );
};

export default CartFloatButton;