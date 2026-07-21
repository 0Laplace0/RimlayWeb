import { useState } from 'react';
import { swalUtils } from '../../utils/swalUtils.js';

const AccumulateShopCRUD = () => {
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Exclusive Golden Cat Condo', category: 'Furniture', points: 1200, description: 'คอนโดแมวทองคำเกรดพรีเมียม ลิมิเต็ดเอดิชัน', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Cosplay Wing for Cats', category: 'Costume', points: 450, description: 'ปีกคอสเพลย์ขนนกนุ่มนิ่มสำหรับน้องแมว', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Cat Fountain Gold Edition', category: 'Gadget', points: 800, description: 'เครื่องให้น้ำแมวไฟฟ้าเคลือบขอบสีทอง', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Royal Cat Crown', category: 'Costume', points: 300, description: 'มงกุฎจำลองสำหรับถ่ายภาพแฟนซีของเจ้านาย', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Heated Cat Mat', category: 'Furniture', points: 600, description: 'เบาะรองนอนปรับอุณหภูมิอัจฉริยะ', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 6, name: 'Luxury Scratching Post', category: 'Furniture', points: 950, description: 'เสาลับเล็บพันเชือกมะนิลาอย่างดี แข็งแรงพิเศษ', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 7, name: 'Smart Cat Laser Collar', category: 'Accessory', points: 550, description: 'ปลอกคอปล่อยแสงเลเซอร์จุดแดงให้แมวไล่จับเอง', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' },
    { id: 8, name: 'Silver Cat Tag', category: 'Accessory', points: 200, description: 'ป้ายชื่อสลักเลเซอร์วัสดุสแตนเลสแท้', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=150&q=80' },
    { id: 9, name: 'Feather Wand Pro', category: 'Toy', points: 150, description: 'เบ็ดตกแมวขนนกความยาวพิเศษปรับระดับได้', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=150&q=80' },
    { id: 10, name: 'Space Capsule Cat Bed', category: 'Furniture', points: 1100, description: 'โดมอะคริลิกใสทรงแคปซูลสำหรับติดตั้งผนัง', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80' },
    { id: 11, name: 'Catnip Bubble Spray', category: 'Toy', points: 180, description: 'สเปรย์ฟองสบู่กลิ่นแคทนิปเล่นสนุกไม่เลอะเทอะ', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80' }
  ]);

  const [view, setView] = useState('table');
  const [form, setForm] = useState({ id: null, name: '', category: '', points: '', description: '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const defaultPic = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80';

  const handleOpenAdd = () => {
    setForm({ id: null, name: '', category: '', points: '', description: '', image: '' });
    setView('add');
  };

  const handleOpenEdit = (item) => {
    setForm({ id: item.id, name: item.name, category: item.category || '', points: item.points, description: item.description, image: item.image || '' });
    setView('edit');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      swalUtils.error('เลือกไฟล์ไม่สำเร็จ!', 'กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้นครับ');
      e.target.value = '';
      return;
    }

    const limitSize = 2 * 1024 * 1024;
    if (file.size > limitSize) {
      swalUtils.error('ไฟล์มีขนาดใหญ่เกินไป!', 'กรุณาเลือกภาพที่มีขนาดไม่เกิน 2MB ครับ');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setForm(prev => ({ ...prev, image: '' }));
  };

  const handleDelete = async (id) => {
    const result = await swalUtils.confirm({
      title: 'ต้องการลบของรางวัลใช่หรือไม่?',
      text: 'เมื่อยืนยันแล้ว ข้อมูลของรางวัลชิ้นนี้จะถูกลบออกจากระบบทันที',
      confirmButtonText: 'ยืนยันการลบข้อมูล',
      cancelButtonText: 'ยกเลิก',
      isDangerous: true
    });

    if (result.isConfirmed) {
      const updatedRewards = rewards.filter(r => r.id !== id);
      setRewards(updatedRewards);
      
      const totalPagesAfterDelete = Math.ceil(updatedRewards.length / itemsPerPage);
      if (currentPage > totalPagesAfterDelete && totalPagesAfterDelete > 0) {
        setCurrentPage(totalPagesAfterDelete);
      }
      swalUtils.success('ลบข้อมูลสำเร็จ!', 'ได้ทำการลบรายการของรางวัลเรียบร้อยแล้ว');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const pointsValue = Math.floor(Number(form.points));
    if (isNaN(pointsValue) || pointsValue < 0) {
      swalUtils.error('แต้มคะแนนไม่ถูกต้อง!', 'จำนวนแต้มต้องเป็นตัวเลขและมีค่าตั้งแต่ 0 ขึ้นไปครับ');
      return;
    }

    const isEditMode = view === 'edit';
    const titleText = isEditMode ? 'ตรวจสอบการแก้ไขของรางวัล' : 'ตรวจสอบข้อมูลของรางวัลใหม่';
    const confirmBtnText = isEditMode ? 'ยืนยันอัปเดต' : 'ยืนยันบันทึก';
    const finalImage = form.image || defaultPic;

    const isConfirmed = await swalUtils.previewConfirm({
      actionTitle: titleText,
      image: finalImage,
      confirmText: confirmBtnText,
      cancelText: 'กลับไปแก้ไข',
      fields: [
        { label: 'ของรางวัล', value: form.name.trim() },
        { label: 'ประเภท (Category)', value: form.category.trim() },
        { label: 'รายละเอียด', value: form.description.trim() },
        { label: 'ราคาแต้ม', value: `${pointsValue.toLocaleString()} Points`, isSpecial: true }
      ]
    });

    if (isConfirmed) {
      if (view === 'add') {
        const newReward = {
          id: rewards.length > 0 ? Math.max(...rewards.map(r => r.id)) + 1 : 1,
          name: form.name.trim(),
          category: form.category.trim(),
          points: pointsValue,
          description: form.description.trim(),
          image: finalImage
        };
        setRewards([...rewards, newReward]);
        swalUtils.success('เพิ่มสำเร็จ!', `เพิ่มของรางวัล ${newReward.name} เรียบร้อยแล้ว`);
      } else {
        setRewards(rewards.map(r => r.id === form.id ? { 
          ...r, 
          name: form.name.trim(), 
          category: form.category.trim(),
          points: pointsValue, 
          description: form.description.trim(), 
          image: finalImage
        } : r));
        swalUtils.success('อัปเดตสำเร็จ!', `อัปเดตของรางวัล ${form.name} เรียบร้อยแล้ว`);
      }
      setView('table');
      setCurrentPage(1);
    }
  };

  const filteredRewards = rewards.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRewards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-6 text-white">
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
              <button
                onClick={handleOpenAdd}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold transition shrink-0 shadow-lg shadow-blue-600/20 cursor-pointer"
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
                  <th className="p-4">Category</th>
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
                        src={r.image || defaultPic} 
                        alt={r.name}
                        className="w-12 h-12 object-cover rounded border border-purple-500/50 shadow mx-auto"
                        onError={(e) => { e.target.src = defaultPic; }}
                      />
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {r.name} <span className="text-xs text-gray-500 font-normal ml-3">({r.description})</span>
                    </td>
                    <td className="p-4 text-purple-200">
                      <span className="px-2 py-1 bg-purple-900/40 rounded-md text-xs">{r.category}</span>
                    </td>
                    <td className="p-4 text-cyan-400 font-bold">{r.points.toLocaleString()} Points</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-full transition shadow-md shadow-amber-500/10 cursor-pointer"
                      >
                        edit
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-full transition shadow-md shadow-rose-600/10 cursor-pointer"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-gray-500">
                      ไม่พบข้อมูลของรางวัลที่ต้องการค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-5 px-1">
              <div className="text-xs text-gray-400">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRewards.length)} of {filteredRewards.length} records
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-1.5 bg-[#121216] border border-purple-950/60 rounded-full text-xs font-bold text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-950/20 transition cursor-pointer"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
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
                  className="px-4 py-1.5 bg-[#121216] border border-purple-950/60 rounded-full text-xs font-bold text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-950/20 transition cursor-pointer"
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

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Category</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Furniture, Toy, Costume"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1 sm:mt-1">Reward Detail</label>
              <textarea
                required
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Reward description and details"
                className="flex-1 px-4 py-2 rounded-2xl bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Reward Points</label>
              <input
                type="number"
                required
                min="0"
                onKeyDown={handleKeyDown}
                value={form.points}
                onChange={(e) => setForm({ ...form, points: e.target.value })}
                placeholder="Required points"
                className="flex-1 px-4 py-2 rounded-full bg-[#121216] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1 sm:mt-2">Reward Pic</label>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-purple-950/60 rounded-2xl cursor-pointer bg-[#121216] hover:bg-purple-950/10 hover:border-purple-500/50 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-purple-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="text-xs text-gray-400">
                        <span className="font-semibold text-purple-300">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
                {form.image && (
                  <div className="flex items-center gap-3 bg-[#181125]/40 p-2 rounded-xl border border-purple-950/40">
                    <img 
                      src={form.image} 
                      alt="Preview" 
                      className="w-12 h-12 object-cover rounded-lg border border-purple-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-purple-300 truncate">Image Selected</p>
                      <button 
                        type="button" 
                        onClick={handleClearImage}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4 sm:pl-32">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-md shadow-blue-600/20 cursor-pointer"
              >
                {view === 'add' ? 'Insert Reward' : 'Update'}
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                className="px-8 py-2.5 rounded-full font-bold text-white bg-rose-600 hover:bg-rose-500 transition duration-300 shadow-md shadow-rose-600/20 cursor-pointer"
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