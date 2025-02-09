import React from "react";
import { Activity } from "lucide-react";
import "@/public/styles/loading.css";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#04c8b1] via-[#058075] to-[#045e56]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-96 w-96 -left-48 -top-48 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute h-96 w-96 -right-48 -bottom-48 bg-white/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animado */}
        <div className="relative mb-8">
          <Activity className="w-16 h-16 text-white animate-pulse" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-white/30 rounded-full animate-spin-slow"></div>
        </div>

        {/* Barra de progreso pulsante */}
        <div className="w-48 h-1 mb-6 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full w-full bg-white/80 animate-progress-infinite transform"></div>
        </div>

        {/* Texto de carga con efecto de fade */}
        <div className="text-center space-y-2">
          <p className="text-white text-xl font-medium animate-fade-in">
            Cargando
            <span className="animate-bounce inline-block ml-1">.</span>
            <span className="animate-bounce inline-block ml-1 delay-100">.</span>
            <span className="animate-bounce inline-block ml-1 delay-200">.</span>
          </p>
          <p className="text-white/70 text-sm animate-fade-in delay-300">
            Preparando todo para ti
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoadingScreen;