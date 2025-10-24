# شيّك - CHECK App 🚀

<div dir="rtl">

تطبيق ذكي لمعرفة حالة ازدحام الكافيهات والمطاعم قبل الذهاب إليها، مع تحديثات فورية كل 15 ثانية باستخدام الذكاء الاصطناعي.

</div>

---

## ✨ المميزات | Features

<div dir="rtl">

- 🤖 **ذكاء اصطناعي**: تحليل دقيق لحالة الازدحام بشكل مستمر
- ⚡ **تحديثات فورية**: بيانات حية كل 15 ثانية
- 🏙️ **4 مدن**: عنيزة، بريدة، الرس، البكيرية
- ☕ **18 كافيه ومطعم**: تغطية شاملة
- 🎯 **اقتراحات ذكية**: معرفة الأماكن الفاضية مباشرة
- 🔐 **نظام مصادقة**: تسجيل دخول آمن
- 📱 **تصميم متجاوب**: يعمل على جميع الأجهزة
- 🌍 **واجهة عربية**: دعم كامل للغة العربية (RTL)

</div>

---

## 🚀 بداية سريعة | Quick Start

### التشغيل المحلي | Local Development

```bash
# 1. استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/check-app.git
cd check-app

# 2. تثبيت الحزم
npm install

# 3. تشغيل السيرفر
npm run dev

# 4. افتح المتصفح
# http://localhost:3000
```

---

## 📦 التقنيات المستخدمة | Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Cairo (Google Fonts)
- **Images**: Unsplash API
- **Build Tool**: Turbopack
- **Deployment**: Vercel Ready

---

## 🏗️ هيكل المشروع | Project Structure

```
check-app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/              # Authentication endpoints
│   │   └── crowdedness/       # Crowd data endpoint
│   ├── components/            # React Components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── CitySelection.tsx
│   │   └── CafeDashboard.tsx
│   ├── lib/                   # Utilities
│   │   ├── auth.ts           # Authentication logic
│   │   ├── auth-vercel.ts    # Vercel-compatible auth
│   │   └── crowdedness.ts    # AI crowd analysis
│   ├── types/                # TypeScript types
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── public/                    # Static assets
├── docs/                      # Documentation (*.md files)
├── vercel.json               # Vercel configuration
├── next.config.ts            # Next.js config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

---

## 🌐 النشر على Vercel | Deploy to Vercel

### طريقة سريعة (من الموقع):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/check-app)

### طريقة CLI:

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

<div dir="rtl">

**للتفاصيل الكاملة**: اقرأ [`VERCEL_QUICK_GUIDE_AR.md`](./VERCEL_QUICK_GUIDE_AR.md)

</div>

---

## ⚙️ متغيرات البيئة | Environment Variables

<div dir="rtl">

أنشئ ملف `.env.local`:

</div>

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=your-secret-key-here
```

<div dir="rtl">

**للإنتاج على Vercel**: أضف المتغيرات في Settings > Environment Variables

</div>

---

## 📱 لقطات الشاشة | Screenshots

<div dir="rtl">

### الصفحة الرئيسية
- تصميم احترافي واسع
- رسوم متحركة سلسة
- دعوة واضحة للبدء

### اختيار المدينة  
- صور حقيقية جميلة
- 4 أعمدة على الشاشات الكبيرة
- تأثيرات hover مذهلة

### لوحة الكافيهات
- عرض جميع الكافيهات
- مؤشرات الازدحام بالألوان (أحمر/برتقالي/أخضر)
- اقتراحات ذكية للأماكن الفاضية
- تحديثات تلقائية كل 15 ثانية

</div>

---

## 🔐 نظام المصادقة | Authentication

<div dir="rtl">

### الوضع المحلي (Local):
- تخزين في ملف `users.json`
- يعمل بشكل كامل
- البيانات محفوظة

### الوضع على Vercel:
- ⚠️ التخزين المحلي لا يعمل (serverless)
- ✅ استخدم Vercel KV أو Supabase
- 📖 راجع `VERCEL_DEPLOYMENT_GUIDE.md`

</div>

---

## 🎨 التخصيص | Customization

### إضافة مدينة جديدة:

```typescript
// في app/components/CitySelection.tsx
const cities: City[] = ['عنيزة', 'بريدة', 'الرس', 'البكيرية', 'المدينة_الجديدة'];
```

### إضافة كافيه:

```typescript
// في app/lib/crowdedness.ts
const allCafes = [
  // ... الكافيهات الموجودة
  {
    id: '19',
    name: 'الكافيه الجديد',
    logo: 'URL_الصورة',
    city: 'اسم_المدينة'
  }
];
```

---

## 📚 التوثيق | Documentation

<div dir="rtl">

- 📖 [`QUICKSTART.md`](./QUICKSTART.md) - بداية سريعة
- 🚀 [`VERCEL_QUICK_GUIDE_AR.md`](./VERCEL_QUICK_GUIDE_AR.md) - نشر على Vercel (سريع)
- 📘 [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) - نشر على Vercel (شامل)
- 🔧 [`PROJECT_INFO.md`](./PROJECT_INFO.md) - معلومات المشروع
- 🎯 [`NEW_FEATURES_GUIDE.md`](./NEW_FEATURES_GUIDE.md) - دليل الميزات
- 🔐 [`AUTHENTICATION_FIX.md`](./AUTHENTICATION_FIX.md) - نظام المصادقة
- 🏙️ [`CITY_SELECTION_ENHANCEMENTS.md`](./CITY_SELECTION_ENHANCEMENTS.md) - تحسينات صفحة المدن

</div>

---

## 🧪 الاختبار | Testing

```bash
# اختبار البناء
npm run build

# تشغيل النسخة المبنية
npm start

# فحص TypeScript
npx tsc --noEmit

# فحص ESLint
npm run lint
```

---

## 🐛 حل المشاكل | Troubleshooting

### المشكلة: الصور لا تُحمّل

<div dir="rtl">

**الحل**: تأكد من `next.config.ts`:

</div>

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

### المشكلة: خطأ في تسجيل الدخول على Vercel

<div dir="rtl">

**الحل**: استخدم قاعدة بيانات (Vercel KV أو Supabase)

</div>

---

## 🤝 المساهمة | Contributing

<div dir="rtl">

المساهمات مرحب بها! لإضافة ميزة جديدة:

</div>

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

---

## 📄 الترخيص | License

<div dir="rtl">

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

</div>

---

## 👨‍💻 المطور | Developer

<div dir="rtl">

تطوير: **فريق شيّك**

للتواصل والاستفسارات:
- 📧 البريد الإلكتروني: info@check-app.com
- 🌐 الموقع: https://check-app.vercel.app

</div>

---

## 🙏 شكر وتقدير | Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment Platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Unsplash](https://unsplash.com/) - Professional Photos
- [Google Fonts](https://fonts.google.com/) - Cairo Font

---

## 📊 الإحصائيات | Stats

<div dir="rtl">

- ⭐ المدن: 4
- ☕ الكافيهات: 18
- ⚡ سرعة التحديث: 15 ثانية
- 📱 دعم الأجهزة: 100%
- 🌍 اللغات: العربية
- 🎨 الثيمات: Light Mode

</div>

---

## 🗺️ خارطة الطريق | Roadmap

<div dir="rtl">

- [ ] إضافة مدن جديدة
- [ ] دعم اللغة الإنجليزية
- [ ] تطبيق موبايل (React Native)
- [ ] إشعارات فورية
- [ ] نظام تقييمات
- [ ] خرائط تفاعلية
- [ ] حجز طاولات
- [ ] قوائم الطعام

</div>

---

<div align="center" dir="rtl">

**شيّك قبل تروح** 🚀

**تطبيقك الذكي لمعرفة حالة الكافيهات**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>
