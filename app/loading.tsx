export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#04c8b1] to-[#058075]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75 mb-4"></div>
                <p className="text-white text-lg font-medium">Cargando, por favor espera...</p>
            </div>
        </div>
    )
}