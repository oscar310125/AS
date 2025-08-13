import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-sm"
              style={{
                animationDelay: `${i * 50}ms`,
                animationDuration: '3s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Gradient Waves */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-gradient-x"></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 border border-cyan-500/20 animate-pulse"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-bounce"></div>
    </div>
  );
}