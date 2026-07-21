import Navbar from '../components/Navbar';

// Mock Data: ยอดเติมประจำเดือน (Monthly Top 10)
const monthlyRanking = [
  { rank: 1, name: "ShadowSlayer99", amount: 15400, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ShadowSlayer99" },
  { rank: 2, name: "CyberGamer_TH", amount: 12500, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CyberGamer_TH" },
  { rank: 3, name: "NeonViper", amount: 9800, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=NeonViper" },
  { rank: 4, name: "KuroNeko", amount: 7200, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=KuroNeko" },
  { rank: 5, name: "PhoenixRise", amount: 5500, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PhoenixRise" },
  { rank: 6, name: "StormBreaker", amount: 4300, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=StormBreaker" },
  { rank: 7, name: "ZeroTwo_Fan", amount: 3100, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ZeroTwo_Fan" },
  { rank: 8, name: "AlphaWolf", amount: 2800, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AlphaWolf" },
  { rank: 9, name: "MysticCat", amount: 1900, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MysticCat" },
  { rank: 10, name: "PlayerOne", amount: 1500, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PlayerOne" },
];

// Mock Data: ยอดเติมสะสมตลอดกาล (All-Time Top 10)
const allTimeRanking = [
  { rank: 1, name: "GodlikeWhale", amount: 185000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=GodlikeWhale" },
  { rank: 2, name: "ShadowSlayer99", amount: 142000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ShadowSlayer99" },
  { rank: 3, name: "LordOfDarkness", amount: 98000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=LordOfDarkness" },
  { rank: 4, name: "CyberGamer_TH", amount: 76000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CyberGamer_TH" },
  { rank: 5, name: "VaporWave_X", amount: 62000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=VaporWave_X" },
  { rank: 6, name: "NeonViper", amount: 54000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=NeonViper" },
  { rank: 7, name: "DragonSlayer", amount: 48000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DragonSlayer" },
  { rank: 8, name: "KuroNeko", amount: 39000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=KuroNeko" },
  { rank: 9, name: "Titanium_Man", amount: 31000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Titanium_Man" },
  { rank: 10, name: "PhoenixRise", amount: 25000, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=PhoenixRise" },
];

const Leaderboard = () => {
  // ฟังก์ชันช่วยกำหนดสไตล์การ์ดตามลำดับอันดับ (1-3 ไฮไลท์พิเศษ, 4-10 ปกติ)
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return {
          bg: "bg-amber-500/10 border-amber-500/50 hover:border-amber-400 shadow-amber-500/10",
          badgeBg: "bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold shadow-lg shadow-amber-500/30",
          text: "text-amber-300",
          amountText: "text-amber-400 font-bold",
          crown: "👑",
        };
      case 2:
        return {
          bg: "bg-slate-400/10 border-slate-400/40 hover:border-slate-300 shadow-slate-400/10",
          badgeBg: "bg-gradient-to-r from-slate-300 to-slate-500 text-black font-extrabold",
          text: "text-slate-200",
          amountText: "text-slate-300 font-bold",
          crown: "🥈",
        };
      case 3:
        return {
          bg: "bg-amber-800/10 border-amber-700/40 hover:border-amber-600 shadow-amber-700/10",
          badgeBg: "bg-gradient-to-r from-amber-600 to-amber-800 text-white font-extrabold",
          text: "text-amber-200",
          amountText: "text-amber-500 font-bold",
          crown: "🥉",
        };
      default:
        return {
          bg: "bg-[#121216] border-white/5 hover:border-purple-500/30",
          badgeBg: "bg-purple-950/60 text-purple-300 border border-purple-800/50",
          text: "text-gray-300",
          amountText: "text-purple-400 font-semibold",
          crown: null,
        };
    }
  };

  const renderRankingList = (data, themeColor) => (
    <div className="space-y-3">
      {data.map((item) => {
        const style = getRankBadge(item.rank);
        return (
          <div
            key={item.rank}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 shadow-md ${style.bg}`}
          >
            {/* ซีกซ้าย: ลำดับ + รูปโปรไฟล์ + ชื่อ */}
            <div className="flex items-center space-x-3.5">
              {/* Badge ลำดับ */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${style.badgeBg}`}>
                {item.rank}
              </div>

              {/* Avatar รูปโปรไฟล์ */}
              <div className="relative">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full bg-purple-950/40 border border-purple-500/20 object-cover"
                />
                {style.crown && (
                  <span className="absolute -top-2 -right-1 text-xs select-none">
                    {style.crown}
                  </span>
                )}
              </div>

              {/* ชื่อผู้เล่น */}
              <div>
                <p className={`text-sm font-semibold tracking-wide ${style.text}`}>
                  {item.name}
                </p>
                <p className="text-[10px] text-gray-500">
                  {item.rank <= 3 ? "Top Supporter" : "Supporter"}
                </p>
              </div>
            </div>

            {/* ซีกขวา: จำนวนเงิน */}
            <div className="text-right">
              <p className={`text-sm tracking-wider ${style.amountText}`}>
                ฿{item.amount.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500">ยอดเติมสะสม</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d11] text-white flex flex-col w-full">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-10 flex flex-col items-center">
        {/* Page Title Section */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
            TOP-UP LEADERBOARD
          </h1>
          <p className="text-xs text-gray-400 tracking-wide">
            อันดับผู้สนับสนุนและตารางเกียรติยศยอดการเติมสูงสุดของเซิร์ฟเวอร์
          </p>
        </div>

        {/* 2-Column Ranking Container */}
        <div className="w-full max-w-[1050px] grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 👈 ฝั่งซ้าย: อันดับประจำเดือน */}
          <div className="bg-[#0b0b0d]/80 border border-purple-900/30 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/30">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-6 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                <div>
                  <h2 className="text-base font-bold text-purple-300 tracking-wider">
                    MONTHLY TOP 10
                  </h2>
                  <p className="text-[11px] text-gray-400">อันดับยอดเติมประจำเดือนนี้</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-purple-900/30 border border-purple-500/30 text-purple-300">
                รีเซ็ตทุกสิ้นเดือน
              </span>
            </div>

            {renderRankingList(monthlyRanking, "purple")}
          </div>

          {/* 👉 ฝั่งขวา: อันดับสะสมตลอดกาล */}
          <div className="bg-[#0b0b0d]/80 border border-cyan-900/30 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-900/30">
              <div className="flex items-center space-x-2.5">
                <div className="w-2.5 h-6 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                <div>
                  <h2 className="text-base font-bold text-cyan-300 tracking-wider">
                    ALL-TIME TOP 10
                  </h2>
                  <p className="text-[11px] text-gray-400">อันดับยอดเติมสะสมตลอดกาล</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-cyan-900/30 border border-cyan-500/30 text-cyan-300">
                Hall of Fame
              </span>
            </div>

            {renderRankingList(allTimeRanking, "cyan")}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Leaderboard;