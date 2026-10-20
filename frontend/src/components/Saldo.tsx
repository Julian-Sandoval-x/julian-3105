import { useState } from 'react';
import type { PaymentView } from '../types';
import Modal from './modal';
import LoadingPaymentView from './LoadingPaymentView';
import FormPaymentView from './FormPaymentView';
import { X, Wallet, CreditCard, Check, CircleAlert } from 'lucide-react'

export default function Saldo() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentView, setPaymentView] = useState<PaymentView>({view: 'form', message: '', title: ''});

    const amount = parseFloat(localStorage.getItem('saldo') || '0').toFixed(2);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setPaymentView({view: 'form', message: '', title: ''});
        }, 300);
    }

    const handlePayment = async (amountToChange: number, card: string) => {
        setPaymentView({view: 'loading', message: '', title: ''});

        try {
            const id = localStorage.getItem('id');
            const user = localStorage.getItem('user');
            const email = user ? JSON.parse(user).email : null;
            const response = await fetch(`${API_URL}/api/payment`, {
                body: JSON.stringify({ 
                    id,
                    email,
                    amount: amountToChange,
                    card
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if(!response.ok) {
                setPaymentView({view: 'error_system', message: data.status_detail, title: 'Error en la transacción'});
                console.error('Error en la transacción:', data.status_detail);
                return;
            }

            if (data.status === 'success') {
                const currentSaldo = parseFloat(localStorage.getItem('saldo') || '0');
                const newSaldo = currentSaldo + amountToChange;
                localStorage.setItem('saldo', newSaldo.toString());
                setPaymentView({view: 'success', message: data.status_detail, title: data.title});
            }

            if (data.status === 'transaction_failed') {
                setPaymentView({view: 'error_tx', message: data.status_detail, title: data.title});
            }

            if (data.status === 'network_error') {
                setPaymentView({view: 'error_system', message: data.status_detail, title: data.title});
            }

            if (data.status === 'insufficient_funds') {
                setPaymentView({view: 'error_system', message: data.status_detail, title: data.title});
            }
        } catch (error) {
            setPaymentView({view: 'error_system', message: 'Error en la transacción.', title: 'Error en la transacción'});
            console.error('Error en la transacción:', error);
        }
    }

    const renderPaymentContent = () => {
        switch (paymentView.view) {
            case 'form':
                return <FormPaymentView 
                    onSubmit={(amount, card) => {handlePayment(amount, card)}}
                />
            case 'loading':
                return <LoadingPaymentView />
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                        <Check size={80} className="text-emerald-600" />
                        <h3 className="text-lg font-semibold text-gray-700">{paymentView.title}</h3>
                        <p className="text-gray-500">{paymentView.message}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"  
                        >
                            Cerrar
                        </button>
                    </div>
                )
            case 'error_tx':
                return (
                    <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                        <X size={80} className="text-red-500" />
                        <h3 className="text-lg font-semibold text-gray-700">{paymentView.title}</h3>
                        <p className="text-gray-500">{paymentView.message}</p>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"  
                        >
                            Cerrar
                        </button>
                    </div>
                )
            case 'error_system':
                return (
                    <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                        <CircleAlert size={80} className="text-red-500" />
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">{paymentView.title}</h3>
                            <p className="text-slate-600 mt-2">{paymentView.message}</p>
                        </div>
                        <button onClick={handleCloseModal} className="mt-4 w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 hover:cursor-pointer">
                            Cerrar
                        </button>
                    </div>
                )
            default:
                return null;
        }
    }

  return (
    <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Wallet size={24} className="text-amber-600" />
                <h2 className="font-semibold uppercase text-gray-500">Saldo actual</h2>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
                <p className="text-4xl font-black">${amount}</p> 
                <span className="text-gray-400 font-semibold text-lg">MXN</span>
            </div>
            
            <button className="flex items-center justify-center gap-2 md:mt-30  bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700
                w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setIsModalOpen(true)}
                name="open-modal"
            >
                <CreditCard size={20} />
                Cargar Saldo con SnailPay
            </button>
            <p className="text-gray-500 text-sm text-center mt-1">Transacción segura y simulada</p>

        </div>
        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        >
            {renderPaymentContent()}
        </Modal>
    </div>
  )
}
