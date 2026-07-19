import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

const AccumulateShop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // เรียกใช้ฟังก์ชัน addToCart จาก Context
  const { addToCart } = useCart();

  const accumulateProducts = Array.from({ length: 22 }, (_, index) => ({
    id: `acc-${index + 1}`,
    name: `Accumulated Reward ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://placehold.co/300x300/121214/06b6d4?text=Reward",
    description: `ไอเท็มระดับรางวัลพิเศษของสะสมชิ้นที่ ${index + 1} แลกรับสิทธิ์ได้เฉพาะผู้ที่มีคะแนนสะสมครบตามที่กำหนดเท่านั้น เป็นลิมิเต็ดเอดิชันเฉพาะซีซันนี้`,
  }));

  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ฟังก์ชันเพิ่มลงตะกร้า
  const handleAddToCart = (product) => {
    setIsModalOpen(false);
    
    addToCart(product);
    
    swalUtils.success(
      'เพิ่มลงตะกร้าแล้ว!', 
      `"${product.name}" ถูกเพิ่มในตะกร้าของคุณ (${product.price.toLocaleString()} Points)`
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={accumulateProducts} 
            title="ACCUMULATE SHOP" 
            subtitle="ร้านค้ายอดสะสม" 
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