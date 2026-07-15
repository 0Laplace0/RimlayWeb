import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  // --- 1. ข้อมูลรูปภาพสำหรับ Carousel ($1000 \times 300$) ---
  const carouselImages = [
    "https://placehold.co/1000x300/1e1b4b/a855f7?text=PROMOTION+1",
    "https://placehold.co/1000x300/0f172a/a855f7?text=NEW+ITEMS",
    "https://placehold.co/1000x300/180828/a855f7?text=DISCOUNT+50%",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // สั่งให้ Carousel สไลด์เปลี่ยนรูปอัตโนมัติทุกๆ 4 วินาที
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

  // --- 2. ข้อมูลสินค้าจำลอง (Mock Products) ---
  // สมมติมีสินค้า 20 ชิ้น เพื่อทดสอบระบบเปลี่ยนหน้า (Pagination)
  const allProducts = Array.from({ length: 22 }, (_, index) => ({
    id: index + 1,
    name: index === 0 ? "phone" : `Product Item ${index + 1}`,
    price: index === 0 ? 1 : Math.floor(Math.random() * 100) + 10,
    image: "https://placehold.co/300x300/121214/a855f7?text=Test", // รูปสินค้าจำลองสีม่วงดำ
  }));

  // --- 3. ระบบควบคุมการแบ่งหน้า (Pagination) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // แถวละ 4 ชิ้น, แสดงสูงสุด 4 แถว = 16 ชิ้นต่อหน้า

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // ตัดแบ่งสินค้าแสดงผลเฉพาะในหน้านั้นๆ
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      {/* ส่วนหัวของเว็บ */}
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        
        {/* ================= CAROUSEL SECTION ================= */}
        <div className="relative w-full max-w-[1000px] h-[300px] overflow-hidden rounded-xl border border-purple-900/30 shadow-lg shadow-purple-950/20 mb-8">
          {/* แผ่นภาพสไลด์ */}
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

          {/* จุดเปลี่ยนหน้าสไลด์ (Dots Navigation) */}
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


        {/* ================= PRODUCTS SECTION ================= */}
        <div className="w-full max-w-[1000px]">
          {/* หัวข้อสินค้าแนะนำ */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-600/20 p-2 rounded-lg border border-purple-500/30">
              {/* ไอคอนกล่อง 3 มิติ */}
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-lg font-bold tracking-wider text-purple-300">HIGHLIGHT PRODUCTS</h2>
              <p className="text-xs text-gray-400">สินค้าแนะนำ</p>
            </div>
          </div>

          {/* ตารางแสดงผลสินค้า (4 คอลัมน์) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-[#0b0b0d] border border-purple-950/40 rounded-lg overflow-hidden flex flex-col hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/20 transition-all duration-300"
              >
                {/* รูปภาพสินค้า */}
                <div className="aspect-square w-full bg-[#14141a] relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover p-3 hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* รายละเอียดสินค้าด้านล่าง */}
                <div className="bg-[#181125] p-3 flex justify-between items-center text-xs border-t border-purple-950/40">
                  <span className="font-semibold text-gray-200 truncate pr-2">{product.name}</span>
                  <span className="text-purple-400 font-bold shrink-0">{product.price} Cash</span>
                </div>
              </div>
            ))}
          </div>

          {/* ปุ่มควบคุมหน้า (Pagination Navigation) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-[#14141a] border border-purple-950/40 text-sm hover:border-purple-500 disabled:opacity-50 transition-all duration-200"
              >
                ย้อนกลับ
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded text-sm font-bold transition-all duration-200 ${
                    currentPage === i + 1 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50' 
                      : 'bg-[#14141a] border border-purple-950/40 text-gray-400 hover:border-purple-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-[#14141a] border border-purple-950/40 text-sm hover:border-purple-500 disabled:opacity-50 transition-all duration-200"
              >
                ถัดไป
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;