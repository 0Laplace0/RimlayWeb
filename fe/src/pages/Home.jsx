import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import CartFloatButton from '../components/CartFloatButton';
import { swalUtils } from '../utils/swalUtils.js';
import { useCart } from '../context/CartContext.jsx';

import { shopProducts } from './Shop'; 
import { accumulateProducts } from './AccumulateShop';

const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('shop');
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const savedCarousels = localStorage.getItem('carousel_images');
    if (savedCarousels) {
      const parsed = JSON.parse(savedCarousels);
      setCarouselImages(parsed.map(item => item.url));
    } else {
      setCarouselImages([
        "https://placehold.co/1000x300/1e1b4b/a855f7?text=PROMOTION+1",
        "https://placehold.co/1000x300/0f172a/a855f7?text=NEW+ITEMS",
        "https://placehold.co/1000x300/180828/a855f7?text=DISCOUNT+50%"
      ]);
    }
  }, []);

  const currentList = activeTab === 'shop' ? shopProducts : accumulateProducts;

  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    setIsModalOpen(false);
    addToCart(product, product.quantity || 1);
    swalUtils.success(
      'เพิ่มลงตะกร้าแล้ว!', 
      `"${product.name}" จำนวน ${product.quantity || 1} ชิ้น ถูกเพิ่มในตะกร้าของคุณเรียบร้อยแล้ว`
    );
  };

  const handleMore = () => {
    window.location.href = activeTab === 'shop' ? '/shop' : '/accumulate-shop';
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full relative">
      <Navbar />
      <CartFloatButton />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* CAROUSEL */}
        <div className="relative w-full max-w-[1000px] h-[300px] overflow-hidden rounded-xl border border-purple-900/30 mb-8 mx-auto">
          <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselImages.map((src, i) => <img key={i} src={src} className="w-full h-full object-cover shrink-0" />)}
          </div>
        </div>

        {/* TABS & MORE */}
        <div className="w-full max-w-[1000px] mb-6 flex justify-between items-center">
            <div className="p-1.5 bg-[#08080a] border border-purple-950/60 rounded-full flex gap-1">
                <button onClick={() => setActiveTab('shop')} className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'shop' ? 'bg-purple-600' : 'text-gray-400'}`}>SHOP</button>
                <button onClick={() => setActiveTab('accumulate')} className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'accumulate' ? 'bg-blue-600' : 'text-gray-400'}`}>ACCUMULATE</button>
            </div>
            <button onClick={handleMore} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-bold border border-gray-700 transition-all">
                เพิ่มเติม
            </button>
        </div>

        {/* PRODUCT GRID (แสดงเฉพาะรายการสินค้า 2 แถว ไม่มี Header แต่อย่างใด) */}
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={currentList} 
            cols={4} 
            rows={2} 
            priceUnit={activeTab === 'shop' ? 'Cash' : 'Points'}
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      {/* ITEM DETAIL MODAL */}
      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        priceUnit={activeTab === 'shop' ? 'Cash' : 'Points'}
        onBuy={handleAddToCart}
      />
    </div>
  );
};

export default Home;