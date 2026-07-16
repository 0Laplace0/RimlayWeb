import { useState } from 'react';

const ShopCRUD = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Salmon Cat Food', price: '450', description: 'อาหารแมวแซลมอนสูตรพรีเมียม', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Wireless Cat Toy Ball', price: '290', description: 'ลูกบอลของเล่นแมวไร้สายอัจฉริยะ', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Tuna Jelly Treat', price: '120', description: 'ขนมแมวเลียรสทูน่าเจลลี่รสชาติเข้มข้น', image: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Soft Velvet Collar', price: '180', description: 'ปลอกคอผ้ากำมะหยี่นุ่มๆ พร้อมกระดิ่ง', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Cat Fountain Waterer', price: '690', description: 'น้ำพุแมวอัจฉริยะกรองน้ำระบบ 3 ชั้น', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 6, name: 'Cardboard Cat Scratcher', price: '150', description: 'ที่ฝนเล็บแมวกระดาษลูกฟูกทรงคลื่น', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 7, name: 'Organic Catnip Grass', price: '99', description: 'ต้นอ่อนข้าวสาลีออร์แกนิกชุดปลูกเอง', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 8, name: 'Warm Sleeping Bed', price: '520', description: 'ที่นอนโดมแมวบุขนแกะนุ่มอบอุ่น', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 9, name: 'Portable Cat Carrier Bag', price: '890', description: 'กระเป๋าเป้อวกาศสะพายหลังพาน้องเที่ยว', image: 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?auto=format&fit=crop&w=150&q=80' },
    { id: 10, name: 'Automatic Cat Feeder', price: '1590', description: 'เครื่องให้อาหารอัตโนมัติตั้งเวลาผ่านแอป', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 11, name: 'Laser Pointer Toy', price: '120', description: 'ปากกาเลเซอร์สีแดงขนาดพกพาแถมถ่าน', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' }
  ]);

  const [view, setView] = useState('table');
  const [form, setForm] = useState({ id: null, name: '', price: '', description: '', picUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenAdd = () => {
    setForm({ id: null, name: '', price: '', description: '', picUrl: '' });
    setView('add');
  };

  const handleOpenEdit = (item) => {
    setForm({ id: item.id, name: item.name, price: item.price, description: item.description, picUrl: item.image || '' });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจที่จะลบสินค้านี้ใช่หรือไม่?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultPic = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80';
    if (view === 'add') {
      const newItem = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: form.name,
        price: form.price,
        description: form.description,
        image: form.picUrl || defaultPic
      };
      setProducts([...products, newItem]);
    } else {
      setProducts(products.map(p => p.id === form.id ? { 
        ...p, 
        name: form.name, 
        price: form.price, 
        description: form.description, 
        image: form.picUrl || p.image || defaultPic 
      } : p));
    }
    setView('table');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      {view === 'table' ? (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-purple-300">Shop Products (Cash)</h2>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-64 px-5 py-2 rounded-full bg-[#121216] border border-purple-950/80 focus:outline-none focus:border-purple-500 text-sm text-white placeholder-gray-500 shadow-inner"
              />
              {/* เปลี่ยนเป็นปุ่ม Pill ทรงเรียวโค้งมน */}
              <button
                onClick={handleOpenAdd}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold transition shrink-0 shadow-lg shadow-blue-600/20"
              >
                + Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-purple-950/60 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#181125] border-b border-purple-950/60 text-purple-300 font-bold">
                <tr>
                  <th className="p-4 text-center w-16">No.</th>
                  <th className="p-4 text-center w-20">Pic</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Price (Cash)</th>
                  <th className="p-4 text-center w-24">edit</th>
                  <th className="p-4 text-center w-24">delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/20">
                {currentItems.map((p, index) => (
                  <tr key={p.id} className="hover:bg-purple-950/10 transition">
                    <td className="p-4 text-center text-gray-400">
                      {indexOfFirstItem + index + 1}.
                    </td>
                    <td className="p-2 text-center">
                      <img 
                        src={p.image || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80'} 
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded border border-purple-500/50 shadow mx-auto"
                      />
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {p.name} <span className="text-xs text-gray-500 font-normal ml-3">({p.description})</span>
                    </td>
                    <td className="p-4 text-emerald-400 font-bold">{p.price} Cash</td>
                    {/* อัปเดตปุ่มในตารางเป็น rounded-full (Pill) */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-full transition shadow-md shadow-amber-500/10"
                      >
                        edit
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-full transition shadow-md shadow-rose-600/10"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">
                      ไม่พบข้อมูลสินค้าที่ต้องการค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ปรับ Pagination ให้เป็น Pill */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-5 px-1">
              <div className="text-xs text-gray-400">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} records
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-1.5 bg-[#121216] border border-purple-950/60 rounded-full text-xs font-bold text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-950/20 transition"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-[#121216] border border-purple-950/60 text-gray-400 hover:text-purple-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-1.5 bg-[#121216] border border-purple-950/60 rounded-full text-xs font-bold text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-950/20 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#181125] border border-purple-950/60 py-4 px-6 rounded-lg text-center shadow-lg">
            <h1 className="text-lg font-bold text-purple-300 tracking-wide">
              :: {view === 'add' ? 'Form Add Product' : 'Form Update Product'} ::
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 text-sm pt-4">
            <h2 className="text-md font-bold text-purple-300/80 mb-6 flex items-center">
              <span className="mr-2">::</span> {view === 'add' ? 'Form Add Product' : 'Form Update Product'} <span className="ml-2">::</span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Product Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product Name"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1 sm:mt-1">Product Detail</label>
              <textarea
                required
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Product description and details"
                className="flex-1 px-4 py-2 rounded-2xl bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Product Price</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Product price"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Pic (URL)</label>
              <input
                type="text"
                value={form.picUrl}
                onChange={(e) => setForm({ ...form, picUrl: e.target.value })}
                placeholder="Paste Product Image URL here"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white text-xs"
              />
            </div>

            {/* ปุ่มส่งฟอร์มเป็น rounded-full (Pill) */}
            <div className="flex items-center space-x-3 pt-4 sm:pl-32">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-md shadow-blue-600/20"
              >
                {view === 'add' ? 'Insert Product' : 'Update'}
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                className="px-8 py-2.5 rounded-full font-bold text-white bg-rose-600 hover:bg-rose-500 transition duration-300 shadow-md shadow-rose-600/20"
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ShopCRUD;