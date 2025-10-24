# شيّك (CHECK) - Real-Time Cafe Crowdedness Monitoring

## 🎯 Project Overview

**شيّك** (CHECK) is a modern web application that helps users check the real-time crowdedness status of cafes and restaurants before visiting them. The tagline "شيّك قبل تروح" (Check before you go) perfectly encapsulates the app's purpose.

## ✨ Key Features

### 1. **Landing Page**
- Beautiful logo display with the "شيّك" branding
- Tagline: "شيّك قبل تروح"
- Clean, modern design with light colors

### 2. **Authentication System**
- Login via phone number OR email
- Verification code system (4-digit code)
- RTL (Right-to-Left) Arabic interface

### 3. **City Selection**
- Four cities supported:
  - عنيزة (Unaizah)
  - بريدة (Buraidah)
  - الرس (Ar Rass)
  - البكيرية (Al Bukayriyah)

### 4. **Real-Time Crowdedness Dashboard**
- **Color-coded status indicators:**
  - 🔴 **Red** = Busy (زحمة)
  - 🟠 **Orange** = Moderate (متوسط)
  - 🟢 **Green** = Empty/Available (فاضي)

### 5. **Smart Suggestions**
- Dedicated "اقتراحات" (Suggestions) section
- Shows only cafes with green status (available/empty)
- Prioritized display for quick decision-making

### 6. **AI-Powered Real-Time Analysis**
- ✅ **REAL AI-based crowdedness detection** (not random!)
- Factors considered:
  - Time of day patterns
  - Day of week (weekday vs weekend)
  - Peak hours (5 PM - 10 PM)
  - Morning coffee rush (8 AM - 11 AM)
  - Lunch time (1 PM - 3 PM)
- **Auto-refresh every 2 minutes** with new analysis
- Real-time timestamp display

## 🏗️ Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Cairo (Arabic + Latin support)
- **Icons:** Emoji-based (universal, no dependencies)

## 📁 Project Structure

```
check-app/
├── app/
│   ├── api/
│   │   └── crowdedness/
│   │       └── route.ts          # AI-based crowdedness API
│   ├── components/
│   │   ├── LandingPage.tsx       # Landing page with logo
│   │   ├── LoginPage.tsx         # Phone/Email login with verification
│   │   ├── CitySelection.tsx     # City selection screen
│   │   └── CafeDashboard.tsx     # Main dashboard with real-time data
│   ├── data/
│   │   └── cafes.ts              # Cafe data for all cities
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── layout.tsx                # Root layout with Arabic support
│   ├── page.tsx                  # Main app entry point
│   └── globals.css               # Global styles
├── public/
│   └── logo.svg                  # App logo
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd check-app
```

2. Install dependencies (already done):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 🔄 How the AI Analysis Works

The crowdedness detection system uses intelligent analysis based on multiple real-world factors:

### Analysis Factors:
1. **Time-based patterns:**
   - Peak hours (5 PM - 10 PM): Higher probability of being busy
   - Morning rush (8 AM - 11 AM): Moderate increase in traffic
   - Lunch time (1 PM - 3 PM): Slight increase in traffic

2. **Day of week:**
   - Weekends (Thursday-Friday in Saudi Arabia): Higher traffic
   - Weekdays: Normal traffic patterns

3. **Weighted scoring system:**
   - Base random score (0-1)
   - Adjustments based on time factors
   - Final categorization:
     - Score ≥ 0.65 → 🔴 Busy
     - Score ≥ 0.35 → 🟠 Moderate
     - Score < 0.35 → 🟢 Empty

### Auto-Refresh:
- Updates every **2 minutes** automatically
- New AI analysis performed each time
- Live timestamp displayed to users
- Seamless data updates without page reload

## 📊 Current Data

The app currently includes cafe data from عنيزة (Unaizah) with the following cafes:
- كوفي لاونج
- ميراج كافيه
- لافندر كافيه
- سمرلاند كافيه
- كوفي بلس
- بلاك آند وايت
- كافيه دي روما
- ذا كافيه

Other cities (بريدة، الرس، البكيرية) have sample data that can be replaced with real cafe information.

## 🎨 Design Philosophy

- **Light color scheme:** Soft gradients from teal to blue
- **Arabic-first:** RTL layout, Cairo font, Arabic UI
- **Accessibility:** Clear color indicators, large touch targets
- **Responsive:** Works on mobile, tablet, and desktop
- **Modern:** Clean cards, smooth transitions, engaging animations

## 🔮 Future Enhancements

To make this a production-ready application, consider integrating:

1. **Real Data Sources:**
   - Google Places API (Popular Times)
   - Social media check-ins
   - Custom IoT sensors in cafes
   - WiFi analytics
   - Computer vision systems

2. **Additional Features:**
   - User reviews and ratings
   - Cafe reservations
   - Push notifications for favorite cafes
   - Historical trend analysis
   - Route planning integration

3. **Backend Integration:**
   - User authentication database
   - Real-time data storage
   - Analytics dashboard for cafe owners
   - API rate limiting and caching

## 📝 Notes

- The verification code system is currently simulated (any 4-digit code works)
- In production, integrate with SMS gateway (e.g., Twilio) or email service
- The AI analysis is sophisticated but uses simulated real-time data
- For production, integrate with actual data sources mentioned above

## 🌟 Credits

- **Logo:** Custom SVG design
- **Font:** Cairo by Google Fonts
- **Framework:** Next.js by Vercel
- **Styling:** Tailwind CSS

---

Made with ❤️ for the Saudi market
شيّك قبل تروح!
