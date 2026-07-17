import { useState } from 'react';
import UserDetailModal from './UserDetailModal';
import { swalUtils } from '../../utils/swalUtils';

const CustomerCRUD = () => {
  // State สำหรับควบคุม Pop-up รายละเอียด
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ข้อมูลจำลองผู้ใช้ตามสเปกและรูปภาพของคุณ
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ashiraya Eiei', role: 'Admin', email: 'Ashiraya102139@gmail.com', phone: '0634566939', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', balance: 2500 },
    { id: 2, name: 'Numshok Narngong', role: 'Vip', email: 'numshok@gmail.com', phone: '0971451366', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', balance: 12000 },
    { id: 3, name: 'Aibi Seravine', role: 'Vip', email: 'lillie@gmail.com', phone: '0981951566', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', balance: 8500 },
    { id: 4, name: 'Customer Test01', role: 'Member', email: 'Customer01@gmail.com', phone: '1234567890', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', balance: 350 },
    { id: 5, name: 'Somchai Deejaichan', role: 'Member', email: 'somchai@gmail.com', phone: '0812345671', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', balance: 1500 },
    { id: 6, name: 'Somsri Rakdee', role: 'Vip', email: 'somsri@gmail.com', phone: '0812345672', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', balance: 6700 },
    { id: 7, name: 'John Doe', role: 'Member', email: 'john@gmail.com', phone: '0812345673', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', balance: 900 },
    { id: 8, name: 'Jane Smith', role: 'Vip', email: 'jane@gmail.com', phone: '0812345674', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', balance: 5400 }
  ]);

  // คลัง State สำหรับจัดการเพิ่ม/แก้ไข/เปลี่ยนรหัสผ่าน
  const [view, setView] = useState('table'); // 'table' | 'add' | 'edit' | 'reset'
  const [form, setForm] = useState({ id: null, name: '', role: 'Member', email: '', phone: '', img: '', balance: '' });
  const [passwordForm, setPasswordForm] = useState({ id: null, name: '', newPassword: '', confirmPassword: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  // State สำหรับควบคุมการเปิด-ปิด Custom Dropdown ของ Role
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

  // ฟังก์ชันสำหรับเปิด Pop-up รายละเอียดเมื่อคลิกที่ Row
  const handleRowClick = (customer) => {
    setSelectedUser(customer);
    setIsModalOpen(true);
  };

  // ดึงข้อมูลเข้าฟอร์มสำหรับ ADD
  const handleOpenAdd = () => {
    setForm({ id: null, name: '', role: 'Member', email: '', phone: '', img: '', balance: '0' });
    setIsRoleDropdownOpen(false);
    setView('add');
  };

  // ดึงข้อมูลเข้าฟอร์มสำหรับ EDIT
  const handleOpenEdit = (e, customer) => {
    e.stopPropagation();
    setForm({
      id: customer.id,
      name: customer.name,
      role: customer.role,
      email: customer.email,
      phone: customer.phone,
      img: customer.img || '',
      balance: customer.balance
    });
    setIsRoleDropdownOpen(false);
    setView('edit');
  };

  // ดึงข้อมูลสำหรับหน้า RESET PASSWORD
  const handleOpenReset = (e, customer) => {
    e.stopPropagation();
    setPasswordForm({ id: customer.id, name: customer.name, newPassword: '', confirmPassword: '' });
    setView('reset');
  };

  // ฟังก์ชันอัปโหลดและแปลงรูปภาพเป็น Base64
  const handleImageImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        swalUtils.error('ไฟล์ไม่ถูกต้อง', 'กรุณาเลือกไฟล์ภาพที่ถูกต้องเท่านั้นครับ!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ป้องกันคีย์ลบ "-" และสัญลักษณ์พิเศษใน Input ตัวเลข
  const preventNegativeInput = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
      e.preventDefault();
    }
  };

  // บันทึกการ ADD / EDIT พร้อมหน้าต่างตรวจสอบและแสดงข้อมูลทั้งหมด
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEditMode = view === 'edit';
    const titleText = isEditMode ? 'ตรวจสอบการแก้ไขข้อมูล' : 'ตรวจสอบข้อมูลสมาชิกใหม่';
    const confirmBtnText = isEditMode ? 'ยืนยันอัปเดต' : 'ยืนยันบันทึกข้อมูล';
    const avatarUrl = form.img || defaultAvatar;

    const isConfirmed = await swalUtils.previewConfirm({
      actionTitle: titleText,
      image: avatarUrl,
      confirmText: confirmBtnText,
      cancelText: 'กลับไปแก้ไข',
      fields: [
        { label: 'ชื่อ-นามสกุล', value: form.name.trim() },
        { 
          label: 'บทบาท (Role)', 
          value: form.role === 'Vip' ? 'VIP' : form.role, 
          isSpecial: form.role !== 'Member' 
        },
        { label: 'อีเมล (Email)', value: form.email.trim() },
        { label: 'เบอร์โทรศัพท์', value: form.phone.trim() },
        { label: 'ยอดเงินคงเหลือ', value: `${Number(form.balance).toLocaleString()} ฿`, isSpecial: true }
      ]
    });

    // ทำงานต่อเมื่อผู้ใช้กดยืนยันข้อมูลเรียบร้อยแล้ว
    if (isConfirmed) {
      const balanceNum = Math.max(0, Number(form.balance));

      if (view === 'add') {
        const newCustomer = {
          id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
          name: form.name.trim(),
          role: form.role,
          email: form.email.trim(),
          phone: form.phone.trim(),
          img: form.img || defaultAvatar,
          balance: balanceNum
        };
        setCustomers([...customers, newCustomer]);
        swalUtils.success('เพิ่มสมาชิกสำเร็จ!', `เพิ่มสมาชิก ${newCustomer.name} เรียบร้อยแล้ว`);
      } else if (view === 'edit') {
        setCustomers(customers.map(c => c.id === form.id ? {
          ...c,
          name: form.name.trim(),
          role: form.role,
          email: form.email.trim(),
          phone: form.phone.trim(),
          img: form.img || defaultAvatar,
          balance: balanceNum
        } : c));
        swalUtils.success('อัปเดตสำเร็จ!', `อัปเดตข้อมูลของคุณ ${form.name} เรียบร้อยแล้ว`);
      }
      
      setView('table');
    }
  };

  // บันทึกการเปลี่ยนรหัสผ่าน (Reset Password) พร้อมระบบ Recheck
  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      swalUtils.error('รหัสผ่านไม่ตรงกัน', 'กรุณาตรวจสอบการยืนยันรหัสผ่านอีกครั้ง');
      return;
    }

    swalUtils.confirm({
      title: 'ยืนยันการเปลี่ยนรหัสผ่าน?',
      text: `คุณต้องการเปลี่ยนรหัสผ่านใหม่ของ "${passwordForm.name}" ใช่หรือไม่?`,
      confirmButtonText: 'ใช่, เปลี่ยนรหัสผ่าน',
      cancelButtonText: 'ยกเลิก',
      isDangerous: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalUtils.success('สำเร็จ!', `ทำการเปลี่ยนรหัสผ่านของ ${passwordForm.name} เรียบร้อยแล้ว`);
        setView('table');
      }
    });
  };

  // ลบข้อมูล Customer
  const handleDelete = (e, customer) => {
    e.stopPropagation(); // ป้องกันการติด Row Click
    
    swalUtils.confirm({
      title: 'คุณแน่ใจหรือไม่?',
      text: `คุณต้องการลบข้อมูลของคุณ "${customer.name}" ใช่หรือไม่? ไม่สามารถกู้คืนได้ภายหลัง`,
      confirmButtonText: 'ใช่, ต้องการลบ!',
      cancelButtonText: 'ยกเลิก',
      isDangerous: true
    }).then((result) => {
      if (result.isConfirmed) {
        setCustomers(customers.filter(c => c.id !== customer.id));
        swalUtils.success('ลบข้อมูลแล้ว!', 'ลบข้อมูลลูกค้าออกจากระบบเรียบร้อย');
      }
    });
  };

  // ค้นหาข้อมูลเรียลไทม์ (Name, Email, Phone)
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 text-white">
      {view === 'table' ? (
        <div>
          {/* Header และ ค้นหา / ปุ่มเพิ่ม Customer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-400">
              Customer data
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder="Search name, email, phone..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 text-sm bg-[#120f1e] border border-purple-950/60 rounded-full focus:outline-none focus:border-purple-500 text-gray-300 placeholder-gray-600 shadow-inner"
              />
              <button 
                onClick={handleOpenAdd}
                className="shrink-0 px-6 py-2 text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                + Customer
              </button>
            </div>
          </div>

          {/* ตารางแสดงรายชื่อลูกค้า */}
          <div className="overflow-x-auto rounded-xl border border-purple-950/40 bg-[#07070a]">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-[#110d1a] text-purple-300 text-xs border-b border-purple-950/60 uppercase tracking-wider">
                <tr>
                  <th className="p-4 text-center">No.</th>
                  <th className="p-4 text-center">Pic</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 text-right">Balance</th>
                  <th className="p-4 text-center w-24">edit</th>
                  <th className="p-4 text-center w-24">PWD</th>
                  <th className="p-4 text-center w-24">delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/20">
                {filteredCustomers.map((customer, index) => (
                  <tr 
                    key={customer.id} 
                    onClick={() => handleRowClick(customer)} 
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
                          src={customer.img || defaultAvatar} 
                          alt={customer.name} 
                          className="w-10 h-10 rounded-full border-2 border-purple-500/50 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </td>

                    {/* Customer Name + ปรับแต่งสีแสดงผลตาม Role */}
                    <td className="p-4">
                      <span className="font-bold text-white">Name: {customer.name} </span>
                      <span className={`text-xs ml-1 font-semibold ${
                        customer.role === 'Admin' 
                          ? 'text-amber-400' 
                          : customer.role === 'Vip' 
                          ? 'text-fuchsia-400' 
                          : 'text-purple-400'
                      }`}>
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

                    {/* Balance */}
                    <td className="p-4 text-right text-emerald-400 font-bold">
                      {customer.balance.toLocaleString()} ฿
                    </td>

                    {/* Edit Button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => handleOpenEdit(e, customer)}
                        className="px-4 py-1.5 text-xs font-bold rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all duration-200 shadow-md shadow-amber-500/10"
                      >
                        edit
                      </button>
                    </td>

                    {/* Reset PWD Button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => handleOpenReset(e, customer)}
                        className="px-4 py-1.5 text-xs font-bold rounded-full bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-200 shadow-md shadow-cyan-500/10"
                      >
                        reset
                      </button>
                    </td>

                    {/* Delete Button */}
                    <td className="p-3 text-center">
                      <button
                        onClick={(e) => handleDelete(e, customer)}
                        className="px-4 py-1.5 text-xs font-bold rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all duration-200 shadow-md shadow-rose-600/10"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center p-8 text-gray-500">
                      ไม่พบข้อมูลลูกค้าที่คุณค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : view === 'add' || view === 'edit' ? (
        /* หน้าต่างฟอร์ม Add และ Edit Customer */
        <div className="space-y-6">
          <div className="bg-[#110d1a] border border-purple-950/60 py-4 px-6 rounded-lg text-center shadow-lg">
            <h1 className="text-lg font-bold text-purple-300 tracking-wide">
              :: {view === 'add' ? 'Add New Customer' : 'Edit Customer Information'} ::
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 text-sm pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter Full Name"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            {/* ส่วนเลือก Role Status (Custom Dropdown โค้งมน 100% สวยงาม) */}
            <div className="flex flex-col sm:flex-row sm:items-center relative">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Role Status</label>
              <div className="flex-1 relative">
                <button
                  type="button"
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="w-full text-left px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white flex justify-between items-center transition-all duration-250"
                >
                  <span>{form.role === 'Vip' ? 'VIP' : form.role}</span>
                  <svg 
                    className={`h-4 w-4 text-purple-400 transition-transform duration-200 ${isRoleDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 rounded-2xl bg-[#120f1e] border border-purple-500/30 shadow-2xl overflow-hidden py-1">
                    {['Member', 'Vip', 'Admin'].map((roleOption) => (
                      <button
                        key={roleOption}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, role: roleOption });
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                          form.role === roleOption
                            ? 'bg-purple-950/60 text-purple-300 font-bold'
                            : 'text-gray-300 hover:bg-purple-950/30 hover:text-white'
                        }`}
                      >
                        {roleOption === 'Vip' ? 'VIP' : roleOption}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@mail.com"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0XXXXXXXXX"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1">Balance (฿)</label>
              <input
                type="number"
                required
                min="0"
                onKeyDown={preventNegativeInput}
                value={form.balance}
                onChange={(e) => setForm({ ...form, balance: e.target.value })}
                placeholder="Initial balance"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white font-bold text-emerald-400"
              />
            </div>

            {/* ส่วนอัปโหลดรูปภาพ */}
            <div className="flex flex-col sm:flex-row sm:items-start">
              <label className="sm:w-32 text-gray-400 font-semibold mb-1 sm:mt-2">Profile Pic</label>
              <div className="flex-1 space-y-3">
                <div className="relative group flex flex-col justify-center items-center border border-dashed border-purple-950/80 hover:border-purple-500/80 rounded-2xl bg-[#120f1e] p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageImport}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-purple-400 group-hover:underline">Click to upload Avatar</p>
                    <p className="text-[10px] text-gray-500">JPG, PNG or WEBP format</p>
                  </div>
                </div>

                {form.img && (
                  <div className="flex items-center gap-4 p-3 bg-purple-950/20 border border-purple-950/50 rounded-xl">
                    <img 
                      src={form.img} 
                      alt="Avatar preview" 
                      className="w-16 h-16 object-cover rounded-full border border-purple-500"
                    />
                    <div>
                      <p className="text-xs text-purple-300 font-semibold">Avatar loaded successfully!</p>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, img: '' }))}
                        className="text-[11px] text-rose-400 hover:text-rose-300 font-bold underline mt-1"
                      >
                        Clear Avatar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-4 sm:pl-32">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-500 transition duration-300 shadow-md shadow-blue-600/20"
              >
                {view === 'add' ? 'Save Customer' : 'Update Info'}
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                className="px-8 py-2.5 rounded-full font-bold text-white bg-rose-600 hover:bg-rose-500 transition duration-300 shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* หน้าต่างฟอร์ม Reset Password */
        <div className="space-y-6">
          <div className="bg-[#110d1a] border border-purple-950/60 py-4 px-6 rounded-lg text-center shadow-lg">
            <h1 className="text-lg font-bold text-cyan-300 tracking-wide">
              :: Reset Password for {passwordForm.name} ::
            </h1>
          </div>

          <form onSubmit={handleResetSubmit} className="max-w-xl mx-auto space-y-5 text-sm pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-36 text-gray-400 font-semibold mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="Enter new secure password"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center">
              <label className="sm:w-36 text-gray-400 font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Verify new password"
                className="flex-1 px-4 py-2 rounded-full bg-[#120f1e] border border-purple-950/60 focus:outline-none focus:border-purple-500 text-white"
              />
            </div>

            <div className="flex items-center space-x-3 pt-4 sm:pl-36">
              <button
                type="submit"
                className="px-8 py-2.5 rounded-full font-bold text-black bg-cyan-500 hover:bg-cyan-400 transition duration-300 shadow-md shadow-cyan-500/20"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={() => setView('table')}
                className="px-8 py-2.5 rounded-full font-bold text-white bg-rose-600 hover:bg-rose-500 transition duration-300 shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <UserDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default CustomerCRUD;