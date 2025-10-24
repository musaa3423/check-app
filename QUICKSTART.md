# 🚀 Quick Start Guide

## ✅ Your App is Running!

The **شيّك (CHECK)** application is now live and running at:
- **Local URL:** http://localhost:3000
- **Network URL:** http://192.168.1.4:3000

## 📱 How to Access

### Option 1: Preview Browser (Recommended)
Click the preview button in your IDE to open the application in a built-in browser.

### Option 2: Web Browser
Open any web browser and navigate to:
```
http://localhost:3000
```

### Option 3: Mobile Device (Same Network)
If your phone is on the same WiFi network, use:
```
http://192.168.1.4:3000
```

## 🎯 Testing the Application

### Step 1: Landing Page
- You'll see the "شيّك" logo
- Tagline: "شيّك قبل تروح"
- Click "ابدأ الآن" to continue

### Step 2: Login
**Using Phone Number:**
- Enter any phone number in format: 05xxxxxxxx
- Example: 0512345678
- Click "إرسال رمز التحقق"
- Enter any 4 digits (e.g., 1234)
- Click "تحقق"

**Using Email:**
- Switch to "البريد الإلكتروني"
- Enter any email (e.g., test@example.com)
- Click "إرسال رمز التحقق"
- Enter any 4 digits
- Click "تحقق"

### Step 3: Select City
Choose one of:
- عنيزة (Most cafes available)
- بريدة
- الرس
- البكيرية

### Step 4: View Cafes
- **Suggestions Section:** Shows cafes with green status (available/empty)
- **All Cafes Section:** Shows all cafes with color-coded status
  - 🔴 Red = Busy
  - 🟠 Orange = Moderate
  - 🟢 Green = Empty

### Step 5: Watch Auto-Refresh
- Wait for 2 minutes
- The crowd levels will automatically update
- Watch the timestamp change in the header

## 🎨 Features to Test

### ✅ Real-Time AI Analysis
The crowdedness levels change based on:
- Current time of day
- Day of week
- Peak hours detection
- AI-weighted calculations

### ✅ Auto-Refresh
- Data refreshes every 2 minutes automatically
- No need to reload the page
- Live indicator shows "البيانات تُحدّث تلقائياً كل دقيقتين"

### ✅ Responsive Design
- Try resizing your browser window
- The design adapts to mobile, tablet, and desktop
- Cards reorganize based on screen size

### ✅ Arabic RTL Support
- Full right-to-left layout
- Cairo Arabic font
- Proper text direction

## 🔧 Development Commands

### Start Development Server
```bash
cd check-app
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
check-app/
├── app/
│   ├── api/
│   │   └── crowdedness/route.ts    # AI analysis API
│   ├── components/
│   │   ├── LandingPage.tsx         # Landing screen
│   │   ├── LoginPage.tsx           # Login + verification
│   │   ├── CitySelection.tsx       # City picker
│   │   └── CafeDashboard.tsx       # Main dashboard
│   ├── data/
│   │   └── cafes.ts                # Cafe data
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # App entry
│   └── globals.css                 # Styles
├── public/
│   └── logo.svg                    # App logo
├── PROJECT_INFO.md                 # Detailed project info
├── INTEGRATION_GUIDE.md            # Real data integration guide
└── دليل_المستخدم.md                # Arabic user guide
```

## 🎯 Key Files

### Main Entry Point
- `app/page.tsx` - App state management and routing

### API Endpoint
- `app/api/crowdedness/route.ts` - AI-based crowd analysis

### Components
- `LandingPage.tsx` - Welcome screen
- `LoginPage.tsx` - Authentication
- `CitySelection.tsx` - City selector
- `CafeDashboard.tsx` - Main interface with live data

## 🔍 Troubleshooting

### Issue: Page won't load
**Solution:** Make sure the development server is running:
```bash
cd check-app
npm run dev
```

### Issue: Port 3000 already in use
**Solution:** Kill the process using port 3000 or use a different port:
```bash
npm run dev -- -p 3001
```

### Issue: Font warnings in console
**Solution:** These are harmless warnings from Next.js 16. The app works fine with Google Fonts fallback.

### Issue: Changes not reflected
**Solution:** Next.js has hot reload. If not working, try:
1. Save the file again
2. Check terminal for errors
3. Refresh browser (Ctrl+R)

## 📊 Current Data

### عنيزة (Unaizah) - 8 Cafes
- كوفي لاونج
- ميراج كافيه
- لافندر كافيه
- سمرلاند كافيه
- كوفي بلس
- بلاك آند وايت
- كافيه دي روما
- ذا كافيه

### Other Cities
- بريدة - 4 cafes
- الرس - 3 cafes
- البكيرية - 3 cafes

## 🔄 How the AI Works

The crowd analysis considers:
1. **Time patterns:** Peak hours (5-10 PM), morning rush (8-11 AM), lunch (1-3 PM)
2. **Day of week:** Weekends vs weekdays
3. **Weighted scoring:** Multiple factors combined
4. **Real-time calculation:** Runs every API call

## 🌟 Next Steps

1. **Test all flows:** Landing → Login → City → Dashboard
2. **Wait for auto-refresh:** See data update after 2 minutes
3. **Try different times:** Visit at different hours to see AI variations
4. **Read documentation:** Check PROJECT_INFO.md for details
5. **Plan real integration:** See INTEGRATION_GUIDE.md for production setup

## 🎉 Success Indicators

You know it's working when:
- ✅ Landing page shows logo and tagline
- ✅ Login accepts any phone/email with verification
- ✅ City selection shows 4 cities
- ✅ Dashboard displays cafes with colored indicators
- ✅ Suggestions section shows green cafes
- ✅ Timestamp updates every 2 minutes
- ✅ Crowd levels change realistically

## 📚 Additional Resources

- **User Guide (Arabic):** دليل_المستخدم.md
- **Project Details:** PROJECT_INFO.md
- **Integration Guide:** INTEGRATION_GUIDE.md
- **Next.js Docs:** https://nextjs.org/docs

---

## 🎊 You're All Set!

The app is ready to use. Start by opening:
**http://localhost:3000**

Enjoy your شيّك experience! ☕✨

**شيّك قبل تروح!**
