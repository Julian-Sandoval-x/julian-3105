import { Wallet, CreditCard } from 'lucide-react'

export default function Saldo() {
  return (
    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <Wallet size={24} className="text-amber-600" />
            <h2 className="font-semibold uppercase text-gray-500">Saldo actual</h2>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
            <p className="text-4xl font-black">$0.00</p> 
            <span className="text-gray-400 font-semibold text-lg">MXN</span>
        </div>
        
        <button className="flex items-center justify-center gap-2 mt-20 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700
            w-full hover:cursor-pointer font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                <CreditCard size={20} />
            Cargar Saldo con SnailPay
        </button>
        
        <p className="text-gray-500 text-sm text-center mt-1">Transacción segura y simulada</p>
    </div>
  )
}
