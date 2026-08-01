import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
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

  // ระบบดึงข้อมูลและอัปเดตแบบ Real-time
  useEffect(() => {
    const fetchCarousels = () => {
      const savedCarousels = localStorage.getItem('carousel_images');
      if (savedCarousels) {
        try {
          const parsed = JSON.parse(savedCarousels);
          
          if (parsed && parsed.length > 0) {
            setCarouselImages(parsed.map(item => item.url));
            return; 
          }
        } catch (error) {
          console.error("Error parsing carousel data:", error);
        }
      } 
      
      // Fallback กรณีไม่มีข้อมูล
      setCarouselImages([
        "https://placehold.co/1000x300/1e1b4b/a855f7?text=PROMOTION+1",
        "https://placehold.co/1000x300/0f172a/a855f7?text=NEW+ITEMS",
        "https://placehold.co/1000x300/180828/a855f7?text=DISCOUNT+50%"
      ]);
    };

    fetchCarousels();

    window.addEventListener('storage', fetchCarousels);
    return () => window.removeEventListener('storage', fetchCarousels);
  }, []);

  useEffect(() => {
    if (carouselImages.length <= 1) return;

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === carouselImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [carouselImages]);

  const currentList = activeTab === 'shop' ? shopProducts : accumulateProducts;

  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product) => {
    setIsModalOpen(false);
    
    const currency = activeTab === 'shop' ? 'Cash' : 'Points';
    const isSuccess = addToCart(product, product.quantity || 1, currency);
    
    if (isSuccess) {
      swalUtils.success(
        'เพิ่มลงตะกร้าแล้ว!', 
        `"${product.name}" จำนวน ${product.quantity || 1} ชิ้น ถูกเพิ่มในตะกร้าของคุณเรียบร้อยแล้ว`
      );
    }
  };

  const handleMore = () => {
    window.location.href = activeTab === 'shop' ? '/shop' : '/accumulate-shop';
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full relative">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* CAROUSEL */}
        <div className="relative w-full max-w-[1000px] h-[300px] overflow-hidden rounded-xl border border-purple-900/30 mb-8 mx-auto group">
          
          {/* Slider Container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((src, i) => (
              <img key={i} src={src} className="w-full h-full object-cover shrink-0" alt={`Slide ${i}`} />
            ))}
          </div>

          {/* ปุ่มเลื่อนซ้าย */}
          {carouselImages.length > 1 && (
            <button 
              onClick={() => setCurrentSlide(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600 cursor-pointer"
            >
              ❮
            </button>
          )}

          {/* ปุ่มเลื่อนขวา */}
          {carouselImages.length > 1 && (
            <button 
              onClick={() => setCurrentSlide(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600 cursor-pointer"
            >
              ❯
            </button>
          )}

          {/* จุดบอกตำแหน่ง (Dots) */}
          {carouselImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'bg-purple-500 w-6' : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* TABS & MORE */}
        <div className="w-full max-w-[1000px] mb-6 flex justify-between items-center">
            <div className="p-1.5 bg-[#08080a] border border-purple-950/60 rounded-full flex gap-1">
                <button onClick={() => setActiveTab('shop')} className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'shop' ? 'bg-purple-600' : 'text-gray-400'}`}>SHOP</button>
                <button onClick={() => setActiveTab('accumulate')} className={`px-8 py-2 rounded-full font-bold transition-all ${activeTab === 'accumulate' ? 'bg-blue-600' : 'text-gray-400'}`}>ACCUMULATE</button>
            </div>
            <button onClick={handleMore} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-bold border border-gray-700 transition-all cursor-pointer">
                เพิ่มเติม
            </button>
        </div>

        {/* PRODUCT GRID */}
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