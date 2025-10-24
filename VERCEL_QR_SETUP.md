# 🚀 إعداد رمز QR على Vercel - خطوات سريعة

## ⚠️ مهم جداً: يجب إضافة متغير البيئة في Vercel

رمز QR لن يعمل على الهواتف إلا بعد هذه الخطوات!

---

## ✅ الخطوات المطلوبة:

### 1️⃣ احصل على رابط Vercel الخاص بك

بعد النشر، اذهب إلى:
```
Vercel Dashboard > check-app > Settings > Domains
```

ستجد رابط مثل:
```
check-app-git-main-musaa3423s-projects.vercel.app
أو
check-app-abc123.vercel.app
```

**انسخ الرابط الكامل!**

---

### 2️⃣ أضف متغير البيئة في Vercel

```
1. اذهب إلى: Settings > Environment Variables
2. اضغط: Add New
3. املأ:
   Name: NEXT_PUBLIC_APP_URL
   Value: https://رابطك-الذي-نسخته.vercel.app
   Environments: ✓ Production ✓ Preview ✓ Development
4. اضغط: Save
```

**مثال:**
```
Name: NEXT_PUBLIC_APP_URL
Value: https://check-app-git-main-musaa3423s-projects.vercel.app
```

---

### 3️⃣ أعد النشر (Redeploy)

```
1. اذهب إلى: Deployments
2. اختر آخر deployment
3. اضغط زر ⋯ (ثلاث نقاط)
4. اختر: Redeploy
5. انتظر دقيقتين
```

---

### 4️⃣ اختبر رمز QR

```
1. افتح موقعك: https://رابطك.vercel.app
2. اضغط "عرض رمز QR للموقع"
3. استخدم كاميرا هاتفك
4. امسح الرمز
5. ✅ يجب أن يفتح الموقع!
```

---

## 🎯 ملخص الإعداد:

```
✅ الكود: تم رفعه على GitHub
✅ Vercel: ينشر تلقائياً
⏳ البيئة: يجب إضافتها يدوياً (الخطوة 2)
⏳ Redeploy: يجب عمله (الخطوة 3)
```

---

## 📱 كيف تتأكد أن QR يعمل:

### في متصفح الكمبيوتر:
```
1. افتح الموقع
2. F12 (Developer Tools)
3. Console
4. ابحث عن: siteUrl
5. يجب أن يظهر: https://your-app.vercel.app
6. ✅ إذا ظهر localhost = خطأ!
```

---

## ⚠️ مشاكل شائعة:

### المشكلة 1: رمز QR يفتح localhost
**الحل:** أضف NEXT_PUBLIC_APP_URL في Vercel ثم Redeploy

### المشكلة 2: رمز QR لا يفتح شيء
**الحل:** تأكد أن الرابط صحيح ويبدأ بـ https://

### المشكلة 3: الهاتف يقول "لا يمكن الوصول"
**الحل:** الرابط خاطئ أو المتغير غير موجود

---

## ✅ بعد الإعداد الصحيح:

```
✅ رمز QR يحتوي على رابط Vercel الحقيقي
✅ أي هاتف يمسح الرمز = يفتح الموقع
✅ يعمل من أي مكان في العالم
✅ جاهز للطباعة والمشاركة
```

---

**الخطوة الأهم:** إضافة NEXT_PUBLIC_APP_URL في Vercel! 🔑
