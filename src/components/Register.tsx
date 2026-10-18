import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true });
        }
    }, [navigate])

  return (
    <div>Register</div>
  )
}
