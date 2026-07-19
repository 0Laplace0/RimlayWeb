import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartFloatButton from '../components/CartFloatButton';
import { useCart } from '../context/CartContext.jsx';
import { swalUtils } from '../utils/swalUtils.js';

const Home = () => {
  const { addToCart } = useCart();
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct]);

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

  const shopProducts = Array.from({ length: 22 }, (_, index) => ({
    id: `shop-${index + 1}`,
    name: index === 0 ? "Premium Phone" : `Shop Product ${index + 1}`,
    price: index === 0 ? 1 : Math.floor(Math.random() * 100) + 10,
    unit: 'Cash',
    image: "https://placehold.co/300x300/121214/a855f7?text=Shop+Item",
    description: "รายละเอียดสินค้าพรีเมียมคุณภาพสูง",
  }));

  const accumulateProducts = Array.from({ length: 10 }, (_, index) => ({
    id: `acc-${index + 1}`,
    name: `Accumulate Reward ${index + 1}`,
    price: (index + 1) * 250,
    unit: 'Point',
    image: "https://placehold.co/300x300/180828/3b82f6?text=Reward+Item",
    description: "รางวัลพิเศษสำหรับผู้ใช้งานแต้มสะสม",
  }));

  const currentList = activeTab === 'shop' ? shopProducts : accumulateProducts;
  const currentProducts = currentList.slice(0, 8);

  // ฟังก์ชันกดซื้อในหน้า Home (เพิ่มเข้าตะกร้า)
  const handleAddToCart = (product, qty) => {
    addToCart(product, qty);
    setSelectedProduct(null);
    swalUtils.success('สำเร็จ!', `เพิ่ม ${product.name} จำนวน ${qty} ชิ้น ลงตะกร้าแล้ว`);
  };

  // ฟังก์ชันกด "เพิ่มเติม" สลับหน้า
  const handleMore = () => {
    window.location.href = activeTab === 'shop' ? '/shop' : '/accumulate-shop';
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full relative">
      <Navbar />
      <CartFloatButton />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* CAROUSEL */}
        <div className="relative w-full max-w-[1000px] h-[300px] overflow-hidden rounded-xl border border-purple-900/30 mb-8 mx-auto">
          <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselImages.map((src, i) => <img key={i} src={src} className="w-full h-full object-cover shrink-0" />)}
          </div>
        </div>

        {/* TABS & MORE */}
        <div className="w-full max-w-[1000px] mx-auto mb-6 flex justify-between items-center">
            <div className="p-1.5 bg-[#08080a] border border-purple-950/60 rounded-full flex gap-1">
                <button onClick={() => setActiveTab('shop')} className={`px-8 py-2 rounded-full font-bold ${activeTab === 'shop' ? 'bg-purple-600' : ''}`}>SHOP</button>
                <button onClick={() => setActiveTab('accumulate')} className={`px-8 py-2 rounded-full font-bold ${activeTab === 'accumulate' ? 'bg-blue-600' : ''}`}>ACCUMULATE</button>
            </div>
            <button onClick={handleMore} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-bold border border-gray-700 transition-all">
                เพิ่มเติม
            </button>
        </div>

        {/* GRID */}
        <div className="w-full max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {currentProducts.map((p) => (
              <div key={p.id} onClick={() => setSelectedProduct(p)} className="bg-[#0b0b0d] border border-purple-950/40 rounded-lg p-3 cursor-pointer hover:border-purple-500 transition-all">
                <img src={p.image} className="w-full aspect-square object-cover mb-2" />
                <div className="flex justify-between text-xs font-bold"><span>{p.name}</span><span className="text-purple-400">{p.price} {p.unit}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full max-w-[480px] bg-[#0c0c11] border border-gray-800 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-black mb-4">{selectedProduct.name}</h3>
            <img src={selectedProduct.image} className="w-full h-40 object-contain mb-4" />
            <div className="flex items-center gap-3 mt-auto">
              <div className="flex items-center bg-[#121217] rounded-xl border border-gray-800 p-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 bg-gray-800 rounded-lg">-</button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 bg-gray-800 rounded-lg">+</button>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 rounded-xl border border-gray-800 bg-[#121217]/60 text-xs font-bold uppercase">Cancel</button>
              <button onClick={() => handleAddToCart(selectedProduct, quantity)} className="flex-[1.6] py-3 px-2 rounded-xl bg-purple-600 text-xs font-black uppercase whitespace-nowrap">
                ADD TO CART - {(selectedProduct.price * quantity).toLocaleString()} {selectedProduct.unit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;