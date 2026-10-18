import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserRoundPlus } from "lucide-react";
import CardHeader from "./CardHeader";

export default function Login(): React.JSX.Element {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
                return;
            }

            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirigir al usuario a la página principal
            navigate('/', { replace: true });

        } catch (error) {
            console.error("Error en el servidor: ", error);
            setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg flex flex-col items-center">
            <CardHeader 
                title="Inicia sesión"
                subtitle="Ingresa tus credenciales para acceder a tu cuenta"
                error={error}
            />

            <form action="" className="flex flex-col gap-4 mt-6 w-full max-w-sm" onSubmit={handleSubmit}>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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

            <Link to="/register" className="text-sm text-emerald-500 hover:text-emerald-700 flex items-center gap-2
                hover:cursor-pointer">
                <UserRoundPlus size={20} />
                Regístrate aquí
            </Link>

        </div>
    </main>
  )
}
