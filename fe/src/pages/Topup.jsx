import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { swalUtils } from '../utils/swalUtils.js';

const Topup = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('promptpay'); // 'promptpay' | 'truemoney'
  const [isError, setIsError] = useState(false);

  // ป้องกันการพิมพ์เครื่องหมาย - , + หรือ e
  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  // กรองค่าให้พิมพ์ได้เฉพาะเลขมากกว่าหรือเท่ากับ 0
  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || Number(val) >= 0) {
      setAmount(val);
      setIsError(false);
    }
  };

  // ฟังก์ชันกดดำเนินการต่อ
  const handleContinue = (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || Number(amount) <= 0 || amount.includes('.')) {
      setIsError(true);
      swalUtils.error?.('ข้อมูลไม่ถูกต้อง', 'กรุณากรอกจำนวนเงินเป็นจำนวนเต็มที่มากกว่า 0 เท่านั้น');
      return;
    }
    
    setIsError(false);

    if (selectedMethod === 'promptpay') {
      navigate('/topup/promptpay', { state: { amount: amount } });
    } else if (selectedMethod === 'truemoney') {
      navigate('/topup/truemoney', { state: { amount: amount } });
    }
  };

  return (
    <div className="w-full h-screen bg-[#0b0b0d] flex flex-col overflow-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* 🟪 2. เนื้อหาหน้าเติมเงิน (จัดกึ่งกลางพอดีหน้าจอ) */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-[#120e1d] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40">
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
            เติมเงินเข้าระบบ
          </h2>

          <form onSubmit={handleContinue}>
            
            {/* จำนวนเงินที่ต้องการเติม */}
            <div className="mb-5">
              <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                จำนวนเงินที่ต้องการเติม:
              </label>
              <input
                type="number"
                min="1"
                step="1"
                onKeyDown={handleKeyDown}
                placeholder="กรอกจำนวนเงินที่ต้องการเติม"
                value={amount}
                onChange={handleAmountChange}
                className={`w-full bg-[#0b0b0d] border ${
                  isError ? 'border-red-500' : 'border-purple-500/40'
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-base sm:text-lg`}
              />
              {isError ? (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5">กรุณากรอกจำนวนเงินให้ถูกต้อง (ต้องมากกว่า 0)</p>
              ) : (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5 opacity-0 select-none">เว้นบรรทัด</p>
              )}
            </div>

            {/* เลือกวิธีชำระเงิน */}
            <h3 className="text-white font-medium mb-3 text-sm sm:text-base">เลือกวิธีชำระเงิน</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              {/* บัตรเลือก 1: PromptPay */}
              <div
                onClick={() => setSelectedMethod('promptpay')}
                className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  selectedMethod === 'promptpay'
                    ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-[#181326] border-purple-500/20 hover:border-purple-500/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="bg-white rounded-lg px-3 py-1.5 flex flex-col items-center justify-center h-14 w-28 border border-gray-200">
                  <span className="text-[9px] text-[#113566] font-bold leading-none mb-1">พร้อมเพย์</span>
                  <span className="text-base text-[#113566] font-bold leading-none">PromptPay</span>
                </div>
                <span className="text-white font-medium text-base">QR PromptPay</span>
              </div>

              {/* บัตรเลือก 2: TrueMoney Wallet */}
              <div
                onClick={() => setSelectedMethod('truemoney')}
                className={`cursor-pointer border-2 rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  selectedMethod === 'truemoney'
                    ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-[#181326] border-purple-500/20 hover:border-purple-500/50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="bg-white rounded-lg px-3 py-1.5 flex flex-col items-center justify-center h-14 w-28 border border-gray-200">
                  <div className="flex items-end mb-1">
                    <div className="w-2 h-5 bg-[#ed1c24] rounded-sm transform -skew-x-12 mr-1"></div>
                    <div className="w-2 h-3.5 bg-[#f47920] rounded-sm transform -skew-x-12 mr-1"></div>
                    <div className="w-2 h-2.5 bg-[#fdb913] rounded-sm transform -skew-x-12"></div>
                  </div>
                  <div className="flex items-baseline leading-none">
                    <span className="text-[10px] font-bold text-[#ed1c24]">true<span className="text-[#f47920]">money</span></span>
                  </div>
                </div>
                <span className="text-white font-medium text-base">TrueMoney Wallet</span>
              </div>

            </div>

            {/* ปุ่มดำเนินการต่อ และ ปุ่มยกเลิก */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full sm:w-1/3 bg-gray-800 hover:bg-red-600 hover:border-red-600 text-gray-300 hover:text-white font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-center text-base order-2 sm:order-1 border border-gray-700 shadow-md"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                className="w-full sm:w-2/3 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 cursor-pointer text-base order-1 sm:order-2"
              >
                ยืนยันการทำรายการ
              </button>
            </div>
            
          </form>

        </div>
      </div>

    </div>
  );
};

export default Topup;