# 🚀 نشر على Vercel - 3 خطوات فقط!

## الطريقة 1: من الموقع (الأسهل) ⭐

### 1. رفع على GitHub
```bash
cd check-app
git init
git add .
git commit -m "Initial commit"
```

أنشئ repository على [github.com](https://github.com/new) ثم:

```bash
git remote add origin https://github.com/اسم-المستخدم/check-app.git
git push -u origin main
```

### 2. نشر على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجّل دخول بحساب GitHub
3. اضغط **"New Project"**
4. اختر **"check-app"** repository
5. اضغط **"Deploy"**

### 3. انتهى! ✅
- انتظر دقيقتين
- الموقع جاهز على: `https://check-app-XXXX.vercel.app`

---

## الطريقة 2: من الترمينال

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل دخول
vercel login

# النشر
cd check-app
vercel --prod
```

✅ **انتهى!**

---

## ⚠️ ملاحظة مهمة

**نظام المصادقة الحالي مؤقت:**
- التسجيل يعمل
- لكن البيانات تُحذف بعد كل تحديث
- للحل الدائم: أضف قاعدة بيانات (Vercel KV أو Supabase)

**راجع**: `VERCEL_DEPLOYMENT_GUIDE.md` للتفاصيل

---

## 📚 وثائق مفيدة

- 📖 `VERCEL_QUICK_GUIDE_AR.md` - دليل سريع
- 📘 `VERCEL_DEPLOYMENT_GUIDE.md` - دليل شامل
- ✅ `DEPLOYMENT_CHECKLIST.md` - قائمة التحقق

---

**⏱️ الوقت**: 5 دقائق  
**💰 التكلفة**: مجاني  
**🎯 الصعوبة**: سهل جداً
