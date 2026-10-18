import { Mail, Lock, LogIn } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(): React.JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate])

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 shadow-lg">
            <div className="bg-emerald-100 p-3 rounded-lg">
                <span className="text-4xl" role="img" aria-label="snail">🐌</span>
            </div>
            <h1 className="mb-5 text-emerald-600 font-bold text-4xl">SnailBet</h1>

            <h2 className="text-3xl font-semibold">Iniciar sesión</h2>
            <p className="text-slate-500">Ingresa a tu cuenta para continuar</p>

            <form action="" className="flex flex-col gap-4 mt-6 w-full max-w-sm">
                <div className="flex gap-3 items-center w-full rounded-xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-emerald-500 focus-within::ring-2 focus-within::ring-emerald-500">
                    <label htmlFor="email">
                        <Mail size={20}/>
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Ingresa tu correo electrónico" 
                        className="w-full min-w-0 border-0 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none focus:ring-0"
                    />
                </div>

                <div className="flex gap-3 items-center w-full rounded-xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-emerald-500 focus-within::ring-2 focus-within::ring-emerald-500">
                    <label htmlFor="password">
                        <Lock size={20}/>
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Ingresa tu contraseña" 
                        className="w-full min-w-0 border-0 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none focus:ring-0"
                    />
                </div>

                
                <button 
                    type="submit" 
                    className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700
                        transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white
                        hover:cursor-pointer">
                        <LogIn size={20} />
                        Iniciar sesión
                    </button>
            </form>

            <div className="flex items-center gap-6 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-slate-500 whitespace-nowrap hover:cursor-pointer">¿No tienes una cuenta?</span>
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <a href=""></a>
        </div>
    </>
  )
}
