import {useState, useEffect} from 'react'

export default function LoadingPaymentView() {

    const [loadingText, setLoadingText] = useState('Conectando con el banco...');

    useEffect(() => {
        const texts = [
            "Conectando con el banco...",
            "Validando la credenciales...",
            "Autorizando transacción...",
            "Asegurando tu pago..."
        ];

        let index = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[index]);
            index = (index + 1) % texts.length;
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="relative flex items-center justify-center mb-8 h-24 w-24">
            <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-emerald-200 rounded-full animate-pulse opacity-50"></div>
            <div className="relative z-10 bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center h-16 w-16">
                <span className="text-3xl relative top-1 hover:cursor-default" role="img" aria-label="snail">🐌</span>
            </div>
        </div>

        <h3 className="text-lg font=bold text-slate-800 mb-2">
            {loadingText}
        </h3>

        <p className="text-slate-500 text-sm text-center">
            Por favor, no cierres esta ventana ni recargues la página mientras procesamos tu pago. Esto puede tardar unos segundos.
        </p>
    </div>
  )
}
