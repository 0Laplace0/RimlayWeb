import { useState } from 'react';
import UserDetailModal from './UserDetailModal';

const CustomerCRUD = () => {
  // State สำหรับควบคุม Pop-up รายละเอียด
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ข้อมูลจำลองผู้ใช้ตามสเปกและรูปภาพของคุณ
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ashiraya Eiei', role: 'Member', email: 'Ashiraya102139@gmail.com', phone: '0634566939', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', balance: 2500 },
    { id: 2, name: 'Numshok Narngong', role: 'Vip', email: 'numshok@gmail.com', phone: '0971451366', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', balance: 12000 },
    { id: 3, name: 'Aibi Seravine', role: 'Vip', email: 'lillie@gmail.com', phone: '0981951566', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', balance: 8500 },
    { id: 4, name: 'Customer Test01', role: 'Member', email: 'Customer01@gmail.com', phone: '1234567890', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', balance: 350 },
    { id: 5, name: 'Somchai Deejaichan', role: 'Member', email: 'somchai@gmail.com', phone: '0812345671', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', balance: 1500 },
    { id: 6, name: 'Somsri Rakdee', role: 'Vip', email: 'somsri@gmail.com', phone: '0812345672', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', balance: 6700 },
    { id: 7, name: 'John Doe', role: 'Member', email: 'john@gmail.com', phone: '0812345673', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', balance: 900 },
    { id: 8, name: 'Jane Smith', role: 'Vip', email: 'jane@gmail.com', phone: '0812345674', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', balance: 5400 }
  ]);

  // ฟังก์ชันสำหรับเปิด Pop-up รายละเอียดเมื่อคลิกที่ Row
  const handleRowClick = (customer) => {
    setSelectedUser(customer);
    setIsModalOpen(true);
  };

  // ฟังก์ชันย่อยสำหรับปุ่ม Action (ใส่ stopPropagation เพื่อไม่ให้คลิกปุ่มแล้ว Pop-up เด้งซ้อน)
  const handleAction = (e, actionType, customerName) => {
    e.stopPropagation(); // หยุดการส่งผ่าน Event ไปยัง Row <tr>
    alert(`กำลังทำรายการ ${actionType} ของคุณ ${customerName}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Header และ ค้นหา / ปุ่มเพิ่ม Customer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">
          Customer data
        </h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search name, email, phone..." 
            className="w-full sm:w-64 px-4 py-2 text-sm bg-[#120f1e] border border-purple-950/60 rounded-full focus:outline-none focus:border-purple-500 text-gray-300 placeholder-gray-600"
          />
          <button className="shrink-0 px-6 py-2 text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            + Customer
          </button>
        </div>
      </div>

      {/* ตารางแสดงรายชื่อลูกค้า (เลียนแบบ UI ของคุณเป๊ะๆ) */}
      <div className="overflow-x-auto rounded-xl border border-purple-950/40 bg-[#07070a]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-[#110d1a] text-purple-300 text-xs border-b border-purple-950/60 uppercase tracking-wider">
            <tr>
              <th className="p-4 text-center">No.</th>
              <th className="p-4 text-center">Pic</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4 text-center">edit</th>
              <th className="p-4 text-center">PWD</th>
              <th className="p-4 text-center">delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/20">
            {customers.map((customer, index) => (
              <tr 
                key={customer.id} 
                onClick={() => handleRowClick(customer)} // คลิกที่ Row เพื่อเปิด Pop-up
                className="group hover:bg-purple-950/20 cursor-pointer transition-all duration-200"
              >
                {/* No. */}
                <td className="p-4 text-center text-gray-400 font-medium">
                  {index + 1}.
                </td>

                {/* Pic */}
                <td className="p-2">
                  <div className="flex justify-center">
                    <img 
                      src={customer.img} 
                      alt={customer.name} 
                      className="w-10 h-10 rounded-full border-2 border-purple-500/50 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </td>

                {/* Customer Name */}
                <td className="p-4">
                  <span className="font-bold text-white">Name: {customer.name} </span>
                  <span className={`text-xs ml-1 font-semibold ${customer.role === 'Vip' ? 'text-fuchsia-400' : 'text-purple-400'}`}>
                    ( {customer.role} )
                  </span>
                </td>

                {/* Email */}
                <td className="p-4 text-gray-300">
                  {customer.email}
                </td>

                {/* Phone */}
                <td className="p-4 text-gray-400 font-mono">
                  {customer.phone}
                </td>

                {/* Action Buttons (ใส่ e.stopPropagation() เพื่อไม่ให้คลิกปุ่มแล้วไปกระตุ้นการเปิด Pop-up) */}
                {/* Edit Button */}
                <td className="p-3 text-center">
                  <button
                    onClick={(e) => handleAction(e, 'Edit', customer.name)}
                    className="px-4 py-1 text-xs font-bold rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all duration-200"
                  >
                    edit
                  </button>
                </td>

                {/* Reset PWD Button */}
                <td className="p-3 text-center">
                  <button
                    onClick={(e) => handleAction(e, 'Reset Password', customer.name)}
                    className="px-4 py-1 text-xs font-bold rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200"
                  >
                    reset
                  </button>
                </td>

                {/* Delete Button */}
                <td className="p-3 text-center">
                  <button
                    onClick={(e) => handleAction(e, 'Delete', customer.name)}
                    className="px-4 py-1 text-xs font-bold rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all duration-200"
                  >
                    delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POP-UP MODAL ตัวเดิมที่คุณชอบ */}
      <UserDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default CustomerCRUD;