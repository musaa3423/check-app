'use client';

import { City } from '../types';
import Image from 'next/image';
import { useState } from 'react';

interface CitySelectionProps {
  onSelectCity: (city: City) => void;
}

const cities: City[] = ['عنيزة', 'بريدة', 'الرس', 'البكيرية'];

const cityImages: Record<City, string> = {
  'عنيزة': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop&q=80', // Traditional Saudi architecture
  'بريدة': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80', // Modern city skyline
  'الرس': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop&q=80', // Traditional buildings sunset
  'البكيرية': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop&q=80', // Town landscape
};

export default function CitySelection({ onSelectCity }: CitySelectionProps) {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 w-full max-w-7xl">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 animate-gradient" style={{ direction: 'rtl' }}>
              اختر مدينتك
            </h2>
            {/* Text shadow effect */}
            <div className="absolute inset-0 -z-10 blur-xl opacity-30 text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ direction: 'rtl' }}>
              اختر مدينتك
            </div>
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-600 font-medium" style={{ direction: 'rtl' }}>
            اكتشف أفضل الكافيهات في مدينتك
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-teal-400 rounded-full" />
            <div className="text-3xl">📍</div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-400 rounded-full" />
          </div>
        </div>

        {/* Cities Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => onSelectCity(city)}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              className="group relative overflow-hidden bg-white rounded-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl"
            >
              {/* City Image Background */}
              <div className="relative w-full h-64 md:h-72 lg:h-80">
                <Image
                  src={cityImages[city]}
                  alt={city}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    hoveredCity === city ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-teal-500/30 group-hover:via-blue-500/20 group-hover:to-indigo-500/30 transition-all duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              
              {/* City Name and Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* City Name */}
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 transform transition-all duration-300 group-hover:translate-y-[-4px]" style={{ direction: 'rtl' }}>
                  {city}
                </h3>
                
                {/* Subtitle - appears on hover */}
                <p className={`text-white/90 text-lg font-medium transition-all duration-300 ${
                  hoveredCity === city ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ direction: 'rtl' }}>
                  اضغط للاستكشاف
                </p>
                
                {/* Arrow indicator */}
                <div className={`absolute bottom-6 left-6 text-white text-3xl transition-all duration-300 ${
                  hoveredCity === city ? 'opacity-100 translate-x-[-8px]' : 'opacity-0'
                }`}>
                  ←
                </div>
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-50 to-blue-50 px-8 py-4 rounded-full shadow-md">
            <span className="text-2xl">✨</span>
            <p className="text-lg text-gray-700 font-semibold" style={{ direction: 'rtl' }}>
              {cities.length} مدن متاحة - المزيد قريباً
            </p>
            <span className="text-2xl">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
