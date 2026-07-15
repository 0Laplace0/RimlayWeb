import { Link } from 'react-router-dom';
import logo from '../assets/hero.png';

const Navbar = () => {
    const navLinks = [
        { name: 'หน้าหลัก', href: '/' },
        { name: 'ร้านค้า', href: '#' },
        { name: 'ร้านค้ายอดสะสม', href: '#' },
        { name: 'ติดต่อเรา', href: '#' },
    ];

    return (
        <div className="w-full">
            <nav className="w-full">
                <div className="w-full bg-[#0b0b0d] border-b border-amber-600/60 flex items-center justify-between px-8 py-4 shadow-2xl">
                    
                    <Link to="/" className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Moon City Logo" 
                            className="h-12 w-auto object-contain cursor-pointer" 
                        />
                    </Link>

                    <div className="flex items-center space-x-8 text-sm font-medium text-gray-300">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.href} 
                                className="hover:text-amber-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <Link to="/login" className="flex items-center space-x-1.5 font-semibold text-amber-500">
                            <span className="text-gray-200 hover:text-amber-500 transition-colors">เข้าสู่ระบบ</span>
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;