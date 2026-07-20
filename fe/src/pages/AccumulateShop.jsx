import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

export const accumulateProducts = Array.from({ length: 22 }, (_, index) => ({
  id: `acc-${index + 1}`,
  name: `Accumulated Reward ${index + 1}`,
  price: (index + 1) * 100,
  image: "https://placehold.co/300x300/121214/06b6d4?text=Reward",
  description: `ไอเท็มระดับรางวัลพิเศษของสะสมชิ้นที่ ${index + 1} แลกรับสิทธิ์ได้เฉพาะผู้ที่มีคะแนนสะสมครบตามที่กำหนดเท่านั้น เป็นลิมิเต็ดเอดิชันเฉพาะซีซันนี้`,
}));

const AccumulateShop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addToCart } = useCart();

  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    setIsModalOpen(false);
    const isSuccess = addToCart(product, product.quantity || 1, 'Points'); 
    
    if (isSuccess) {
      swalUtils.success(
        'เพิ่มลงตะกร้าแล้ว!', 
        `"${product.name}" จำนวน ${product.quantity || 1} ชิ้น ถูกเพิ่มในตะกร้าของคุณ (${(product.price * (product.quantity || 1)).toLocaleString()} Points)`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg border bg-blue-600/20 border-blue-500/30 text-blue-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold tracking-wider text-blue-300">
                ACCUMULATE SHOP
              </h2>
              <p className="text-xs text-gray-400">ร้านค้ายอดสะสม</p>
            </div>
          </div>

          <ProductGrid 
            products={accumulateProducts} 
            cols={4} 
            rows={5} 
            priceUnit="Points"
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        priceUnit="Points"
        onBuy={handleAddToCart}
      />
    </div>
  );
};

export default AccumulateShop;