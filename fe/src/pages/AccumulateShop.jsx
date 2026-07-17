import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import ItemDetailModal from '../components/ItemDetailModal';
import { swalUtils } from '../utils/swalUtils';

const AccumulateShop = () => {
  // State คุมการเปิดปิดและเลือกสินค้าเพื่อแสดงผลใน Pop-up
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // สร้างสินค้าจำลองสำหรับหน้าร้านค้ายอดสะสม
  const accumulateProducts = Array.from({ length: 22 }, (_, index) => ({
    id: `acc-${index + 1}`,
    name: `Accumulated Reward ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://placehold.co/300x300/121214/06b6d4?text=Reward", // เปลี่ยนเฉดสีภาพตัวอย่างเป็นธีมฟ้าให้เข้ากับแต้ม Point
    description: `ไอเท็มระดับรางวัลพิเศษของสะสมชิ้นที่ ${index + 1} แลกรับสิทธิ์ได้เฉพาะผู้ที่มีคะแนนสะสมครบตามที่กำหนดเท่านั้น เป็นลิมิเต็ดเอดิชันเฉพาะซีซันนี้`,
  }));

  // เมื่อคลิกที่ Item ใน Grid จะเปิด Pop-up รายละเอียดไอเท็ม
  const handleItemClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ฟังก์ชันกดยืนยันการสั่งซื้อหรือแลกไอเท็มสะสมแบบพรีเมียม
  const handleBuy = async (product) => {
    // ปิด Modal รายละเอียดก่อนเพื่อหลีกเลี่ยง UI ทับซ้อน
    setIsModalOpen(false);

    // แสดงกล่องยืนยันการใช้แต้มแลกสินค้า
    const result = await swalUtils.confirm({
      title: 'ยืนยันการแลกรับของรางวัล?',
      text: `คุณต้องการใช้คะแนนสะสมแลกรางวัล "${product.name}" จำนวน ${product.price.toLocaleString()} Points ใช่หรือไม่?`,
      confirmButtonText: 'ยืนยันแลกของรางวัล',
      cancelButtonText: 'ยกเลิก',
    });

    // หากผู้ใช้งานกดยืนยันการแลก
    if (result.isConfirmed) {
      swalUtils.success(
        'แลกของรางวัลสำเร็จ!',
        `ได้ทำการแลกรับ "${product.name}" เรียบร้อยแล้ว (ใช้ไป ${product.price.toLocaleString()} Points)`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />
      
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <ProductGrid 
            products={accumulateProducts} 
            title="ACCUMULATE SHOP" 
            subtitle="ร้านค้ายอดสะสม" 
            cols={4} 
            rows={5} 
            priceUnit="Points"
            onItemClick={handleItemClick}
          />
        </div>
      </div>

      {/* POP-UP MODAL แสดงรายละเอียดไอเท็มรางวัลสะสม (ปรับเป็นหน่วย Points เพื่อแสดงสไตล์นีออนสีฟ้าอัตโนมัติ) */}
      <ItemDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        priceUnit="Points"
        onBuy={handleBuy}
      />
    </div>
  );
};

export default AccumulateShop;