import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

export const shopProducts = Array.from({ length: 25 }, (_, index) => ({
  id: `shop-${index + 1}`,
  name: `Shop Item ${index + 1}`,
  price: Math.floor(Math.random() * 200) + 20,
  image: "https://placehold.co/300x300/121214/a855f7?text=Shop",
  description: `นี่คือรายละเอียดของ Shop Item ${index + 1} สินค้ามาตรฐานเกมมิ่งเกียร์ที่จะช่วยอัปเกรดประสิทธิภาพการใช้งานของคุณให้มีประสิทธิภาพและก้าวล้ำไปอีกขั้นในวันนี้`,
}));

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart();

  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    setIsModalOpen(false);
    const isSuccess = addToCart(product, product.quantity || 1, 'Cash');
    
    if (isSuccess) {
      swalUtils.success(
        'เพิ่มลงตะกร้าแล้ว!', 
        `"${product.name}" จำนวน ${product.quantity || 1} ชิ้น ถูกเพิ่มในตะกร้าของคุณเรียบร้อยแล้ว`
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
            <div className="p-2 rounded-lg border bg-purple-600/20 border-purple-500/30 text-purple-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold tracking-wider text-purple-300">
                MAIN SHOP
              </h2>
              <p className="text-xs text-gray-400">ร้านค้าทั่วไป</p>
            </div>
          </div>

          <ProductGrid 
            products={shopProducts} 
            cols={4} 
            rows={5} 
            priceUnit="Cash"
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        priceUnit="Cash"
        onBuy={handleAddToCart}
      />
    </div>
  );
};

export default Shop;