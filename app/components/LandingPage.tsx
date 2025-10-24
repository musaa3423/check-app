'use client';

import { useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // استخدام رابط Vercel الحقيقي - يعمل على جميع الأجهزة
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://check-app-git-main-musaa3423s-projects.vercel.app';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Animated background patterns - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Main content container - EXTRA WIDE */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4">
        <div className="text-center space-y-12 animate-fade-in">
          {/* Logo Section - Extra Enhanced with Pulsing Effect */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              {/* Multiple glow layers for depth */}
              <div className="absolute -inset-8 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-500" />
              <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="شيّك Logo"
                  fill
                  className="object-contain drop-shadow-2xl filter group-hover:drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Main Tagline - Extra Enhanced Typography with Shadow */}
          <div className="space-y-8">
            <div className="relative">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 animate-gradient drop-shadow-lg" style={{ direction: 'rtl' }}>
                شيّك قبل تروح
              </h1>
              {/* Text shadow effect */}
              <div className="absolute inset-0 -z-10 blur-2xl opacity-30 text-6xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ direction: 'rtl' }}>
                شيّك قبل تروح
              </div>
            </div>
            
            {/* Subtitle - Enhanced with icon */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl">✨</span>
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-700 font-bold" style={{ direction: 'rtl' }}>
                تطبيقك الذكي لمعرفة حالة الكافيهات
              </p>
              <span className="text-4xl">✨</span>
            </div>
            
            {/* Description - Enhanced with better spacing */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium" style={{ direction: 'rtl' }}>
              اكتشف الكافيهات والمطاعم المتاحة بالقرب منك قبل الذهاب
            </p>
          </div>

          {/* Features Grid - Enhanced with Borders and Gradients */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            <div className="relative group bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-200/50 hover:border-teal-400/50">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ direction: 'rtl' }}>تحديثات فورية</h3>
                <p className="text-lg text-gray-600" style={{ direction: 'rtl' }}>بيانات حية كل 15 ثانية</p>
              </div>
            </div>
            
            <div className="relative group bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-blue-200/50 hover:border-blue-400/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🤖</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ direction: 'rtl' }}>ذكاء اصطناعي</h3>
                <p className="text-lg text-gray-600" style={{ direction: 'rtl' }}>تحليل دقيق للازدحام</p>
              </div>
            </div>
            
            <div className="relative group bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-indigo-200/50 hover:border-indigo-400/50">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ direction: 'rtl' }}>اقتراحات ذكية</h3>
                <p className="text-lg text-gray-600" style={{ direction: 'rtl' }}>أفضل الأماكن المتاحة</p>
              </div>
            </div>
          </div>

          {/* CTA Button - Extra Enhanced with Multiple Effects */}
          <div className="mt-20">
            <div className="relative inline-block">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              
              <button
                onClick={onStart}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative px-20 py-7 bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-600 hover:via-blue-700 hover:to-indigo-700 text-white text-3xl md:text-4xl font-extrabold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden border-4 border-white/20"
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors duration-300" />
                
                {/* Button content */}
                <span className="relative flex items-center gap-4">
                  <span>ابدأ الآن</span>
                  <svg 
                    className={`w-10 h-10 transform transition-transform duration-300 ${isHovered ? 'translate-x-[-12px]' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l-5 5 5 5" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Trust indicators - Enhanced with Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="text-3xl text-green-500">✓</span>
              <span className="text-xl font-semibold text-gray-700" style={{ direction: 'rtl' }}>مجاني بالكامل</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="text-3xl text-blue-500">✓</span>
              <span className="text-xl font-semibold text-gray-700" style={{ direction: 'rtl' }}>سهل الاستخدام</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <span className="text-3xl text-indigo-500">✓</span>
              <span className="text-xl font-semibold text-gray-700" style={{ direction: 'rtl' }}>دقة عالية</span>
            </div>
          </div>

          {/* QR Code Section - NEW */}
          <div className="mt-12">
            <button
              onClick={() => setShowQR(!showQR)}
              className="group relative px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-teal-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-teal-200 hover:border-teal-400"
            >
              <span className="flex items-center gap-3 text-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span style={{ direction: 'rtl' }}>
                  {showQR ? 'إخفاء رمز QR' : 'عرض رمز QR للموقع'}
                </span>
              </span>
            </button>

            {/* QR Code Display */}
            {showQR && (
              <div className="mt-8 flex flex-col items-center gap-6 animate-fade-in">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-teal-400">
                  <QRCodeSVG
                    value={siteUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#0d9488"
                    bgColor="#ffffff"
                  />
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg max-w-md">
                  <p className="text-lg text-gray-700 text-center font-semibold" style={{ direction: 'rtl' }}>
                    📱 امسح الرمز بكاميرا هاتفك للدخول للموقع
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {siteUrl}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating icons - Enhanced Decorative Elements */}
      <div className="absolute top-20 left-10 text-7xl opacity-15 animate-bounce" style={{ animationDuration: '3s' }}>☕</div>
      <div className="absolute bottom-20 right-10 text-7xl opacity-15 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>☕</div>
      <div className="absolute top-1/2 right-20 text-6xl opacity-15 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🍰</div>
      <div className="absolute top-1/3 left-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '2s' }}>🎯</div>
      <div className="absolute bottom-1/3 left-10 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '1.5s' }}>⚡</div>
      <div className="absolute top-40 right-32 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '0.8s' }}>🤖</div>
    </div>
  );
}
