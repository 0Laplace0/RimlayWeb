# 🎮 Web Topup System (ระบบเติมเงิน)

ระบบเติมเงินและให้บริการเว็บแอปพลิเคชัน พัฒนาด้วย React, Node.js และ MySQL

---

## 🛠️ Tech Stack (เทคโนโลยีที่ใช้)

### 🎨 Frontend
* **Core Framework:** [React.js](https://react.dev/) (v18+)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/) (v6+)
* **Alerts & Popups:** [SweetAlert2](https://sweetalert2.github.io/)

### ⚙️ Backend
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** Express.js
* **Authentication:** JSON Web Token (JWT) / bcrypt

### 🗄️ Database
* **Database Engine:** [MySQL](https://www.mysql.com/)
* **ORM / Driver:** Prisma ORM / Sequelize *(เลือกใช้อย่างใดอย่างหนึ่ง)*

---

## 🚀 Features (ฟีเจอร์หลัก)

* 🧭 **Responsive Navigation:** Navbar นำทางไปยังหน้าต่าง ๆ ได้อย่างสะดวก
* 💳 **Payment Gateway Selection:** รองรับการเลือกเติมเงินผ่าน **QR PromptPay** และ **TrueMoney Wallet**
* 🔒 **Input Validation:** ป้องกันการกรอกข้อมูลผิดพลาด (ดักจับเลขติดลบ, ทศนิยม, และอักขระพิเศษ)
* 📱 **Fully Responsive Design:** แสดงผลสวยงามบนทุกขนาดหน้าจอ (Desktop, Tablet, Mobile) โดยไม่เกิด Scrollbar ส่วนเกิน
