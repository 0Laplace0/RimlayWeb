import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

// เพิ่มฟิลด์ category ลงใน Mock Data
export const accumulateProducts = [
  { id: 'acc-1', name: 'Golden Cat Condo', category: 'Furniture', price: 1200, image: "https://placehold.co/300x300/121214/06b6d4?text=Condo", description: 'คอนโดแมวพรีเมียมลิมิเต็ดเอดิชันสำหรับทาสผู้มีคะแนนสะสมสูงสุด' },
  { id: 'acc-2', name: 'Cosplay Wing Wings', category: 'Costume', price: 450, image: "https://placehold.co/300x300/121214/06b6d4?text=Wings", description: 'ปีกคอสเพลย์แฟนซีสำหรับสัตว์เลี้ยง' },
  { id: 'acc-3', name: 'Cat Fountain Gold', category: 'Gadget', price: 800, image: "https://placehold.co/300x300/121214/06b6d4?text=Fountain", description: 'น้ำพุแมวอัจฉริยะประดับขอบสีทองสวยงาม' },
  { id: 'acc-4', name: 'Royal Cat Crown', category: 'Costume', price: 300, image: "https://placehold.co/300x300/121214/06b6d4?text=Crown", description: 'มงกุฎเจ้าชายเจ้าหญิงสุดน่ารัก' },
  { id: 'acc-5', name: 'Heated Cat Mat', category: 'Furniture', price: 600, image: "https://placehold.co/300x300/121214/06b6d4?text=Bed", description: 'เบาะนอนปรับอุณหภูมิอุ่นนุ่มสบาย' },
  { id: 'acc-6', name: 'Laser Collar Toy', category: 'Toy', price: 550, image: "https://placehold.co/300x300/121214/06b6d4?text=Toy", description: 'ปลอกคอปล่อยแสงเลเซอร์อัตโนมัติ' },
];

const AccumulateShop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { addToCart } = useCart();

  // 1. ดึงหมวดหมู่ที่ไม่ซ้ำกันจากรายการสินค้าแลกแต้มที่มีอยู่จริง ( Dynamic จาก CRUD )
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(accumulateProducts.map(item => item.category).filter(Boolean))
    );
    return ['All', ...uniqueCats];
  }, [accumulateProducts]);

  // 2. กรองสินค้าตาม Category ที่เลือก
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return accumulateProducts;
    return accumulateProducts.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

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

          {/* 🎯 Category Filter Bar (โทนสีฟ้าตามธีม Accumulate Shop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shrink-0 border ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                      : 'bg-[#121216] text-gray-400 border-blue-950/60 hover:text-blue-300 hover:border-blue-800'
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