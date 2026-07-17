import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { swalUtils } from '../utils/swalUtils';

const Home = () => {
  // --- 1. ข้อมูลรูปภาพสำหรับ Carousel ---
  const carouselImages = [
    "https://placehold.co/1000x300/1e1b4b/a855f7?text=PROMOTION+1",
    "https://placehold.co/1000x300/0f172a/a855f7?text=NEW+ITEMS",
    "https://placehold.co/1000x300/180828/a855f7?text=DISCOUNT+50%",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

  // --- 2. State สำหรับสลับหน้าโหมด (SHOP vs ACCUMULATE) ---
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' หรือ 'accumulate'

  // --- 3. State สำหรับระบบรายละเอียดสินค้า (Popup Modal) ---
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- 4. ข้อมูลสินค้าจำลอง (แบ่งตาม Tab) ---
  const shopProducts = Array.from({ length: 22 }, (_, index) => ({
    id: `shop-${index + 1}`,
    name: index === 0 ? "Premium Phone" : `Shop Product ${index + 1}`,
    price: index === 0 ? 1 : Math.floor(Math.random() * 100) + 10,
    unit: 'Cash',
    image: "https://placehold.co/300x300/121214/a855f7?text=Shop+Item",
    description: `นี่คือรายละเอียดของ ${index === 0 ? "Premium Phone" : `Shop Product ${index + 1}`} สินค้าพรีเมียมคุณภาพสูงที่ได้รับการคัดสรรมาเป็นพิเศษเพื่อคุณในราคาประหยัดและคุ้มค่าที่สุด`,
  }));

  const accumulateProducts = Array.from({ length: 10 }, (_, index) => ({
    id: `acc-${index + 1}`,
    name: `Accumulate Reward ${index + 1}`,
    price: (index + 1) * 250,
    unit: 'Point',
    image: "https://placehold.co/300x300/180828/3b82f6?text=Reward+Item",
    description: `นี่คือรายละเอียดของ Reward ${index + 1} สำหรับผู้ใช้งานที่มีแต้มสะสม Point ตามที่ระบุไว้ สามารถแลกรับของรางวัลพิเศษชิ้นนี้ได้ทันทีโดยไม่มีค่าใช้จ่ายเพิ่มเติม`,
  }));

  const currentList = activeTab === 'shop' ? shopProducts : accumulateProducts;

  // --- 5. ระบบควบคุมการแบ่งหน้า (Pagination) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  const totalPages = Math.ceil(currentList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = currentList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // --- ฟังก์ชันสำหรับการคลิกซื้อของแบบพรีเมียม ---
  const handleBuy = async (product) => {
    // ปิดหน้าต่าง Popup รายละเอียดสินค้าก่อน เพื่อไม่ให้ UI ซ้อนทับกัน
    setSelectedProduct(null);

    const isPoint = product.unit.toLowerCase().startsWith('point');

    // แสดงกล่องแจ้งเตือนยืนยันการทำรายการตามประเภทสกุลเงิน
    const result = await swalUtils.confirm({
      title: isPoint ? 'ยืนยันการแลกรับของรางวัล?' : 'ยืนยันการสั่งซื้อสินค้า?',
      text: isPoint
        ? `คุณต้องการใช้แต้มสะสมแลกรางวัล "${product.name}" จำนวน ${product.price.toLocaleString()} ${product.unit} ใช่หรือไม่?`
        : `คุณกำลังจะซื้อสินค้า "${product.name}" ในราคา ${product.price.toLocaleString()} ${product.unit}`,
      confirmButtonText: isPoint ? 'ยืนยันแลกของรางวัล' : 'ยืนยันการซื้อ',
      cancelButtonText: 'ยกเลิก',
    });

    // หากกดยืนยันสำเร็จ
    if (result.isConfirmed) {
      swalUtils.success(
        isPoint ? 'แลกของรางวัลสำเร็จ!' : 'สั่งซื้อสินค้าสำเร็จ!',
        isPoint
          ? `ได้ทำการแลกรับ "${product.name}" เรียบร้อยแล้ว (ใช้แต้มสะสมไป ${product.price.toLocaleString()} ${product.unit})`
          : `คุณได้ซื้อสินค้า "${product.name}" เรียบร้อยแล้ว (หักเงิน ${product.price.toLocaleString()} ${product.unit})`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full relative">
      {/* ส่วนหัวของเว็บ */}
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* ================= CAROUSEL SECTION ================= */}
        <div className="relative w-full max-w-[1000px] h-[300px] overflow-hidden rounded-xl border border-purple-900/30 shadow-lg shadow-purple-950/20 mb-8">
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full object-cover shrink-0"
              />
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-purple-500 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= TAB SWITCHER SECTION (SHOP & ACCUMULATE) ================= */}
        <div className="w-full max-w-[1000px] mb-8 flex justify-center">
          <div className="relative p-1.5 bg-[#08080a] border border-purple-950/60 rounded-full flex gap-1 shadow-inner shadow-black">
            
            <button
              onClick={() => setActiveTab('shop')}
              className={`relative px-8 py-2 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'shop'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              SHOP
            </button>

            <button
              onClick={() => setActiveTab('accumulate')}
              className={`relative px-8 py-2 text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'accumulate'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ACCUMULATE
            </button>
          </div>
        </div>

        {/* ================= PRODUCTS SECTION ================= */}
        <div className="w-full max-w-[1000px]">
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-2 rounded-lg border transition-all duration-300 ${
              activeTab === 'shop' 
                ? 'bg-purple-600/20 border-purple-500/30 text-purple-400' 
                : 'bg-blue-600/20 border-blue-500/30 text-blue-400'
            }`}>
              {activeTab === 'shop' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4l1-3H7l1 3h4z" />
                </svg>
              )}
            </div>
            <div className="text-left">
              <h2 className={`text-lg font-bold tracking-wider transition-all duration-300 ${
                activeTab === 'shop' ? 'text-purple-300' : 'text-blue-300'
              }`}>
                {activeTab === 'shop' ? 'HIGHLIGHT PRODUCTS' : 'ACCUMULATE REWARDS'}
              </h2>
              <p className="text-xs text-gray-400">
                {activeTab === 'shop' ? 'สินค้าแนะนำ' : 'รายการของรางวัลสำหรับคะแนนสะสม'}
              </p>
            </div>
          </div>

          {/* ตารางแสดงผลสินค้า */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)} // คลิกที่ไอเท็มเพื่อเปิด Popup รายละเอียด
                className={`bg-[#0b0b0d] border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  activeTab === 'shop'
                    ? 'border-purple-950/40 hover:border-purple-500/50 hover:shadow-purple-950/20'
                    : 'border-blue-950/40 hover:border-blue-500/50 hover:shadow-blue-950/20'
                }`}
              >
                <div className="aspect-square w-full bg-[#14141a] relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover p-3 hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className={`p-3 flex justify-between items-center text-xs border-t ${
                  activeTab === 'shop' 
                    ? 'bg-[#181125] border-purple-950/40' 
                    : 'bg-[#0f1424] border-blue-950/40'
                }`}>
                  <span className="font-semibold text-gray-200 truncate pr-2">{product.name}</span>
                  <span className={`font-bold shrink-0 ${
                    activeTab === 'shop' ? 'text-purple-400' : 'text-blue-400'
                  }`}>
                    {product.price.toLocaleString()} {product.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ปุ่มควบคุมหน้า (Pagination) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded bg-[#14141a] border text-sm disabled:opacity-50 transition-all duration-200 ${
                  activeTab === 'shop' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
                }`}
              >
                ย้อนกลับ
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded text-sm font-bold transition-all duration-200 ${
                    currentPage === i + 1 
                      ? activeTab === 'shop'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50' 
                        : 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                      : `bg-[#14141a] text-gray-400 border ${
                          activeTab === 'shop' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
                        }`
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded bg-[#14141a] border text-sm disabled:opacity-50 transition-all duration-200 ${
                  activeTab === 'shop' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
                }`}
              >
                ถัดไป
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ================= ITEM DETAIL POPUP (MODAL) ================= */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          {/* ตัวกล่องเนื้อหาของ Popup สไตล์ Neon Cyber-Glass */}
          <div 
            className={`relative w-full max-w-[460px] bg-[#0c0c11]/90 border rounded-2xl p-6 flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 ${
              selectedProduct.unit === 'Cash' 
                ? 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
                : 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* --- ส่วนหัว (Header) --- */}
            <div className="flex justify-between items-start mb-5">
              <div className="text-left">
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${
                  selectedProduct.unit === 'Cash' ? 'text-purple-400' : 'text-cyan-400'
                }`}>
                  ✦ ITEM SPECIFICATION
                </span>
                <h3 className="text-xl font-black text-white tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                  {selectedProduct.name}
                </h3>
              </div>

              {/* ปุ่มปิดสีแดงนีออนกลมกลืนในกรอบ */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-7 h-7 rounded-full bg-red-950/40 hover:bg-red-600/90 border border-red-500/40 hover:border-red-400 flex items-center justify-center text-red-400 hover:text-white font-bold text-xs shadow-md transition-all duration-300 hover:scale-110"
                title="ปิด"
              >
                ✕
              </button>
            </div>

            {/* --- รูปภาพสินค้าสุดพรีเมียม --- */}
            <div className={`relative w-full h-52 rounded-xl border mb-5 p-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#14141d]/80 to-[#09090d]/90 ${
              selectedProduct.unit === 'Cash' ? 'border-purple-950/50' : 'border-cyan-950/50'
            }`}>
              {/* เอฟเฟกต์แสงเรืองเบื้องหลังภาพ */}
              <div className={`absolute w-32 h-32 rounded-full filter blur-[50px] opacity-20 ${
                selectedProduct.unit === 'Cash' ? 'bg-purple-600' : 'bg-cyan-500'
              }`}></div>
              
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* --- กรอบรายละเอียดแนว Tech-Info ชิดซ้าย --- */}
            <div className={`w-full rounded-xl p-4 mb-6 border bg-[#060609]/80 text-left ${
              selectedProduct.unit === 'Cash' 
                ? 'border-purple-950/60 shadow-[inset_0_2px_10px_rgba(168,85,247,0.05)]' 
                : 'border-cyan-950/60 shadow-[inset_0_2px_10px_rgba(6,182,212,0.05)]'
            }`}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  selectedProduct.unit === 'Cash' ? 'bg-purple-500' : 'bg-cyan-400'
                }`}></span>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  ข้อมูลผลิตภัณฑ์
                </h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                {selectedProduct.description || "ไม่มีข้อมูลรายละเอียดเพิ่มเติมสำหรับสินค้าชิ้นนี้"}
              </p>
            </div>

            {/* --- ปุ่มล่างดีไซน์เฉียบคม (ยกเลิก / ซื้อสินค้าพร้อมราคา) --- */}
            <div className="flex w-full gap-3 mt-auto">
              {/* ปุ่มยกเลิก */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 py-3 rounded-xl border border-gray-800 bg-[#121217]/60 hover:bg-gray-800/80 text-gray-400 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-200"
              >
                Cancel
              </button>
              
              {/* ปุ่มซื้อพร้อมสีไฟนีออนตามสกุลเงิน */}
              <button
                onClick={() => handleBuy(selectedProduct)}
                className={`flex-[1.6] py-3 px-5 rounded-xl text-white text-xs font-black tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-1.5 shadow-lg active:scale-95 ${
                  selectedProduct.unit === 'Cash'
                    ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/40 hover:shadow-purple-500/50 border border-purple-400/30'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/30 hover:shadow-cyan-500/50 border border-cyan-400/30'
                }`}
              >
                <span>Purchase -</span>
                <span className="underline decoration-1 underline-offset-4">
                  {selectedProduct.price.toLocaleString()} {selectedProduct.unit}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;