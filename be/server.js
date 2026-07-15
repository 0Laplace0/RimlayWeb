const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

// คีย์ลับสำหรับเข้ารหัส Token (ในโปรดักชันจริงควรเก็บในไฟล์ .env นะครับ)
const JWT_SECRET = "rimlay_secret_key_super_secure_123456";

app.use(cors());
app.use(express.json());

// API สำหรับทดสอบทั่วไป (ใครก็เข้าได้)
app.get('/api/data', (req, res) => {
  res.json({ 
    status: "success", 
    message: "สวัสดีครับ! นี่คือข้อมูลที่ดึงมาจาก Node.js Backend" 
  });
});

// 2. API สำหรับ สมัครสมาชิก (Register)
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // บันทึกลงฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // ✅ สร้าง JWT Token ให้ทันทีหลังสมัครสมาชิกสำเร็จ
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      status: "success",
      message: "สมัครสมาชิกและเข้าสู่ระบบสำเร็จแล้ว!",
      token: token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "เกิดข้อผิดพลาด หรือมี Username/Email นี้อยู่ในระบบแล้ว",
      detail: error.message
    });
  }
});

// 3. API สำหรับ เข้าสู่ระบบ (Login) - เพิ่มการสร้างและส่ง JWT Token กลับไป
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username: username }
    });

    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordCorrect) {
      return res.status(401).json({
        status: "error",
        message: "Username หรือ Password ไม่ถูกต้อง"
      });
    }

    // ✅ 2. สร้าง JWT Token (เก็บ id, username, email และตั้งหมดอายุใน 1 วัน)
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      status: "success",
      message: "เข้าสู่ระบบสำเร็จ!",
      token: token,
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในระบบ",
      detail: error.message
    });
  }
});

// 🛡️ 4. Middleware สำหรับตรวจบัตรผ่าน (Verify JWT Token)
// ใช้ดักหน้า API ที่สำคัญ เพื่อเช็กว่าผู้ใช้ส่ง Token มาถูกต้องหรือไม่
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // รูปแบบ Header จะส่งมาเป็น "Bearer <token>" เลยต้องตัดคำว่า Bearer ออกเพื่อเอาแต่ Token
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "กรุณาล็อกอินเพื่อเข้าใช้งาน (Token missing)"
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "สิทธิ์การเข้าใช้งานหมดอายุหรือ Token ไม่ถูกต้อง"
      });
    }
    req.user = decodedUser; // เก็บข้อมูลผู้ใช้ที่ถอดรหัสได้ใส่ใน req เพื่อให้ API ถัดไปใช้งานต่อได้
    next(); // ผ่านด่านตรวจ! ไปทำงานที่ API หลักต่อได้
  });
};

// 🔒 5. API ปลอดภัยสูง (Protected Route) - ใช้ทดสอบดึงข้อมูลโปรไฟล์ของตัวเอง
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    // ดึง id มาจากข้อมูลที่ถอดรหัสใน Middleware (req.user)
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลผู้ใช้งาน" });
    }

    res.json({
      status: "success",
      message: "ดึงข้อมูลโปรไฟล์สำเร็จ!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: "เกิดข้อผิดพลาดในการดึงโปรไฟล์", detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});