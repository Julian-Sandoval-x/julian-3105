import { useState } from 'react';
import Modal from './Modal';
import LoadingPaymentView from './LoadingPaymentView';
import { X, Wallet, CreditCard, Check, CircleAlert } from 'lucide-react'
import FormPaymentView from './FormPaymentView';

type PaymentView = 'form' | 'loading' | 'success' | 'error_tx' | 'error_system';

export default function Saldo() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentView, setPaymentView] = useState<PaymentView>('form');

    const amount = parseFloat(localStorage.getItem('saldo') || '0').toFixed(2);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setPaymentView('form');
        }, 300);
    }

    const handlePayment = async (amountToChange: number) => {
        setPaymentView('loading');

        try {
            const response = await fetch('http://localhost:3000/api/payment', {
                body: JSON.stringify({ amount: amountToChange }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await new Promise(resolve => setTimeout(resolve, 2000));
            if (response.ok) {
                setPaymentView('success');
                localStorage.setItem('saldo', (parseFloat(localStorage.getItem('saldo') || '0') + amountToChange).toString());
            } else {
                setPaymentView('error_tx');
            }
        } catch (error) {
            setPaymentView('error_system');
            console.error('Error en la transacción:', error);
        }
    }

    const renderPaymentContent = () => {
        switch (paymentView) {
            case 'form':
                return <FormPaymentView 
                    onSubmit={handlePayment}
                />
            case 'loading':
                return <LoadingPaymentView />
            case 'success':
                return (
                    <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                        <Check size={80} className="text-emerald-600" />
                        <h3 className="text-lg font-semibold text-gray-700">¡Pago exitoso!</h3>
                        <p className="text-gray-500">Tu saldo ha sido cargado correctamente.</p>
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
                        <h3 className="text-lg font-semibold text-gray-700">Error en la transacción</h3>
                        <p className="text-gray-500">Ha ocurrido un error al procesar tu pago. Por favor, inténtalo de nuevo.</p>
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
                            <h3 className="text-xl font-bold text-slate-800">Error del Sistema</h3>
                            <p className="text-slate-600 mt-2">No pudimos conectar con la pasarela de pagos. Por favor, inténtalo de nuevo más tarde.</p>
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
    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <Wallet size={24} className="text-amber-600" />
            <h2 className="font-semibold uppercase text-gray-500">Saldo actual</h2>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
            <p className="text-4xl font-black">${amount}</p> 
            <span className="text-gray-400 font-semibold text-lg">MXN</span>
        </div>
        
        <button className="flex items-center justify-center gap-2 mt-20 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700
            w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setIsModalOpen(true)}
        >
            <CreditCard size={20} />
            Cargar Saldo con SnailPay
        </button>
        <p className="text-gray-500 text-sm text-center mt-1">Transacción segura y simulada</p>

        <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        >
            {renderPaymentContent()}
        </Modal>
    </div>
  )
}
