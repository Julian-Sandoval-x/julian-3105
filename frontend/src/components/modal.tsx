import { X, CircleDollarSign } from 'lucide-react'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({isOpen, onClose, children}: ModalProps) {

    if (!isOpen) 
        return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-200">
                <h2 className="flex items-center text-lg text-slate-800">
                   <CircleDollarSign size={20} className="inline mr-2" />
                    <span className="font-bold">Snail</span>Pay Secure
                </h2> 
                
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-md transition-colors hover:cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
  )
}
