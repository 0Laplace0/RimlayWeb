import React, { useState, useEffect } from 'react';

const ItemDetailModal = ({ isOpen, onClose, product, priceUnit = 'Cash', onBuy }) => {
  const [quantity, setQuantity] = useState(1);

  // Reset จำนวนกลับเป็น 1 ทุกครั้งที่เปิด Modal ใหม่ หรือเปลี่ยนสินค้า
  useEffect(() => {
    setQuantity(1);
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose} // คลิกพื้นที่ด้านนอกเพื่อปิด Popup
    >
      {/* ตัวกล่องเนื้อหาของ Popup สไตล์ Neon Cyber-Glass */}
      <div 
        className={`relative w-full max-w-[480px] bg-[#0c0c11]/90 border rounded-2xl p-6 flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 ${
          priceUnit === 'Cash' 
            ? 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]' 
            : 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
        }`}
        onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้คลิกด้านในกล่องแล้วป๊อปอัพปิดตัวลง
      >
        
        {/* --- ส่วนหัว (Header) --- */}
        <div className="flex justify-between items-start mb-5">
          <div className="text-left">
            <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${
              priceUnit === 'Cash' ? 'text-purple-400' : 'text-cyan-400'
            }`}>
              ✦ ITEM SPECIFICATION
            </span>
            <h3 className="text-xl font-black text-white tracking-wide">
              {product.name}
            </h3>
          </div>

          {/* ปุ่มปิดสีแดงนีออนกลมกลืนในกรอบ */}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-950/40 hover:bg-red-600/95 border border-red-500/40 hover:border-red-400 flex items-center justify-center text-red-400 hover:text-white font-bold text-xs transition-all duration-300 hover:scale-110"
            title="ปิด"
          >
            ✕
          </button>
        </div>

        {/* --- รูปภาพสินค้าสุดพรีเมียม --- */}
        <div className={`relative w-full h-52 rounded-xl border mb-5 p-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#14141d]/80 to-[#09090d]/90 ${
          priceUnit === 'Cash' ? 'border-purple-950/50' : 'border-cyan-950/50'
        }`}>
          <div className={`absolute w-32 h-32 rounded-full filter blur-[50px] opacity-20 ${
            priceUnit === 'Cash' ? 'bg-purple-600' : 'bg-cyan-500'
          }`}></div >
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* --- กรอบรายละเอียดแนว Tech-Info คงเดิมไว้ร้อยเปอร์เซ็นต์ --- */}
        <div className={`w-full rounded-xl p-4 mb-6 border bg-[#060609]/80 text-left ${
          priceUnit === 'Cash' 
            ? 'border-purple-950/60 shadow-[inset_0_2px_10px_rgba(168,85,247,0.05)]' 
            : 'border-cyan-950/60 shadow-[inset_0_2px_10px_rgba(6,182,212,0.05)]'
        }`}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              priceUnit === 'Cash' ? 'bg-purple-500' : 'bg-cyan-400'
            }`}></span>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              ข้อมูลผลิตภัณฑ์
            </h4>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            {product.description || `รายละเอียดสินค้าระดับพรีเมียมของ ${product.name} มีการออกแบบดีไซน์ที่เป็นเอกลักษณ์เฉพาะตัวและคุ้มค่าอย่างมาก`}
          </p>
        </div>

        {/* --- ส่วนควบคุมด้านล่าง (Qty Selector / Cancel / Purchase) --- */}
        <div className="flex w-full gap-3 mt-auto items-center">
          
          {/* 1. ปุ่มเพิ่ม/ลด จำนวน (วางไว้ซ้ายสุดก่อนปุ่ม Cancel) */}
          <div className="flex items-center gap-2 bg-[#121217]/90 p-1 rounded-xl border border-gray-800 shadow-inner">
            <button 
              onClick={decrement} 
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white font-bold transition-all flex items-center justify-center text-sm select-none"
            >
              -
            </button>
            <span className="text-white font-bold w-6 text-center text-sm select-none">
              {quantity}
            </span>
            <button 
              onClick={increment} 
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white font-bold transition-all flex items-center justify-center text-sm select-none"
            >
              +
            </button>
          </div>

          {/* 2. ปุ่มยกเลิก (Cancel) */}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-800 bg-[#121217]/60 hover:bg-gray-800/80 text-gray-400 hover:text-white text-xs font-bold tracking-wider uppercase transition-all duration-200"
          >
            Cancel
          </button>
          
          {/* 3. ปุ่มซื้อพร้อมคำนวณราคาตาม Qty */}
          <button
            onClick={() => onBuy({ ...product, quantity })}
            className={`flex-[1.6] py-3 px-2 rounded-xl text-white text-[10px] font-black tracking-wider uppercase transition-all duration-300 flex justify-center items-center gap-1 shadow-lg active:scale-95 ${
              priceUnit === 'Cash'
                ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/40 hover:shadow-purple-500/50 border border-purple-400/30'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/30 hover:shadow-cyan-500/50 border border-cyan-400/30'
            }`}
          >
            <span className="whitespace-nowrap">Add to cart -</span>
            <span className="underline decoration-1 underline-offset-4 whitespace-nowrap">
              {(product.price * quantity).toLocaleString()} {priceUnit}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItemDetailModal;