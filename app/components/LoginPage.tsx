'use client';

import { useState } from 'react';

interface LoginPageProps {
  onLogin: (contact: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' 
        ? { email, password }
        : { email, password, name, phone };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'حدث خطأ');
        setLoading(false);
        return;
      }

      // Success - proceed to app
      onLogin(email);
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2" style={{ direction: 'rtl' }}>
          {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h2>
        <p className="text-center text-gray-600 mb-8" style={{ direction: 'rtl' }}>
          شيّك قبل تروح
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition ${
                mode === 'login'
                  ? 'bg-white shadow text-teal-600 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition ${
                mode === 'register'
                  ? 'bg-white shadow text-teal-600 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              حساب جديد
            </button>
          </div>

          {/* Name (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-2 text-right" style={{ direction: 'rtl' }}>
                الاسم (اختياري)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-right"
                style={{ direction: 'rtl' }}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 text-right" style={{ direction: 'rtl' }}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-left"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 text-right" style={{ direction: 'rtl' }}>
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-left"
              required
              minLength={6}
            />
            {mode === 'register' && (
              <p className="text-sm text-gray-500 mt-1 text-right" style={{ direction: 'rtl' }}>
                6 أحرف على الأقل
              </p>
            )}
          </div>

          {/* Phone (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-gray-700 mb-2 text-right" style={{ direction: 'rtl' }}>
                رقم الجوال (اختياري)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05xxxxxxxx"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-left"
              />
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-right bg-red-50 p-3 rounded-lg" style={{ direction: 'rtl' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'جاري التحميل...' : (mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب')}
          </button>
        </form>
      </div>
    </div>
  );
}
