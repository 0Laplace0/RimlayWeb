import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

const Shop = () => {
  // State คุมการเปิดปิดและเลือกสินค้าเพื่อแสดงผลใน Pop-up
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart();

  // สร้างสินค้าจำลองสำหรับหน้าร้านค้าหลักทั่วไป
  const shopProducts = Array.from({ length: 25 }, (_, index) => ({
    id: `shop-${index + 1}`,
    name: `Shop Item ${index + 1}`,
    price: Math.floor(Math.random() * 200) + 20,
    image: "https://placehold.co/300x300/121214/a855f7?text=Shop",
    description: `นี่คือรายละเอียดของ Shop Item ${index + 1} สินค้ามาตรฐานเกมมิ่งเกียร์ที่จะช่วยอัปเกรดประสิทธิภาพการใช้งานของคุณให้มีประสิทธิภาพและก้าวล้ำไปอีกขั้นในวันนี้`,
  }));

  // เมื่อคลิกที่ Item ใน Grid จะเปิด Pop-up ขึ้นมา
  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ฟังก์ชัน "เพิ่มลงตะกร้า"
  const handleAddToCart = (product) => {
    setIsModalOpen(false);

    addToCart(product);

    // แจ้งเตือนความสำเร็จ
    swalUtils.success(
      'เพิ่มลงตะกร้าแล้ว!', 
      `"${product.name}" ถูกเพิ่มในตะกร้าของคุณเรียบร้อยแล้ว`
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={shopProducts} 
            title="MAIN SHOP" 
            subtitle="ร้านค้าทั่วไป" 
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