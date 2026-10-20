import { useState, useEffect } from "react";
import type { Payment } from "../types";

type FormPaymentViewProps = {
    onSubmit: (amount: number, card: string) => void;
};

export default function FormPaymentView({ onSubmit }: FormPaymentViewProps) {

    const [paymentData, setPaymentData] = useState<Payment>({
        name: '',
        card: '',
        expiration: '',
        cvv: '',
        amount: 0,
        email: '',
        idUser: ''
    })

    const [paymentAmount, setPaymentAmount] = useState(0);

    const [errors, setErrors] = useState<Payment>({
        name: '',
        card: '',
        expiration: '',
        cvv: '',
        amount: 0,
        email: '',
        idUser: ''
    })

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token') || '';
        if (userData) {
            const user = JSON.parse(userData);
            setPaymentData(prevState => ({
                ...prevState,
                email: user.email,
                idUser: token
            }));
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPaymentData((prevState: Payment) => ({
            ...prevState,
            [id]: value
        }));

        setErrors({
            ...errors,
            [id]: ''
        })
    };

    const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;

        value = value.replace(/\D/g, ''); // Eliminar cualquier carácter que no sea un dígito

        if (value.length > 2) 
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;

        setPaymentData(prevState => ({
            ...prevState,
            expiration: value
        }));
        setErrors({
            ...errors,
            expiration: ''
        })
    }

    const validateForm = () => {
        let newErrors: Payment = { name: '', card: '', expiration: '', cvv: '', amount: '', email: '', idUser: '' };
        let isValid = true;

        if (!paymentData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
            isValid = false;
        }

        if (!paymentData.card.trim()) {
            newErrors.card = 'El número de tarjeta es obligatorio';
            isValid = false;
        }

        if (!paymentData.expiration.trim()) {
            newErrors.expiration = 'La fecha de vencimiento es obligatoria';
            isValid = false;
        } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiration)) {
            newErrors.expiration = 'La fecha de vencimiento debe tener el formato MM/AA';
            isValid = false;
        } else if (paymentData.expiration.length === 5) {
            const [month, year] = paymentData.expiration.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100; // Obtener los últimos dos dígitos del año actual
            const currentMonth = new Date().getMonth() + 1; // Los meses en JavaScript son base 0

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiration = 'La tarjeta ha expirado';
                isValid = false;
            }

            if (month < 1 || month > 12) {
                newErrors.expiration = 'Mes inválido';
                isValid = false;
            }

            if (year < currentYear || year > currentYear + 10) {
                newErrors.expiration = 'Año inválido';
                isValid = false;
            }
        }

        if (!paymentData.cvv.trim()) {
            newErrors.cvv = 'El CVV es obligatorio';
            isValid = false;
        } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
            newErrors.cvv = 'El CVV debe tener 3 o 4 dígitos';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = () => {
        if(validateForm()) {
            console.log('card: ', paymentData.card)
            onSubmit(paymentAmount, paymentData.card);

            localStorage.setItem('cardPayment', JSON.stringify({cardResponse: paymentData.card.slice(-4)}));
            localStorage.setItem('cvvPayment', JSON.stringify({cvvResponse: paymentData.cvv.slice(-3)}));
        }
    }

  return (
    <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="name">Nombre</label>
            <input 
                type="text" 
                id="name" 
                placeholder="Tu nombre"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleInputChange}
            />
            {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="card">Número de tarjeta</label>
            <input 
                type="number" 
                id="card" 
                placeholder="Número de tarjeta"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleInputChange}
            />
            {errors.card && <span className="text-red-500 text-xs font-semibold">{errors.card}</span>}
        </div>

        <div className="flex gap-2 mb-2">
            <div>
                <label htmlFor="expiration">Vencimiento</label>
                <input 
                    type="text" 
                    id="expiration" 
                    placeholder="MM/AA"
                    maxLength={5}
                    value={paymentData.expiration}
                    inputMode="numeric"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={handleExpirationChange}
                />
                {errors.expiration && <span className="text-red-500 text-xs font-semibold">{errors.expiration}</span>}  
            </div>
            <div>
                <label htmlFor="cvv">CVV</label>
                <input 
                    type="password" 
                    id="cvv" 
                    placeholder="CVV"
                    maxLength={4}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={handleInputChange}
                />
                {errors.cvv && <span className="text-red-500 text-xs font-semibold">{errors.cvv}</span>}
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount">Monto a cargar</label>
            <input
                type="number"
                id="amount"
                placeholder="Monto a cargar"
                min={1}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

        </div>

        <button
            type="submit"
            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            Cargar Saldo
        </button>
    </form>
  )
}
