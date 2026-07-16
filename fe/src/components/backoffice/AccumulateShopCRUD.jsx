import { useState } from 'react';

const AccumulateShopCRUD = () => {
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Exclusive Golden Cat Condo', points: '1200', description: 'คอนโดแมวทองคำเกรดพรีเมียม ลิมิเต็ดเอดิชัน', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Cosplay Wing for Cats', points: '450', description: 'ปีกคอสเพลย์ขนนกนุ่มนิ่มสำหรับน้องแมว', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Cat Fountain Gold Edition', points: '800', description: 'เครื่องให้น้ำแมวไฟฟ้าเคลือบขอบสีทอง', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Royal Cat Crown', points: '300', description: 'มงกุฎจำลองสำหรับถ่ายภาพแฟนซีของเจ้านาย', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Heated Cat Mat', points: '600', description: 'เบาะรองนอนปรับอุณหภูมิอัจฉริยะ', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 6, name: 'Luxury Scratching Post', points: '950', description: 'เสาลับเล็บพันเชือกมะนิลาอย่างดี แข็งแรงพิเศษ', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 7, name: 'Smart Cat Laser Collar', points: '550', description: 'ปลอกคอปล่อยแสงเลเซอร์จุดแดงให้แมวไล่จับเอง', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 8, name: 'Silver Cat Tag', points: '200', description: 'ป้ายชื่อสลักเลเซอร์วัสดุสแตนเลสแท้', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 9, name: 'Feather Wand Pro', points: '150', description: 'เบ็ดตกแมวขนนกความยาวพิเศษปรับระดับได้', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 10, name: 'Space Capsule Cat Bed', points: '1100', description: 'โดมอะคริลิกใสทรงแคปซูลสำหรับติดตั้งผนัง', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 11, name: 'Catnip Bubble Spray', points: '180', description: 'สเปรย์ฟองสบู่กลิ่นแคทนิปเล่นสนุกไม่เลอะเทอะ', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' }
  ]);

  const [view, setView] = useState('table');
  const [form, setForm] = useState({ id: null, name: '', points: '', description: '', picUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleOpenAdd = () => {
    setForm({ id: null, name: '', points: '', description: '', picUrl: '' });
    setView('add');
  };

  const handleOpenEdit = (item) => {
    setForm({ id: item.id, name: item.name, points: item.points, description: item.description, picUrl: item.image || '' });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('คุณแน่ใจที่จะลบของรางวัลยอดสะสมนี้ใช่หรือไม่?')) {
      setRewards(rewards.filter(r => r.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultPic = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80';
    if (view === 'add') {
      const newReward = {
        id: rewards.length > 0 ? Math.max(...rewards.map(r => r.id)) + 1 : 1,
        name: form.name,
        points: form.points,
        description: form.description,
        image: form.picUrl || defaultPic
      };
      setRewards([...rewards, newReward]);
    } else {
      setRewards(rewards.map(r => r.id === form.id ? { 
        ...r, 
        name: form.name, 
        points: form.points, 
        description: form.description, 
        image: form.picUrl || r.image || defaultPic 
      } : r));
    }
    setView('table');
  };

  const filteredRewards = rewards.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRewards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      {view === 'table' ? (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-purple-300">Accumulate Rewards (Points)</h2>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-64 px-5 py-2 rounded-full bg-[#121216] border border-purple-950/80 focus:outline-none focus:border-purple-500 text-sm text-white placeholder-gray-500 shadow-inner"
              />
              {/* เปลี่ยนเป็นปุ่ม Pill */}
              <button
                onClick={handleOpenAdd}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold transition shrink-0 shadow-lg shadow-blue-600/20"
              >
                + Reward Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-purple-950/60 rounded-lg">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#181125] border-b border-purple-950/60 text-purple-300 font-bold">
                <tr>
                  <th className="p-4 text-center w-16">No.</th>
                  <th className="p-4 text-center w-20">Pic</th>
                  <th className="p-4">Reward Name</th>
                  <th className="p-4">Price (Points)</th>
                  <th className="p-4 text-center w-24">edit</th>
                  <th className="p-4 text-center w-24">delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/20">
                {currentItems.map((r, index) => (
                  <tr key={r.id} className="hover:bg-purple-950/10 transition">
                    <td className="p-4 text-center text-gray-400">
                      {indexOfFirstItem + index + 1}.
                    </td>
                    <td className="p-2 text-center">
                      <img 
                        src={r.image || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80'} 
                        alt={r.name}
                        className="w-12 h-12 object-cover rounded border border-purple-500/50 shadow mx-auto"
                      />
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {r.name} <span className="text-xs text-gray-500 font-normal ml-3">({r.description})</span>
                    </td>
                    <td className="p-4 text-cyan-400 font-bold">{r.points} Points</td>
                    {/* ปุ่มในตารางอัปเกรดเป็น rounded-full (Pill) ทั้งหมด */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-full transition shadow-md shadow-amber-500/10"
                      >
                        edit
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(r.id)}
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
                      ไม่พบข้อมูลของรางวัลที่ต้องการค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ปรับ Pagination เป็น Pill */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-5 px-1">
              <div className="text-xs text-gray-400">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRewards.length)} of {filteredRewards.length} records
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
              :: {view === 'add' ? 'Form Add Reward' : 'Form Update Reward'} ::
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 text-sm pt-4">
            <h2 className="text-md font-bold text-purple-300/80 mb-6 flex items-center">
              <span className="mr-2">::</span> {view === 'add' ? 'Form Add Reward' : 'Form Update Reward'} <span className="ml-2">::</span>
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Reward Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Reward Name"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1 sm:mt-1">Reward detail</label>
              <textarea
                required
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Reward detail"
                className="flex-1 px-4 py-2 rounded-2xl bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Price (Points)</label>
              <input
                type="number"
                required
                value={form.points}
                onChange={(e) => setForm({ ...form, points: e.target.value })}
                placeholder="reward_points"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Pic (URL)</label>
              <input
                type="text"
                value={form.picUrl}
                onChange={(e) => setForm({ ...form, picUrl: e.target.value })}
                placeholder="Paste Reward Image URL"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white text-xs"
              />
            </div>

            {/* ปุ่มส่งฟอร์มเป็น rounded-full (Pill) */}
            <div className="flex items-center space-x-3 pt-4 sm:pl-32">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-md shadow-blue-600/20"
              >
                {view === 'add' ? 'Insert Reward' : 'Update'}
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

export default AccumulateShopCRUD;