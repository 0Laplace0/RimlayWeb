import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // โยน { username, password } ไปหา Server
      });

      const data = await response.json();

      if (response.ok) {
        alert('เข้าสู่ระบบสำเร็จ! 🎉');
        localStorage.setItem('token', data.token);
        navigate('/'); // นำทางไปหน้าแรก
      } else {
        alert(`เข้าสู่ระบบไม่สำเร็จ: ${data.message}`);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้');
    }
  };

  return (
    <AuthForm
      title="เข้าสู่ระบบ"
      buttonText="ล็อกอิน"
      onSubmit={handleLoginSubmit}
      togglePath="/register"
      toggleText="ยังไม่มีบัญชีใช่ไหม? สมัครสมาชิกที่นี่"
    />
  );
};

export default Login;