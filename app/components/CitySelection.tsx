'use client';

import { City } from '../types';
import Image from 'next/image';
import { useState } from 'react';

interface CitySelectionProps {
  onSelectCity: (city: City) => void;
}

const cities: City[] = ['عنيزة', 'بريدة', 'الرس', 'البكيرية'];

const cityImages: Record<City, string> = {
  'عنيزة': '/cities/unaizah.jpg',
  'بريدة': '/cities/buraidah.jpg',
  'الرس': '/cities/ar-rass.jpg',
  'البكيرية': '/cities/al-bukayriyah.jpg',
};

export default function CitySelection({ onSelectCity }: CitySelectionProps) {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-4 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-green-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-6xl">
        {/* Header Section - Enhanced */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="relative inline-block mb-3 sm:mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 animate-gradient" style={{ direction: 'rtl' }}>
              اختر منطقتك
            </h2>
            {/* Text shadow effect */}
            <div className="absolute inset-0 -z-10 blur-xl opacity-30 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 bg-clip-text text-transparent" style={{ direction: 'rtl' }}>
              اختر منطقتك
            </div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium" style={{ direction: 'rtl' }}>
            اكتشف أفضل الكافيهات في منطقتك
          </p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
            <div className="h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent to-emerald-400 rounded-full" />
            <div className="h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent to-green-400 rounded-full" />
          </div>
        </div>

        {/* Cities Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => onSelectCity(city)}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              className="group relative overflow-hidden bg-white rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl"
            >
              {/* City Image Background */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-green-500/0 to-teal-500/0 group-hover:from-emerald-500/30 group-hover:via-green-500/20 group-hover:to-teal-500/30 transition-all duration-500" />
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              
              {/* City Name and Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                {/* City Name */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1 sm:mb-2 transform transition-all duration-300 group-hover:translate-y-[-2px] sm:group-hover:translate-y-[-4px]" style={{ direction: 'rtl' }}>
                  {city}
                </h3>
                
                {/* Subtitle - appears on hover */}
                <p className={`text-white/90 text-base sm:text-lg font-medium transition-all duration-300 ${
                  hoveredCity === city ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:translate-y-4'
                }`} style={{ direction: 'rtl' }}>
                  اضغط للاستكشاف
                </p>
                
                {/* Arrow indicator */}
                <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white text-2xl sm:text-3xl transition-all duration-300 ${
                  hoveredCity === city ? 'opacity-100 translate-x-[-4px] sm:translate-x-[-8px]' : 'opacity-0'
                }`}>
                </div>
              </div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 border-2 sm:border-4 border-transparent group-hover:border-white/30 rounded-xl sm:rounded-2xl transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-6 sm:mt-8 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full shadow-md">
            <p className="text-base sm:text-lg text-gray-700 font-semibold" style={{ direction: 'rtl' }}>
              {cities.length} محافظات متاحة - المزيد قريباً
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}