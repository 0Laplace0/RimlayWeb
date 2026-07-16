import { Users, ShoppingBag, CheckCircle, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- DATA MOCKS (ตามแบบภาพตัวอย่าง) ---

// 1. ข้อมูลรายได้ 30 วันล่าสุด (เปรียบเทียบ รายได้ VS จำนวนรายการ)
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

// 2. ข้อมูลรายได้ 12 เดือน (เปรียบเทียบ รายได้ VS จำนวนรายการ)
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

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      
      {/* --- HEADER --- */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide">สถิติต้านค้า</h2>
        <p className="text-sm text-gray-400">Statistics Overview</p>
      </div>

      {/* --- STATS CARDS ROW 1 & 2 --- */}
      <div className="space-y-4">
        {/* แถวบน: สมาชิก, ยอดขายทั้งหมด, SlipOk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* การ์ด 1: จำนวนสมาชิก */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">จำนวนสมาชิกทั้งหมด</p>
              <h3 className="text-3xl font-extrabold text-white">
                2,291 <span className="text-sm font-normal text-gray-400 ml-1">คน</span>
              </h3>
            </div>
            <Users className="w-16 h-16 text-purple-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>

          {/* การ์ด 2: ขายแล้วทั้งหมด */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">ขายแล้วทั้งหมด</p>
              <h3 className="text-3xl font-extrabold text-white">
                3,110 <span className="text-sm font-normal text-gray-400 ml-1">ชิ้น</span>
              </h3>
            </div>
            <ShoppingBag className="w-16 h-16 text-purple-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>

          {/* การ์ด 3: โควต้า SlipOk */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/5 border border-purple-950/50 rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="space-y-2 z-10">
              <p className="text-sm font-semibold text-purple-300">โควต้า SlipOk คงเหลือ</p>
              <h3 className="text-3xl font-extrabold text-emerald-400">
                1,462 <span className="text-sm font-normal text-gray-400 ml-1">สลิป</span>
              </h3>
            </div>
            <CheckCircle className="w-16 h-16 text-emerald-500/20 absolute -right-2 -bottom-2 md:relative md:right-0 md:bottom-0 z-0 shrink-0" />
          </div>

        </div>

        {/* แถวล่าง: รายได้วัน, สัปดาห์, เดือน, ทั้งหมด */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* รายได้วันนี้ */}
          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้วันนี้ (วันที่ 21)</p>
              <h4 className="text-2xl font-bold text-white">
                0 <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <Users className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          {/* รายได้สัปดาห์นี้ */}
          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้สัปดาห์นี้</p>
              <h4 className="text-2xl font-bold text-white">
                0 <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <ShoppingBag className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          {/* รายได้เดือนนี้ */}
          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้เดือนนี้ (กันยายน)</p>
              <h4 className="text-2xl font-bold text-cyan-400">
                1,006,170 <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <CheckCircle className="w-12 h-12 text-cyan-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

          {/* รายได้ทั้งหมด */}
          <div className="relative overflow-hidden bg-[#151125] border border-purple-950/40 rounded-2xl p-5 flex justify-between items-center">
            <div className="space-y-1 z-10">
              <p className="text-xs text-gray-400 font-semibold">รายได้ทั้งหมด</p>
              <h4 className="text-2xl font-bold text-purple-300">
                1,138,541 <span className="text-xs font-normal text-gray-500 ml-1">บาท</span>
              </h4>
            </div>
            <DollarSign className="w-12 h-12 text-purple-500/10 absolute -right-2 -bottom-2 z-0" />
          </div>

        </div>
      </div>

      {/* --- CHARTS SECTION (GRID 2 COLUMNS) --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* กราฟที่ 1: เปรียบเทียบรายได้ใน 30 วัน */}
        <div className="bg-[#151125]/80 border border-purple-950/60 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/30 pb-3">
            <h4 className="text-md font-bold text-purple-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              เปรียบเทียบรายได้ใน 30 วัน
            </h4>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> จำนวนรายได้
              </span>
              <span className="flex items-center gap-1 text-fuchsia-500">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span> จำนวนรายการ
              </span>
            </div>
          </div>
          
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#221b35" vertical={false} />
                <XAxis dataKey="date" stroke="#6b7280" tickLine={false} />
                {/* แกน Y ฝั่งซ้าย: รายได้ */}
                <YAxis yAxisId="left" stroke="#06b6d4" tickLine={false} />
                {/* แกน Y ฝั่งขวา: จำนวนรายการ */}
                <YAxis yAxisId="right" orientation="right" stroke="#d946ef" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#181125', borderColor: '#4c1d95', borderRadius: '1rem' }}
                  labelClassName="text-purple-300 font-bold"
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 1 }} 
                  activeDot={{ r: 6 }} 
                  name="รายได้ (บาท)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#d946ef" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 1 }} 
                  activeDot={{ r: 6 }} 
                  name="จำนวนรายการ"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* กราฟที่ 2: เปรียบเทียบรายได้ใน 12 เดือน */}
        <div className="bg-[#151125]/80 border border-purple-950/60 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-purple-950/30 pb-3">
            <h4 className="text-md font-bold text-purple-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              เปรียบเทียบรายได้ใน 12 เดือน
            </h4>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> จำนวนรายได้
              </span>
              <span className="flex items-center gap-1 text-fuchsia-500">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span> จำนวนรายการ
              </span>
            </div>
          </div>

          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#221b35" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tickLine={false} />
                {/* แกน Y ฝั่งซ้าย: รายได้ */}
                <YAxis yAxisId="left" stroke="#06b6d4" tickLine={false} />
                {/* แกน Y ฝั่งขวา: จำนวนรายการ */}
                <YAxis yAxisId="right" orientation="right" stroke="#d946ef" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#181125', borderColor: '#4c1d95', borderRadius: '1rem' }}
                  labelClassName="text-purple-300 font-bold"
                />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#06b6d4" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 1 }} 
                  activeDot={{ r: 6 }} 
                  name="รายได้ (บาท)"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#d946ef" 
                  strokeWidth={2.5} 
                  dot={{ r: 3, strokeWidth: 1 }} 
                  activeDot={{ r: 6 }} 
                  name="จำนวนรายการ"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;