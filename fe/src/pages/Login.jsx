import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      {/* ยังคงมี Navbar อยู่ด้านบน */}
      <Navbar />
      
      {/* เนื้อหาหน้าเข้าสู่ระบบ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center w-full">
        <div className="bg-[#0b0b0d] border border-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full">
          <h2 className="text-2xl font-bold text-amber-500 mb-6">เข้าสู่ระบบ</h2>
          
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="ชื่อผู้ใช้งาน / อีเมล" 
              className="w-full px-4 py-2 rounded bg-[#14141a] border border-gray-750 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
            <input 
              type="password" 
              placeholder="รหัสผ่าน" 
              className="w-full px-4 py-2 rounded bg-[#14141a] border border-gray-750 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
            <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded transition-colors text-sm">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;