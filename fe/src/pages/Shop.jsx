import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

export const shopProducts = [
  { id: 'shop-1', name: 'Mechanical Keyboard RGB', category: 'Keyboard', price: 150, image: "https://placehold.co/300x300/121214/a855f7?text=Keyboard", description: 'คีย์บอร์ดเกมมิ่ง Mechanical สวิตช์ตอบสนองไว ไฟ RGB อลังการ' },
  { id: 'shop-2', name: 'Wireless Gaming Mouse', category: 'Mouse', price: 90, image: "https://placehold.co/300x300/121214/a855f7?text=Mouse", description: 'เมาส์ไร้สายน้ำหนักเบา เซนเซอร์ความละเอียดสูง' },
  { id: 'shop-3', name: '7.1 Surround Headset', category: 'Headset', price: 120, image: "https://placehold.co/300x300/121214/a855f7?text=Headset", description: 'หูฟังเกมมิ่งระบบเสียง 7.1 ตัดเสียงรบกวนดีเยี่ยม' },
  { id: 'shop-4', name: 'Ultra-Wide Gaming Monitor', category: 'Monitor', price: 450, image: "https://placehold.co/300x300/121214/a855f7?text=Monitor", description: 'จอภาพ 144Hz ความละเอียดสูง ให้มุมมองกว้างไกล' },
  { id: 'shop-5', name: 'Gaming Chair Ergonomic', category: 'Accessory', price: 320, image: "https://placehold.co/300x300/121214/a855f7?text=Chair", description: 'เก้าอี้เกมมิ่งเพื่อสุขภาพ นั่งสบายยาวนานตลอดวัน' },
  { id: 'shop-6', name: 'RGB Mouse Pad XXL', category: 'Accessory', price: 45, image: "https://placehold.co/300x300/121214/a855f7?text=Mousepad", description: 'แผ่นรองเมาส์ขนาดใหญ่พิเศษ พร้อมไฟ RGB ขอบด้านข้าง' },
  { id: 'shop-7', name: 'Streamer Microphone', category: 'Gadget', price: 110, image: "https://placehold.co/300x300/121214/a855f7?text=Mic", description: 'ไมโครโฟนคอนเดนเซอร์สำหรับการสตรีมมิ่ง คมชัดทุกรายละเอียด' },
  { id: 'shop-8', name: 'Webcam 4K Ultra HD', category: 'Gadget', price: 180, image: "https://placehold.co/300x300/121214/a855f7?text=Webcam", description: 'กล้องเว็บแคมความละเอียด 4K ภาพคมชัดสูง' },
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addToCart } = useCart();

  // 1. ดึงหมวดหมู่ที่ไม่ซ้ำกันจากรายการสินค้าที่มีอยู่จริง ( Dynamic จาก CRUD )
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(shopProducts.map(item => item.category).filter(Boolean))
    );
    return ['All', ...uniqueCats];
  }, [shopProducts]);

  // 2. กรองสินค้าตาม Category ที่เลือก
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return shopProducts;
    return shopProducts.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

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

          {/* 🎯 Category Filter Bar (ตำแหน่งที่วางการกรองหมวดหมู่) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/30'
                      : 'bg-[#121216] text-gray-400 border-purple-950/60 hover:text-purple-300 hover:border-purple-800'
                  }`}
                >
                  {cat === 'All' ? 'ทั้งหมด (All)' : cat}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <ProductGrid 
            products={filteredProducts} 
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