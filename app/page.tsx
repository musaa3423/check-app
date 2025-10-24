'use client';

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CitySelection from './components/CitySelection';
import CafeDashboard from './components/CafeDashboard';
import { City } from './types';

type AppState = 'landing' | 'login' | 'city-selection' | 'dashboard';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userContact, setUserContact] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Remove any browser overlays or notification badges
  useEffect(() => {
    const hideOverlays = () => {
      // Hide any fixed/absolute positioned elements in bottom-left corner
      const allElements = document.querySelectorAll('*');
      allElements.forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        
        if (style.position === 'fixed' || style.position === 'absolute') {
          const rect = htmlEl.getBoundingClientRect();
          // Check if element is in bottom-left corner (bottom 150px, left 150px)
          if (rect.bottom > window.innerHeight - 150 && 
              rect.left < 150 && 
              !htmlEl.closest('#__next')) {
            // Hide elements that are not part of our app
            htmlEl.style.display = 'none';
          }
        }
      });
    };

    // Run on mount and after a short delay
    hideOverlays();
    const timer = setTimeout(hideOverlays, 1000);
    
    // Run periodically to catch dynamically added elements
    const interval = setInterval(hideOverlays, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleStart = () => {
    setAppState('login');
  };

  const handleLogin = (contact: string) => {
    setUserContact(contact);
    setAppState('city-selection');
  };

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setAppState('dashboard');
  };

  const handleChangeCity = () => {
    setAppState('city-selection');
  };

  return (
    <>
      {appState === 'landing' && <LandingPage onStart={handleStart} />}
      {appState === 'login' && <LoginPage onLogin={handleLogin} />}
      {appState === 'city-selection' && <CitySelection onSelectCity={handleSelectCity} />}
      {appState === 'dashboard' && selectedCity && (
        <CafeDashboard city={selectedCity} onChangeCity={handleChangeCity} />
      )}
    </>
  );
}
