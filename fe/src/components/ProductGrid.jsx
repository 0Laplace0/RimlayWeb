import { useState, useEffect } from 'react';

const ProductGrid = ({ products, title, subtitle, cols = 4, rows = 4, priceUnit = "Cash" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = cols * rows;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // คลาสสำหรับคุมจำนวนคอลัมน์แบบ Dynamic
  const colClasses = {
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4"
  };

  return (
    <div className="w-full">
      {/* หัวข้อรายการสินค้า */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-600/20 p-2 rounded-lg border border-purple-500/30">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="text-left">
          <h2 className="text-lg font-bold tracking-wider text-purple-300 uppercase">{title}</h2>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* ตารางสินค้า */}
      <div className={`grid ${colClasses[cols] || colClasses[4]} gap-5`}>
        {currentProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-[#0b0b0d] border border-purple-950/40 rounded-lg overflow-hidden flex flex-col hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/20 transition-all duration-300"
          >
            <div className="aspect-square w-full bg-[#14141a] relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover p-3 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-[#181125] p-3 flex justify-between items-center text-xs border-t border-purple-950/40">
              <span className="font-semibold text-gray-200 truncate pr-2">{product.name}</span>
              <span className="text-purple-400 font-bold shrink-0">{product.price} {priceUnit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มเปลี่ยนหน้า (Pagination) */}
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
  );
};

export default ProductGrid;