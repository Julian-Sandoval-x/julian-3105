import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserRoundPlus, CircleCheck } from "lucide-react";
import CardHeader from "./CardHeader";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        repeatPassword: ''
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

        if (formData.password !== formData.repeatPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const newUser = {
                name: formData.nombre,
                email: formData.email,
                password: formData.password
            }

            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.');
                return;
            }

            navigate('/login', { replace: true });

        } catch (err) {
            setError('Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.');
        }
    }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg flex flex-col items-center">
        <CardHeader
          title="Regístrate"
          subtitle="Completa los datos para registrarte"
          error={error}
        />

        <form action="" className="flex flex-col gap-4 mt-6 w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center w-full rounded-xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-emerald-500 focus-within::ring-2 focus-within::ring-emerald-500">
              <label htmlFor="nombre">
                  <User size={20}/>
              </label>
              <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  placeholder="Ingresa tu nombre completo" 
                  className="w-full min-w-0 border-0 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none focus:ring-0"
                  onChange={handleChange}
              />
          </div>

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

            <div>
            <p className="text-sm font-light text-slate-500 mb-2">
                La contraseña debe contener:
            </p>

                <ul className="list-none text-sm font-light text-slate-500">
                <li className="flex items-center">
                    <CircleCheck size={16} className="text-slate-500 mr-2" />
                    Al menos 8 caracteres
                </li>
                <li className="flex items-center">
                    <CircleCheck size={16} className="text-slate-500 mr-2" />
                    Al menos una letra mayúscula
                </li>
                <li className="flex items-center">
                    <CircleCheck size={16} className="text-slate-500 mr-2" />
                    Al menos un número
                </li>
                <li className="flex items-center">
                    <CircleCheck size={16} className="text-slate-500 mr-2" />
                    Al menos un carácter especial
                </li>
            </ul>
            </div>

          <div className="flex gap-3 items-center w-full rounded-xl border border-slate-300 bg-white px-4 py-4 transition focus-within:border-emerald-500 focus-within::ring-2 focus-within::ring-emerald-500">
              <label htmlFor="password">
                  <Lock size={20}/>
              </label>
              <input 
                  type="password" 
                  id="repeatPassword" 
                  name="repeatPassword" 
                  placeholder="Repite tu contraseña" 
                  className="w-full min-w-0 border-0 bg-transparent text-slate-700 placeholder:text-slate-400 outline-none focus:ring-0"
                  onChange={handleChange}
              />
          </div>
                
          <button 
                type="submit" 
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700
                    transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white
                    hover:cursor-pointer"
                >
                    <UserRoundPlus size={20} />
                    Regístrate
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-emerald-500 hover:text-emerald-700">Inicia sesión</Link>
        </p>
      </div>
    </main>
  )
}
