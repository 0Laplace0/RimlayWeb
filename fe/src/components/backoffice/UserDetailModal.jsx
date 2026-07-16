import React from 'react';
import { X, User, DollarSign, Trophy, Calendar, CreditCard, ArrowUpRight, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const UserDetailModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  // จำลองข้อมูลประวัติการทำรายการเติมเงินของคนที่กดเลือกเข้ามา
  const topupHistory = user.topupHistory || [
    { id: 'TX-9021', date: '2026-07-10 14:32', amount: 500, method: 'SlipOk (TrueMoney)', status: 'success' },
    { id: 'TX-8840', date: '2026-07-02 09:15', amount: 1200, method: 'QR PromptPay', status: 'success' },
    { id: 'TX-7214', date: '2026-06-15 18:45', amount: 300, method: 'True Wallet', status: 'success' },
    { id: 'TX-5103', date: '2026-05-20 22:10', amount: 2000, method: 'QR PromptPay', status: 'success' },
  ];

  const maxSingleTopup = topupHistory.length > 0 
    ? Math.max(...topupHistory.map(item => item.amount)) 
    : 0;

  const totalAmount = topupHistory.reduce((sum, item) => sum + item.amount, 0);

  const chartData = [...topupHistory].reverse().map(item => ({
    date: item.date.split(' ')[0], 
    amount: item.amount
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-4xl bg-[#0b0b0d]/95 border border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.15)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-fuchsia-500 w-full" />

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-950/40 bg-[#140f22]/50">
          <div className="flex items-center gap-3">
            <div className="p-1">
              <img src={user.img} alt={user.name} className="w-12 h-12 rounded-full border-2 border-purple-500/50 object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">{user.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-400">{user.email} | เบอร์โทร: {user.phone}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-purple-950/20 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#120e20] border border-purple-950/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">ยอดเติมเงินสะสม</p>
                <p className="text-xl font-bold text-cyan-400">{totalAmount.toLocaleString()} <span className="text-xs font-normal text-gray-500">฿</span></p>
              </div>
            </div>

            <div className="bg-[#120e20] border border-purple-950/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl">
                <Trophy className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">ยอดเติมสูงสุด/ครั้ง</p>
                <p className="text-xl font-bold text-fuchsia-400">{maxSingleTopup.toLocaleString()} <span className="text-xs font-normal text-gray-500">฿</span></p>
              </div>
            </div>

            <div className="bg-[#120e20] border border-purple-950/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold">ยอดเครดิตคงเหลือ</p>
                <p className="text-xl font-bold text-emerald-400">{(user.balance || 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">฿</span></p>
              </div>
            </div>
          </div>

          {/* HISTORY TABLE & CHART */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#120e20] border border-purple-950/40 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                ประวัติรายการเติมเงิน
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-300">
                  <thead className="bg-[#181125]/80 text-purple-300 border-b border-purple-950/40">
                    <tr>
                      <th className="p-3 rounded-l-lg">รหัสรายการ</th>
                      <th className="p-3">วันที่/เวลา</th>
                      <th className="p-3 text-right">ยอดเงิน</th>
                      <th className="p-3">ช่องทาง</th>
                      <th className="p-3 text-center rounded-r-lg">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-950/20">
                    {topupHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-purple-950/10 transition-colors">
                        <td className="p-3 font-semibold text-purple-400">{item.id}</td>
                        <td className="p-3 text-gray-400">{item.date}</td>
                        <td className="p-3 text-right font-bold text-white">+{item.amount.toLocaleString()} ฿</td>
                        <td className="p-3 text-gray-400">{item.method}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            สำเร็จ
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#120e20] border border-purple-950/40 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-fuchsia-400" />
                  แนวโน้มพฤติกรรมการเติม
                </h4>
              </div>

              <div className="h-40 w-full mt-4 text-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmountModal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#181125', borderColor: '#4c1d95' }} />
                    <Area type="monotone" dataKey="amount" stroke="#d946ef" fillOpacity={1} fill="url(#colorAmountModal)" name="ยอดเติม (฿)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-gray-400 italic text-center mt-3 flex items-center justify-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-fuchsia-400" />
                ยอดเติมสูงสุดครั้งเดียวคือ {maxSingleTopup.toLocaleString()} บาท
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-[#140f22]/30 border-t border-purple-950/40 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
          >
            ปิดหน้าจอ
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserDetailModal;