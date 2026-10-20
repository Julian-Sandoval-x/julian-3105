import { useEffect, useState } from 'react';
import type { Snail } from '../types';
import { randomWinners }from '../utils/randomCalculations';
import { TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


export default function GraficaBarra() {

  const [dataRace, setDataRace] = useState<Snail[]>([]);

  const quantityRace = 6;

  const handleGenerateWinners = () => {
    const result = randomWinners(quantityRace);
    setDataRace(result);
  }

  useEffect(() => {
    handleGenerateWinners();
  }, [])

  return (
    <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} className="text-emerald-600" />
          <h2 className="font-semibold uppercase text-gray-500">Victorias del día (Total de carreras: {quantityRace})</h2>
        </div>

      <div className="h-72 w-full mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dataRace} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10}/>
              <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />

              <Tooltip 
                cursor={{ fill:'#f1f5f9'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />

              <Bar
                dataKey="victoryPoints"
                name="Victorias"
                fill="#059669"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />

          </BarChart>
        </ResponsiveContainer>
      </div>
   
    </div>
  )
}
