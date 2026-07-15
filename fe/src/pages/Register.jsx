import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // โยน { username, email, password } ไปหลังบ้าน
      });

      const data = await response.json();

      if (response.ok) {
        alert('สมัครสมาชิกและเข้าสู่ระบบสำเร็จ! 🎉');
        
        localStorage.setItem('token', data.token);

        console.log('ข้อมูลผู้ใช้ล็อกอินใหม่:', data.user);

        navigate('/'); 
      } else {
        alert(`สมัครสมาชิกไม่สำเร็จ: ${data.message}`);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้');
    }
  };

  return (
    <AuthForm
      title="สมัครสมาชิก"
      buttonText="สมัครสมาชิก"
      isRegister={true}
      onSubmit={handleRegisterSubmit}
      togglePath="/login"
      toggleText="มีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่"
    />
  );
};

export default Register;