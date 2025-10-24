# دليل نشر تطبيق شيّك على Vercel 🚀

## نظرة عامة | Overview

هذا الدليل يشرح كيفية نشر تطبيق "شيّك" على منصة Vercel بالتفصيل.

---

## المتطلبات الأساسية | Prerequisites

### 1. حساب Vercel
- اذهب إلى [vercel.com](https://vercel.com)
- سجّل حساب جديد (مجاني)
- استخدم GitHub أو GitLab أو Bitbucket

### 2. Git Repository
```bash
# إذا لم تكن قد أنشأت Git repository بعد:
cd check-app
git init
git add .
git commit -m "Initial commit - شيّك App"
```

### 3. رفع المشروع على GitHub
```bash
# أنشئ repository جديد على GitHub ثم:
git remote add origin https://github.com/YOUR_USERNAME/check-app.git
git branch -M main
git push -u origin main
```

---

## خطوات النشر | Deployment Steps

### الطريقة الأولى: من خلال موقع Vercel (الأسهل)

#### 1. استيراد المشروع
1. اذهب إلى [vercel.com/new](https://vercel.com/new)
2. اختر "Import Git Repository"
3. اختر المشروع من GitHub
4. اضغط "Import"

#### 2. إعدادات المشروع
```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### 3. متغيرات البيئة (Environment Variables)
أضف المتغيرات التالية في صفحة الإعدادات:

```
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
SESSION_SECRET=your-random-secret-key-here-change-this
NODE_ENV=production
```

#### 4. النشر
- اضغط "Deploy"
- انتظر 2-3 دقائق
- ✅ الموقع جاهز!

---

### الطريقة الثانية: من خلال Vercel CLI

#### 1. تثبيت Vercel CLI
```bash
npm install -g vercel
```

#### 2. تسجيل الدخول
```bash
vercel login
```

#### 3. النشر
```bash
cd check-app
vercel
```

#### 4. اتبع التعليمات:
```
? Set up and deploy "check-app"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? check-app
? In which directory is your code located? ./
```

#### 5. إعداد متغيرات البيئة
```bash
vercel env add NEXT_PUBLIC_APP_URL
# أدخل القيمة: https://your-app-name.vercel.app

vercel env add SESSION_SECRET
# أدخل قيمة عشوائية طويلة
```

#### 6. إعادة النشر
```bash
vercel --prod
```

---

## ملفات التكوين المضافة | Configuration Files

### 1. `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 2. `.vercelignore`
```
node_modules
.next/
*.md
!README.md
app/data/users.json
```

### 3. `.env.example`
نموذج لمتغيرات البيئة المطلوبة

---

## ⚠️ تحذير مهم: نظام التخزين

### المشكلة الحالية:
التطبيق يستخدم نظام ملفات محلي (`fs`) لتخزين المستخدمين، وهذا **لا يعمل على Vercel** لأنه serverless.

### الحلول:

#### الحل المؤقت (للاختبار):
- استخدام `auth-vercel.ts` - تخزين مؤقت في الذاكرة
- ⚠️ البيانات تُحذف عند كل deployment جديد
- مناسب للتجربة فقط

#### الحل الدائم (للإنتاج):
استخدم إحدى هذه الخيارات:

##### 1. **Vercel KV** (الأسهل - مجاني)
```bash
# في لوحة تحكم Vercel:
# Storage > Create Database > KV
# ثم استخدم @vercel/kv في الكود
```

##### 2. **Vercel Postgres** (قاعدة بيانات كاملة)
```bash
# في لوحة تحكم Vercel:
# Storage > Create Database > Postgres
# ثم استخدم Prisma أو pg
```

##### 3. **Supabase** (مجاني - قوي)
```bash
npm install @supabase/supabase-js
# سجّل على supabase.com
# أنشئ مشروع جديد
# استخدم URL و API Key في .env
```

##### 4. **MongoDB Atlas** (مجاني)
```bash
npm install mongodb
# سجّل على mongodb.com/cloud/atlas
# أنشئ cluster مجاني
# استخدم connection string في .env
```

---

## تحديث نظام المصادقة للإنتاج

### خيار 1: استخدام Vercel KV (الموصى به)

#### 1. تثبيت الحزمة
```bash
npm install @vercel/kv
```

#### 2. إنشاء قاعدة بيانات KV
- اذهب لمشروعك في Vercel
- Storage > Create Database > KV
- انسخ المتغيرات البيئية

#### 3. تحديث `auth.ts`
```typescript
import { kv } from '@vercel/kv';

// حفظ مستخدم
await kv.set(`user:${email}`, userData);

// جلب مستخدم
const user = await kv.get(`user:${email}`);

// حذف مستخدم
await kv.del(`user:${email}`);
```

---

### خيار 2: استخدام Supabase (شامل)

#### 1. التثبيت
```bash
npm install @supabase/supabase-js
```

#### 2. الإعداد
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// تسجيل مستخدم
const { data, error } = await supabase.auth.signUp({
  email,
  password,
})

// تسجيل دخول
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

#### 3. متغيرات البيئة
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

---

## الاختبار بعد النشر | Testing After Deployment

### 1. اختبار الموقع الأساسي
```
✅ https://your-app.vercel.app يفتح بشكل صحيح
✅ الصفحة الرئيسية تظهر
✅ اختيار المدينة يعمل
✅ الصور تُحمّل من Unsplash
```

### 2. اختبار المصادقة
```
⚠️ مع النظام الحالي (in-memory):
- التسجيل يعمل
- تسجيل الدخول يعمل
- لكن البيانات تُحذف بعد إعادة النشر

✅ مع قاعدة بيانات:
- كل شيء يعمل بشكل دائم
```

### 3. اختبار البيانات الحية
```
✅ بيانات الازدحام تُحدّث تلقائياً
✅ التحديثات كل 15 ثانية تعمل
✅ جميع المدن والكافيهات تظهر
```

---

## إعدادات إضافية | Additional Settings

### 1. نطاق مخصص (Custom Domain)
```
1. اذهب إلى Settings > Domains
2. اضغط "Add Domain"
3. أدخل النطاق الخاص بك
4. اتبع التعليمات لإعداد DNS
```

### 2. Analytics
```
1. اذهب إلى Analytics tab
2. فعّل Web Analytics (مجاني)
3. شاهد إحصائيات الزوار
```

### 3. تحسين الأداء
```javascript
// في next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // تحسين الصور
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  // ضغط الملفات
  compress: true,
};
```

---

## استكشاف الأخطاء | Troubleshooting

### خطأ: Build Failed

#### السبب المحتمل: TypeScript Errors
```bash
# حل محلي:
npm run build

# إذا نجح محلياً لكن فشل على Vercel:
# تحقق من package.json و tsconfig.json
```

#### السبب المحتمل: Missing Dependencies
```bash
# تأكد من أن جميع الحزم في package.json
npm install
```

---

### خطأ: 404 Not Found

#### تحقق من:
1. Root Directory صحيح (`./`)
2. Output Directory صحيح (`.next`)
3. Framework Preset = Next.js

---

### خطأ: Environment Variables Missing

```bash
# تحقق من:
1. Settings > Environment Variables
2. أضف جميع المتغيرات المطلوبة
3. أعد النشر بعد الإضافة
```

---

### خطأ: Images Not Loading

```typescript
// تحقق من next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
},
```

---

## التحديثات التلقائية | Automatic Deployments

### الإعداد:
```
1. كل push إلى main branch = deployment تلقائي
2. كل pull request = preview deployment
3. الفروع الأخرى = preview deployments
```

### التحكم:
```
Settings > Git > Production Branch
- اختر الفرع الرئيسي (main)
- فعّل/عطّل Auto Deployments
```

---

## المراقبة والصيانة | Monitoring & Maintenance

### 1. السجلات (Logs)
```
Deployments > اختر deployment > Runtime Logs
- شاهد console.log
- تتبع الأخطاء
```

### 2. الأداء
```
Analytics > Real Experience Score
- سرعة التحميل
- أداء الصفحات
- معدل الارتداد
```

### 3. الاستخدام
```
Settings > Usage
- عدد الطلبات
- Bandwidth المستخدم
- وقت التنفيذ
```

---

## الحدود المجانية | Free Tier Limits

```
✅ Bandwidth: 100 GB/شهر
✅ Builds: 6000 دقيقة/شهر
✅ Serverless Functions: 100 GB-Hours
✅ Edge Functions: 500,000 طلب/شهر
✅ Image Optimization: 1000 صورة/شهر

⚠️ للتطبيق الحالي، الحد المجاني كافٍ تماماً!
```

---

## خطة الترقية للإنتاج | Production Upgrade Plan

### المرحلة 1: الإطلاق الأولي (مجاني)
```
✅ Vercel Free Tier
✅ In-memory storage (للاختبار)
✅ Unsplash images
✅ Basic analytics
```

### المرحلة 2: إضافة قاعدة بيانات
```
✅ Vercel KV أو Supabase (مجاني)
✅ تخزين دائم للمستخدمين
✅ نسخ احتياطية تلقائية
```

### المرحلة 3: التوسع
```
💰 Vercel Pro ($20/شهر)
💰 Database مدفوع (إذا احتجت أكثر)
✅ Custom domain
✅ Advanced analytics
```

---

## الأوامر السريعة | Quick Commands

```bash
# تسجيل دخول
vercel login

# نشر preview
vercel

# نشر production
vercel --prod

# إضافة متغيرات بيئة
vercel env add VARIABLE_NAME

# عرض السجلات
vercel logs

# ربط مشروع موجود
vercel link

# حذف deployment
vercel remove [deployment-url]
```

---

## قائمة التحقق النهائية | Final Checklist

قبل النشر، تأكد من:

- [ ] ✅ `git init` و `git push` تم
- [ ] ✅ `vercel.json` موجود
- [ ] ✅ `.vercelignore` موجود
- [ ] ✅ متغيرات البيئة محددة
- [ ] ✅ `npm run build` يعمل محلياً
- [ ] ✅ الصور من Unsplash تعمل
- [ ] ✅ قاعدة بيانات محددة (أو in-memory للاختبار)
- [ ] ✅ حساب Vercel جاهز
- [ ] ✅ GitHub repository موجود

---

## الخطوات التالية | Next Steps

### بعد النشر الناجح:

1. **اختبر الموقع بالكامل**
   - جرّب جميع الميزات
   - تأكد من المصادقة
   - اختبر على أجهزة مختلفة

2. **أضف قاعدة بيانات دائمة**
   - اختر Vercel KV أو Supabase
   - انقل نظام المصادقة
   - اختبر التخزين الدائم

3. **احصل على نطاق مخصص** (اختياري)
   - سجّل نطاق (.com أو .app)
   - اربطه مع Vercel
   - فعّل HTTPS تلقائياً

4. **راقب الأداء**
   - استخدم Vercel Analytics
   - تحقق من السرعة
   - حسّن الصور إذا لزم

---

## الدعم والمساعدة | Support

### موارد Vercel:
- 📚 [Vercel Docs](https://vercel.com/docs)
- 💬 [Vercel Community](https://github.com/vercel/vercel/discussions)
- 🎓 [Next.js Learn](https://nextjs.org/learn)

### موارد المشروع:
- 📖 `README.md` - نظرة عامة
- 🚀 `QUICKSTART.md` - البداية السريعة
- 🔧 `PROJECT_INFO.md` - معلومات المشروع

---

## ملخص سريع | Quick Summary

```bash
# 1. رفع على GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 2. النشر على Vercel
vercel login
vercel

# 3. إضافة متغيرات البيئة
# في لوحة تحكم Vercel أو:
vercel env add NEXT_PUBLIC_APP_URL

# 4. نشر نهائي
vercel --prod

# ✅ جاهز!
```

---

**🎉 مبروك! تطبيق شيّك الآن على الإنترنت!**

رابط الموقع: `https://your-app-name.vercel.app`

**تاريخ الإنشاء**: 2025-10-24
**الحالة**: ✅ جاهز للنشر
