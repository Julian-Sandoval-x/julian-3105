import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { randomBets } from '../utils/randomCalculations'; 
import type { Bet } from '../types';

export default function GraficaDonut() {

  const COLOR_WIN = '#059669'; 
  const COLOR_LOSS = '#f87171'; 

  const [betWinner, setBetWinner] = useState<Bet>({ name: 'Ganadas', Points: 0 });
  const [betLoser, setBetLoser] = useState<Bet>({ name: 'Perdidas', Points: 0 });

  useEffect(() => {
    const wins = randomBets();
    const losses = 100 - wins;
    setBetWinner({ Points: wins, name: 'Ganadas' });
    setBetLoser({ Points: losses, name: 'Perdidas' });
  }, []);

  return (
    <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <Activity size={24} className="text-emerald-600" />
            <h2 className="font-semibold uppercase text-gray-500">Apuestas (Historial)</h2>
        </div>

        <div className="h-64 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[betWinner, betLoser]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="Points"
                nameKey="name"
              >
                <Cell key="Ganadas" fill={COLOR_WIN} />
                <Cell key="Perdidas" fill={COLOR_LOSS} />
              </Pie>

              <Tooltip 
                formatter={(value, name) => [value, name]}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />

              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: '14px', color: '#64748b'}}
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}
