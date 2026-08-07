import { useState } from 'react';
import { Users, ShoppingBag, CheckCircle, DollarSign, Calendar, TrendingUp, Download, X, Filter, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

// --- DATA MOCKS ---
const dailyData = [
  { date: '23 ส.ค.', revenue: 5000, transactions: 10 },
  { date: '24 ส.ค.', revenue: 15000, transactions: 55 },
  { date: '25 ส.ค.', revenue: 10000, transactions: 42 },
  { date: '27 ส.ค.', revenue: 22000, transactions: 75 },
  { date: '29 ส.ค.', revenue: 28000, transactions: 78 },
  { date: '31 ส.ค.', revenue: 18000, transactions: 81 },
  { date: '2 ก.ย.', revenue: 35000, transactions: 130 },
  { date: '4 ก.ย.', revenue: 12000, transactions: 55 },
  { date: '6 ก.ย.', revenue: 170000, transactions: 148 },
  { date: '8 ก.ย.', revenue: 65000, transactions: 125 },
  { date: '10 ก.ย.', revenue: 58000, transactions: 70 },
  { date: '12 ก.ย.', revenue: 22000, transactions: 99 },
  { date: '14 ก.ย.', revenue: 42000, transactions: 48 },
  { date: '16 ก.ย.', revenue: 30000, transactions: 66 },
  { date: '18 ก.ย.', revenue: 40000, transactions: 64 },
  { date: '20 ก.ย.', revenue: 28000, transactions: 124 },
  { date: '21 ก.ย.', revenue: 35000, transactions: 60 },
  { date: '22 ก.ย.', revenue: 5000, transactions: 12 }
];

const monthlyData = [
  { month: 'ต.ค. 2567', revenue: 0, transactions: 0 },
  { month: 'พ.ย. 2567', revenue: 0, transactions: 0 },
  { month: 'ธ.ค. 2567', revenue: 0, transactions: 0 },
  { month: 'ม.ค. 2568', revenue: 0, transactions: 0 },
  { month: 'ก.พ. 2568', revenue: 0, transactions: 0 },
  { month: 'มี.ค. 2568', revenue: 0, transactions: 0 },
  { month: 'เม.ย. 2568', revenue: 0, transactions: 0 },
  { month: 'พ.ค. 2568', revenue: 0, transactions: 0 },
  { month: 'มิ.ย. 2568', revenue: 1000, transactions: 5 },
  { month: 'ก.ค. 2568', revenue: 5000, transactions: 12 },
  { month: 'ส.ค. 2568', revenue: 132371, transactions: 502 },
  { month: 'ก.ย. 2568', revenue: 1006170, transactions: 1890 }
];

const quarterlyData = [
  { quarter: 'Q4/2567', revenue: 0, transactions: 0 },
  { quarter: 'Q1/2568', revenue: 0, transactions: 0 },
  { quarter: 'Q2/2568', revenue: 1000, transactions: 5 },
  { quarter: 'Q3/2568', revenue: 1143541, transactions: 2404 }
];

const yearlyData = [
  { year: '2567', revenue: 0, transactions: 0 },
  { year: '2568', revenue: 1144541, transactions: 2409 }
];

const summaryStats = {
  totalMembers: 2291,
  totalSoldItems: 3110,
  remainingSlipOk: 1462,
  todayRevenue: 0,
  weekRevenue: 0,
  monthRevenue: 1006170,
  totalRevenue: 1138541
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePeriod, setActivePeriod] = useState('Daily');
  const [subFilter, setSubFilter] = useState(''); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getFilteredOptions = () => {
    if (activePeriod === 'Yearly') return yearlyData.map(d => ({ label: d.year, value: d.year }));
    if (activePeriod === 'Quarter') return quarterlyData.map(d => ({ label: d.quarter, value: d.quarter }));
    if (activePeriod === 'Monthly') return monthlyData.map(d => ({ label: d.month, value: d.month }));
    if (activePeriod === 'Daily') return dailyData.map(d => ({ label: d.date, value: d.date }));
    return [];
  };

  // --- ฟังก์ชันสร้างและดาวน์โหลดไฟล์ XLSX จริง ---
  const handleExport = () => {
    // 1. เตรียม Raw Data รายการย่อย
    const transactionDetails = [
      { date: '23 ส.ค.', item: 'ขายสินค้า A', amount: 5000 },
      { date: '24 ส.ค.', item: 'ขายสินค้า B', amount: 15000 },
      { date: '25 ส.ค.', item: 'ขายสินค้า C', amount: 10000 },
      // ... สมมติว่ามีรายการย่อยที่นี่เยอะๆ
    ];

    // 2. เลือกชุดข้อมูลสรุป
    let summaryData = [];
    if (activePeriod === 'Daily') summaryData = dailyData;
    else if (activePeriod === 'Monthly') summaryData = monthlyData;
    else if (activePeriod === 'Quarter') summaryData = quarterlyData;
    else if (activePeriod === 'Yearly') summaryData = yearlyData;

    // 3. กรองข้อมูล
    let filteredSummary = subFilter ? summaryData.filter(item => Object.values(item)[0] === subFilter) : summaryData;

    // 4. สร้าง Workbook
    const workbook = XLSX.utils.book_new();

    //สรุปยอด
    const ws1 = XLSX.utils.json_to_sheet(filteredSummary.map(item => ({
      'ช่วงเวลา': Object.values(item)[0],
      'รายได้รวม (บาท)': item.revenue,
      'จำนวนรายการรวม': item.transactions
    })));
    XLSX.utils.book_append_sheet(workbook, ws1, "สรุปยอดรวม");

    // รายละเอียดรายการ
    const ws2 = XLSX.utils.json_to_sheet(transactionDetails.map(item => ({
      'วันที่': item.date,
      'รายละเอียดรายการ': item.item,
      'ยอดเงิน (บาท)': item.amount
    })));
    XLSX.utils.book_append_sheet(workbook, ws2, "รายละเอียดรายการ");

    // 5. ดาวน์โหลด
    const fileName = `รายงานรายได้_${activePeriod}_${subFilter || 'ทั้งหมด'}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10 relative">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-purple-950/40 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">สถิติร้านค้า</h2>
          <p className="text-sm text-gray-400">Statistics Overview</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Workbook
        </button>
      </div>

      {/* --- EXPORT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#151125] border border-purple-900/60 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-purple-950/40 pb-4">
              <div className="flex items-center gap-2.5">
                <Filter className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Export Workbook (XLSX)</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white p-2 bg-purple-950/30 rounded-xl cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Period Selection */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Period</p>
              <div className="flex gap-2">
                {['Daily', 'Monthly', 'Yearly', 'Quarter'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => { setActivePeriod(p); setSubFilter(''); setIsDropdownOpen(false); }} 
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      activePeriod === p ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-purple-900 hover:border-purple-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Custom Dropdown Sub-Filter */}
            <div className="space-y-3 relative">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Select {activePeriod === 'Yearly' ? 'Year' : activePeriod === 'Quarter' ? 'Quarter' : activePeriod === 'Monthly' ? 'Month' : 'Date'}
              </p>
              
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-[#1c192d] border border-purple-900/50 text-white rounded-2xl p-4 text-sm flex justify-between items-center cursor-pointer hover:border-emerald-500/50 transition-all"
              >
                <span>{subFilter || '-- เลือกทั้งหมด --'}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-[#1c192d] border border-purple-900/50 rounded-2xl p-2 z-50 shadow-2xl max-h-52 overflow-y-auto">
                  <div 
                    onClick={() => { setSubFilter(''); setIsDropdownOpen(false); }} 
                    className={`p-3 hover:bg-emerald-600/20 rounded-xl cursor-pointer text-sm ${!subFilter ? 'text-emerald-400 font-bold' : 'text-gray-300'}`}
                  >
                    -- เลือกทั้งหมด --
                  </div>
                  {getFilteredOptions().map((opt, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSubFilter(opt.value); setIsDropdownOpen(false); }} 
                      className={`p-3 hover:bg-emerald-600/20 rounded-xl cursor-pointer text-sm ${subFilter === opt.value ? 'text-emerald-400 font-bold bg-emerald-600/10' : 'text-gray-300'}`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-purple-950/40">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleExport} 
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                Export XLSX
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- STATS CARDS ROW 1 --- */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">จำนวนสมาชิกทั้งหมด</p>
              <h3 className="text-3xl font-extrabold text-white">
                {summaryStats.totalMembers.toLocaleString()} <span className="text-sm font-normal text-gray-400 ml-1">คน</span>
              </h3>
            </div>
            <Users className="w-16 h-16 text-purple-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">ขายแล้วทั้งหมด</p>
              <h3 className="text-3xl font-extrabold text-white">
                {summaryStats.totalSoldItems.toLocaleString()} <span className="text-sm font-normal text-gray-400 ml-1">ชิ้น</span>
              </h3>
            </div>
            <ShoppingBag className="w-16 h-16 text-purple-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">โควต้า Slip คงเหลือ</p>
              <h3 className="text-3xl font-extrabold text-emerald-400">
                {summaryStats.remainingSlipOk.toLocaleString()} <span className="text-sm font-normal text-gray-400 ml-1">สลิป</span>
              </h3>
            </div>
            <CheckCircle className="w-16 h-16 text-emerald-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>
        </div>

        {/* --- STATS CARDS ROW 2 --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้วันนี้ (วันที่ 21)</p>
              <h4 className="text-2xl font-bold text-white">
                {summaryStats.todayRevenue.toLocaleString()} <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <Users className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้สัปดาห์นี้</p>
              <h4 className="text-2xl font-bold text-white">
                {summaryStats.weekRevenue.toLocaleString()} <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <ShoppingBag className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้เดือนนี้ (กันยายน)</p>
              <h4 className="text-2xl font-bold text-cyan-400">
                {summaryStats.monthRevenue.toLocaleString()} <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <CheckCircle className="w-12 h-12 text-cyan-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้ทั้งหมด</p>
              <h4 className="text-2xl font-bold text-purple-300">
                {summaryStats.totalRevenue.toLocaleString()} <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <DollarSign className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-[#151125]/80 border border-purple-950/60 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/30 pb-3">
            <h4 className="text-md font-bold text-purple-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              เปรียบเทียบรายได้ใน 30 วัน
            </h4>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> จำนวนรายได้</span>
              <span className="flex items-center gap-1 text-fuchsia-500"><span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span> จำนวนรายการ</span>
            </div>
          </div>
          
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#221b35" vertical={false} />
                <XAxis dataKey="date" stroke="#6b7280" tickLine={false} />
                <YAxis yAxisId="left" stroke="#06b6d4" tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#d946ef" tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#181125', borderColor: '#4c1d95', borderRadius: '1rem' }} labelClassName="text-purple-300 font-bold" />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} name="รายได้ (บาท)" />
                <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#d946ef" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} name="จำนวนรายการ" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#151125]/80 border border-purple-950/60 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/30 pb-3">
            <h4 className="text-md font-bold text-purple-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              เปรียบเทียบรายได้ใน 12 เดือน
            </h4>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> จำนวนรายได้</span>
              <span className="flex items-center gap-1 text-fuchsia-500"><span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span> จำนวนรายการ</span>
            </div>
          </div>

          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#221b35" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
                <YAxis yAxisId="left" stroke="#06b6d4" tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#d946ef" tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#181125', borderColor: '#4c1d95', borderRadius: '1rem' }} labelClassName="text-purple-300 font-bold" />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} name="รายได้ (บาท)" />
                <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#d946ef" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} name="จำนวนรายการ" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;