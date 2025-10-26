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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-teal-700 to-teal-800 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="شيّك Logo"
                fill
                className="object-contain p-12"
                priority
              />
            </div>
          </div>
          
          {/* Main Tagline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-900" style={{ direction: 'rtl' }}>
              شيّك الذكي لمعرفه حالة الكافيهات
            </h1>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto mt-8">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl shadow-md border border-teal-200">
              <h3 className="text-xl font-bold text-teal-900 mb-2" style={{ direction: 'rtl' }}>تحديثات فورية</h3>
              <p className="text-base text-teal-700" style={{ direction: 'rtl' }}>بيانات حية كل 15 ثانية</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl shadow-md border border-emerald-200">
              <h3 className="text-xl font-bold text-teal-900 mb-2" style={{ direction: 'rtl' }}>ذكاء اصطناعي</h3>
              <p className="text-base text-teal-700" style={{ direction: 'rtl' }}>تحليل دقيق للازدحام</p>
            </div>
          </div>

          {/* QR Code Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full max-w-md mx-auto px-8 py-4 bg-white text-teal-800 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-teal-200 hover:border-teal-400 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span className="text-lg" style={{ direction: 'rtl' }}>عرض رمز QR للموقع</span>
            </button>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <button
              onClick={onStart}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative w-full max-w-md mx-auto px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-2xl font-bold rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative flex items-center justify-center gap-3">
                <span style={{ direction: 'rtl' }}>سجل دخولك</span>
                <svg 
                  className={`w-7 h-7 transform transition-transform duration-300 ${isHovered ? 'translate-x-[-8px]' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l-5 5 5 5" />
                </svg>
              </span>
            </button>
          </div>

          {/* Footer tagline */}
          <div className="mt-12">
            <p className="text-2xl font-bold text-teal-800" style={{ direction: 'rtl' }}>
              - شيّك قبل تروح -
            </p>
          </div>

          {/* QR Code Display */}
          {showQR && (
            <div className="mt-8 flex flex-col items-center gap-6 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-teal-500">
                <QRCodeSVG
                  value={siteUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                  fgColor="#0d9488"
                  bgColor="#ffffff"
                />
              </div>
              <div className="bg-teal-50 px-8 py-4 rounded-2xl shadow-lg max-w-md border-2 border-teal-200">
                <p className="text-lg text-teal-900 text-center font-semibold" style={{ direction: 'rtl' }}>
                  امسح الرمز بكاميرا هاتفك للدخول للموقع
                </p>
                <p className="text-sm text-teal-600 text-center mt-2">
                  {siteUrl}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
