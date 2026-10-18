import { Activity } from 'lucide-react'

export default function GraficaDonut() {
  return (
    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <Activity size={24} className="text-emerald-600" />
            <h2 className="font-semibold uppercase text-gray-500">Apuestas (Historial)</h2>
        </div>
    </div>
  )
}
