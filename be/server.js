const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// เปิดใช้งาน CORS ให้หน้าบ้าน (Port 5173) ดึงข้อมูลได้ไม่ติดล็อก
app.use(cors());
app.use(express.json());

// สร้าง API เส้นแรก
app.get('/api/data', (req, res) => {
  res.json({ 
    status: "success", 
    message: "สวัสดีครับ! นี่คือข้อมูลที่ดึงมาจาก Node.js Backend" 
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});