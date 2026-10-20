import { User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    const loggedUser = localStorage.getItem('user');
    const username = loggedUser ? JSON.parse(loggedUser).name : 'Usuario';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });

    }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                        <img 
                            src="../../img/snail_icon.png" 
                            alt="Logotipo SnailBet" 
                            className="w-8 h-8"
                            />
                    </div>
                    <span className="text-xl font-bold text-emerald-700 tracking-tight">SnailBet</span>
                </div>
            
            
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 py-1.5 px-3 rounded-full
                        hover:bg-gray-200 transition-colors">
                            <User size={16} className="text-gray-500" />
                        <button className="hover:cursor-pointer">
                            {username}
                        </button>
                    </div>
                    <button 
                        className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-4
                            rounded-lg transition-colors border border-transparent hover:border-red-100 hover:cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} className="text-red-500" />
                        Cerrar sesion
                    </button>
                </div>
            </div>
        </div>
    </nav>
  )
}
