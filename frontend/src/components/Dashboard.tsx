import Header from "./Header"
import Saldo from "./Saldo"
import GraficaBarra from "./BarChart"
import GraficaDonut from "./DonutChart"

export default function Main() {

  return (
    <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold">Bienvenido a SnailBet</h1>
            <p className="text-gray-600 text-sm">Resumen de tu cuenta y estadísticas de carreras</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <Saldo />
                <GraficaDonut />
            </div>

            <GraficaBarra />
        </div>
    </>
  )
}

