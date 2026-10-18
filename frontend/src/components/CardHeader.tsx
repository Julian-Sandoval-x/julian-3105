type CardHeaderProps = {
    title: string;
    subtitle: string;
    error?: string;
}

export default function CardHeader({ title, subtitle, error }: CardHeaderProps) {
  return (
    <>
        <div className="bg-emerald-100 p-3 rounded-lg text-center">
          <span className="text-4xl" role="img" aria-label="snail">🐌</span>
        </div>

        <h1 className="mb-5 text-emerald-600 font-bold text-4xl">SnailBet</h1>

        <h2 className="text-3xl font-semibold mb-1">{title}</h2>
        <p className="text-slate-500">{subtitle}</p>

        {error && 
            <div className="mt-4 bg-red-300 border border-l-5 border-r-0 border-b-0 border-t-0 border-red-700 px-4 py-3 rounded relative w-full max-w-sm" role="alert">
                <span className="block sm:inline text-white">{error}</span>
            </div>
        }
    </>
  )
}
