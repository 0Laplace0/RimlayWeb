import { useState, useEffect, useRef } from 'react';
import { swalUtils } from '../../utils/swalUtils.js';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Component ย่อยสำหรับการแสดงผลแต่ละภาพที่ลากได้
const SortableImage = ({ img, index, handleEdit, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: img.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-[#0e0e12] border border-purple-950/40 rounded-xl overflow-hidden flex items-center gap-4 p-3 mb-3">
      {/* ส่วนมือจับสำหรับลาก */}
      <div {...attributes} {...listeners} className="cursor-grab text-gray-600 hover:text-purple-500 p-2">
        ⠿
      </div>
      
      <div className="w-32 h-16 bg-black rounded-lg overflow-hidden shrink-0">
        <img src={img.url} alt="Slide" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <span className="text-xs font-bold text-gray-300">IMAGE #{index + 1}</span>
      </div>

      <div className="flex gap-2 mr-2">
        <button onClick={() => handleEdit(img)} className="text-purple-400 text-[10px] font-bold px-4 py-1.5 bg-purple-950/30 rounded-full border border-purple-500/20 hover:bg-purple-600 hover:text-white transition-all">แก้ไข</button>
        <button onClick={() => handleDelete(img.id)} className="text-red-400 text-[10px] font-bold px-4 py-1.5 bg-red-950/30 rounded-full border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">ลบ</button>
      </div>
    </div>
  );
};

const CarouselCRUD = () => {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedCarousels = localStorage.getItem('carousel_images');
    if (savedCarousels) setImages(JSON.parse(savedCarousels));
  }, []);

  const saveToStorage = (updatedImages) => {
    setImages(updatedImages);
    localStorage.setItem('carousel_images', JSON.stringify(updatedImages));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      swalUtils.error('ไฟล์มีขนาดใหญ่เกินไป! กรุณาเลือกไฟล์ที่ไม่เกิน 10 MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      if (editingId) {
        const updated = images.map((img) => img.id === editingId ? { ...img, url: base64String } : img);
        saveToStorage(updated);
        setEditingId(null);
      } else {
        saveToStorage([...images, { id: `c-${Date.now()}`, url: base64String }]);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((i) => i.id === active.id);
      const newIndex = images.findIndex((i) => i.id === over.id);
      saveToStorage(arrayMove(images, oldIndex, newIndex));
    }
  };

  const handleEdit = (img) => {
    setEditingId(img.id);
    swalUtils.info('กรุณาเลือกไฟล์ภาพใหม่เพื่อแทนที่ภาพเดิม');
  };

  const handleDelete = async (id) => {
    const result = await swalUtils.confirm({ 
        title: 'ต้องการลบภาพนี้?', 
        text: 'การลบจะไม่สามารถกู้คืนภาพนี้กลับมาได้',
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
        isDangerous: true 
    });
    
    if (result.isConfirmed) {
      saveToStorage(images.filter((img) => img.id !== id));
      swalUtils.success('ลบรูปภาพสไลด์เรียบร้อยแล้ว!');
    }
  };

  return (
    <div className="text-left w-full">
      <div className="border-b border-purple-950/60 pb-4 mb-6">
        <h2 className="text-xl font-bold text-purple-300">CAROUSEL MANAGER</h2>
      </div>

      <div className="mb-8 p-5 bg-[#08080a] border border-purple-950/60 rounded-xl">
        <h3 className="text-xs font-bold text-purple-400 mb-4">{editingId ? '✦ REPLACE IMAGE' : '✦ UPLOAD NEW IMAGE'}</h3>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 px-8 rounded-full shadow-lg shadow-purple-900/20 transition-all"
        >
          {editingId ? 'เลือกไฟล์ใหม่' : 'เลือกไฟล์เพื่ออัปโหลด'}
        </button>
      </div>

      <div className="w-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images} strategy={verticalListSortingStrategy}>
            {images.map((img, index) => (
              <SortableImage key={img.id} img={img} index={index} handleEdit={handleEdit} handleDelete={handleDelete} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default CarouselCRUD;