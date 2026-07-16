import { useState, useEffect } from 'react';

const ProductGrid = ({ products, title, subtitle, cols = 4, rows = 4, priceUnit = 'Cash', onItemClick }) => {
  const itemsPerPage = cols * rows;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-5',
  }[cols] || 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="w-full">
      {/* --- Header --- */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg border transition-all duration-300 ${
          priceUnit === 'Cash' ? 'bg-purple-600/20 border-purple-500/30 text-purple-400' : 'bg-blue-600/20 border-blue-500/30 text-blue-400'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="text-left">
          <h2 className={`text-lg font-bold tracking-wider transition-all duration-300 ${
            priceUnit === 'Cash' ? 'text-purple-300' : 'text-blue-300'
          }`}>
            {title}
          </h2>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      {/* --- Grid Items --- */}
      <div className={`grid ${gridColsClass} gap-5`}>
        {currentProducts.map((product) => (
          <div 
            key={product.id}
            onClick={() => onItemClick && onItemClick(product)} // เมื่อถูกคลิกจะส่งค่าตัวแปรกลับไปที่หน้าหลัก
            className={`bg-[#0b0b0d] border rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer ${
              priceUnit === 'Cash'
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
              priceUnit === 'Cash' ? 'bg-[#181125] border-purple-950/40' : 'bg-[#0f1424] border-blue-950/40'
            }`}>
              <span className="font-semibold text-gray-200 truncate pr-2">{product.name}</span>
              <span className={`font-bold shrink-0 ${
                priceUnit === 'Cash' ? 'text-purple-400' : 'text-blue-400'
              }`}>
                {product.price.toLocaleString()} {priceUnit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded bg-[#14141a] border text-sm disabled:opacity-50 transition-all duration-200 ${
              priceUnit === 'Cash' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
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
                  ? priceUnit === 'Cash' ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50' : 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                  : `bg-[#14141a] text-gray-400 border ${
                      priceUnit === 'Cash' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
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
              priceUnit === 'Cash' ? 'border-purple-950/40 hover:border-purple-500' : 'border-blue-950/40 hover:border-blue-500'
            }`}
          >
            ถัดไป
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;