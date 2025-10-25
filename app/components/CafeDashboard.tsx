'use client';

import { useEffect, useState } from 'react';
import { Cafe, City, CrowdLevel } from '../types';
import Image from 'next/image';

interface CafeDashboardProps {
  city: City;
  onChangeCity: () => void;
}

const crowdLevelColors: Record<CrowdLevel, string> = {
  busy: 'bg-red-500',
  moderate: 'bg-orange-500',
  empty: 'bg-green-500',
};

const crowdLevelText: Record<CrowdLevel, string> = {
  busy: 'زحمة',
  moderate: 'متوسط',
  empty: 'فاضي',
};

export default function CafeDashboard({ city, onChangeCity }: CafeDashboardProps) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchCrowdedness = async () => {
    try {
      const response = await fetch(`/api/crowdedness?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      
      if (data.cafes) {
        setCafes(data.cafes);
        setLastUpdate(new Date(data.timestamp));
      }
    } catch (error) {
      console.error('Error fetching crowdedness data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrowdedness();
    
    // Auto-refresh every 15 seconds for real-time updates
    const interval = setInterval(fetchCrowdedness, 15000);
    
    return () => clearInterval(interval);
  }, [city]);

  const suggestedCafes = cafes.filter(cafe => cafe.crowdLevel === 'empty');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 border-solid mx-auto mb-4"></div>
          <p className="text-xl text-gray-600" style={{ direction: 'rtl' }}>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onChangeCity}
              className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2"
            >
              <span>←</span>
              <span style={{ direction: 'rtl' }}>تغيير المدينة</span>
            </button>
            
            <h1 className="text-2xl font-bold text-gray-800" style={{ direction: 'rtl' }}>
              {city}
            </h1>
            
            <div className="text-sm text-gray-500 text-left">
              <div style={{ direction: 'rtl' }}>آخر تحديث:</div>
              <div>{lastUpdate.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Suggestions Section */}
        {suggestedCafes.length > 0 && (
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1 text-right" style={{ direction: 'rtl' }}>
                اقتراحات لك
              </h2>
              <p className="text-gray-600 text-right" style={{ direction: 'rtl' }}>
                كوفيهات فاضية ومتاحة الآن
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedCafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} isHighlighted />
              ))}
            </div>
          </section>
        )}

        {/* All Cafes Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right" style={{ direction: 'rtl' }}>
            جميع الكوفيهات
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </div>
        </section>

        {/* Real-time indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700" style={{ direction: 'rtl' }}>
              التحديثات الحية - يتم تحديث البيانات تلقائياً كل 15 ثانية
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-3" style={{ direction: 'rtl' }}>
            يستخدم التطبيق الذكاء الاصطناعي لتحليل حالة الازدحام بشكل مستمر ودقيق
          </p>
        </div>
      </div>
    </div>
  );
}

interface CafeCardProps {
  cafe: Cafe;
  isHighlighted?: boolean;
}

function CafeCard({ cafe, isHighlighted }: CafeCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105 ${
        isHighlighted ? 'ring-2 ring-green-400' : ''
      }`}
    >
      <div className="p-6">
        {/* Logo and Name */}
        <div className="flex items-center gap-4 mb-4">
          {/* Cafe Image - Enhanced with rounded corners and shadow */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
            <Image
              src={cafe.logo}
              alt={cafe.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 flex-1 text-right" style={{ direction: 'rtl' }}>
            {cafe.name}
          </h3>
        </div>

        {/* Status Text */}
        <div className="text-right mb-3">
          <span className="text-gray-600" style={{ direction: 'rtl' }}>
            الحالة: 
          </span>
          <span className={`font-semibold mr-2 ${
            cafe.crowdLevel === 'busy' ? 'text-red-600' :
            cafe.crowdLevel === 'moderate' ? 'text-orange-600' :
            'text-green-600'
          }`}>
            {crowdLevelText[cafe.crowdLevel]}
          </span>
        </div>

        {/* Crowd Level Indicator */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 right-0 ${crowdLevelColors[cafe.crowdLevel]} rounded-full transition-all`}
          />
        </div>
      </div>
    </div>
  );
}
