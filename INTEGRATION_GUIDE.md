# Integration Guide for Real-Time Data Sources

## 🎯 Purpose
This guide explains how to integrate real data sources to replace the simulated AI analysis with actual real-time crowdedness detection.

## 📊 Recommended Data Sources

### 1. Google Places API (Popular Times)
**Best for:** Historical and live crowdedness patterns

```typescript
// Example integration in app/api/crowdedness/route.ts

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

async function getGooglePopularTimes(placeId: string) {
  const response = await client.placeDetails({
    params: {
      place_id: placeId,
      fields: ['current_opening_hours', 'utc_offset_minutes'],
      key: process.env.GOOGLE_MAPS_API_KEY!
    }
  });
  
  // Parse popular times data
  return response.data.result;
}
```

**Setup:**
1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Places API
3. Add cafe place IDs to the database
4. Call API every 2 minutes

**Cost:** ~$17 per 1000 requests

---

### 2. WiFi Analytics
**Best for:** Highly accurate real-time counts

**How it works:**
- Install WiFi routers in partner cafes
- Count connected devices
- Send data to your backend

```typescript
// Example webhook endpoint
export async function POST(request: NextRequest) {
  const data = await request.json();
  
  const { cafeId, deviceCount, timestamp } = data;
  
  // Calculate crowd level based on device count
  const crowdLevel = calculateFromDeviceCount(deviceCount, cafeId);
  
  // Update database
  await updateCafeCrowdedness(cafeId, crowdLevel);
  
  return NextResponse.json({ success: true });
}

function calculateFromDeviceCount(count: number, cafeId: string): CrowdLevel {
  // Get cafe capacity from database
  const capacity = getCafeCapacity(cafeId);
  
  const percentage = (count / capacity) * 100;
  
  if (percentage >= 75) return 'busy';
  if (percentage >= 40) return 'moderate';
  return 'empty';
}
```

---

### 3. Computer Vision + AI
**Best for:** Most accurate real-time detection

**Technologies:**
- YOLO (You Only Look Once) for person detection
- Raspberry Pi + Camera at cafe entrance
- Edge computing for privacy

```python
# Example Python script running on edge device
from ultralytics import YOLO
import requests

model = YOLO('yolov8n.pt')

def count_people(image):
    results = model(image)
    people_count = sum(1 for r in results[0].boxes if r.cls == 0)  # 0 = person
    return people_count

def send_to_api(cafe_id, count):
    requests.post(
        'https://your-api.com/update-count',
        json={'cafeId': cafe_id, 'count': count}
    )

# Run every 30 seconds
while True:
    image = capture_image()
    count = count_people(image)
    send_to_api(CAFE_ID, count)
    time.sleep(30)
```

---

### 4. Social Media Check-ins
**Best for:** Supplementary data

**Sources:**
- Instagram location tags
- Foursquare/Swarm check-ins
- Twitter/X mentions

```typescript
async function getSocialMediaBuzz(cafeName: string, location: string) {
  // Instagram Graph API
  const instagramPosts = await fetchInstagramPosts(cafeName, location);
  
  // Count recent posts (last 2 hours)
  const recentPosts = instagramPosts.filter(
    post => isWithinLastHours(post.timestamp, 2)
  );
  
  // More posts = more crowded
  return {
    buzzScore: recentPosts.length,
    crowdLevel: calculateFromBuzz(recentPosts.length)
  };
}
```

---

### 5. POS (Point of Sale) Integration
**Best for:** Partner cafes with POS systems

```typescript
// Integrate with cafe's POS system
interface POSData {
  cafeId: string;
  activeOrders: number;
  tablesOccupied: number;
  totalTables: number;
  timestamp: Date;
}

function calculateFromPOS(data: POSData): CrowdLevel {
  const occupancyRate = (data.tablesOccupied / data.totalTables) * 100;
  
  if (occupancyRate >= 80) return 'busy';
  if (occupancyRate >= 50) return 'moderate';
  return 'empty';
}
```

---

## 🔧 Implementation Strategy

### Phase 1: Hybrid Approach (Recommended Start)
Combine multiple data sources for better accuracy:

```typescript
async function analyzeRealTimeCrowdedness(cafeId: string): Promise<CrowdLevel> {
  const scores: number[] = [];
  
  // Source 1: Google Popular Times (if available)
  try {
    const googleData = await getGooglePopularTimes(cafeId);
    scores.push(calculateScoreFromGoogle(googleData));
  } catch (e) {
    console.log('Google data unavailable');
  }
  
  // Source 2: WiFi Analytics (for partner cafes)
  const wifiData = await getWiFiData(cafeId);
  if (wifiData) {
    scores.push(calculateScoreFromWiFi(wifiData));
  }
  
  // Source 3: Time-based AI prediction (fallback)
  scores.push(calculateTimeBasedScore());
  
  // Source 4: Social media buzz
  const socialScore = await getSocialMediaBuzz(cafeId);
  scores.push(socialScore);
  
  // Average all available scores
  const finalScore = scores.reduce((a, b) => a + b) / scores.length;
  
  if (finalScore >= 0.65) return 'busy';
  if (finalScore >= 0.35) return 'moderate';
  return 'empty';
}
```

---

## 🗄️ Database Schema

You'll need to store:

```typescript
// Cafe data with metadata
interface CafeData {
  id: string;
  name: string;
  city: string;
  
  // Data source configurations
  googlePlaceId?: string;
  wifiEnabled: boolean;
  posIntegrated: boolean;
  cameraInstalled: boolean;
  
  // Metadata
  capacity: number;  // Max people
  averageStayMinutes: number;
  
  // Current status
  currentCrowdLevel: CrowdLevel;
  lastUpdated: Date;
  deviceCount?: number;
  estimatedPeople?: number;
}

// Historical data for ML training
interface CrowdHistory {
  cafeId: string;
  timestamp: Date;
  crowdLevel: CrowdLevel;
  dayOfWeek: number;
  hour: number;
  source: 'google' | 'wifi' | 'camera' | 'social' | 'pos';
}
```

---

## 🚀 Step-by-Step Implementation

### Step 1: Choose Your First Data Source
Start with **Google Places API** (easiest to implement)

1. Install dependencies:
```bash
npm install @googlemaps/google-maps-services-js
```

2. Add environment variable:
```env
GOOGLE_MAPS_API_KEY=your_api_key_here
```

3. Update the API route

---

### Step 2: Add Database
Use Prisma + PostgreSQL or MongoDB

```bash
npm install prisma @prisma/client
npx prisma init
```

Schema:
```prisma
model Cafe {
  id              String   @id @default(cuid())
  name            String
  city            String
  googlePlaceId   String?
  capacity        Int
  currentLevel    String
  lastUpdated     DateTime @default(now())
  
  @@index([city])
}
```

---

### Step 3: Background Job for Updates
Use Vercel Cron or a separate worker:

```typescript
// app/api/cron/update-crowdedness/route.ts
export async function GET(request: NextRequest) {
  // Verify cron secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Update all cafes
  const cafes = await prisma.cafe.findMany();
  
  for (const cafe of cafes) {
    const crowdLevel = await analyzeRealTimeCrowdedness(cafe.id);
    
    await prisma.cafe.update({
      where: { id: cafe.id },
      data: {
        currentLevel: crowdLevel,
        lastUpdated: new Date()
      }
    });
  }
  
  return NextResponse.json({ success: true, updated: cafes.length });
}
```

Configure in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/update-crowdedness",
    "schedule": "*/2 * * * *"
  }]
}
```

---

## 📈 Machine Learning Enhancement

Train a model on historical data:

```python
# train_crowd_predictor.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load historical data
df = pd.read_csv('crowd_history.csv')

# Features
X = df[['hour', 'day_of_week', 'is_weekend', 'month', 'google_score', 'wifi_count']]
y = df['crowd_level']

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# Save model
import joblib
joblib.dump(model, 'crowd_predictor.pkl')
```

Use in your API:
```typescript
import { spawn } from 'child_process';

async function predictWithML(features: number[]): Promise<CrowdLevel> {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['predict.py', JSON.stringify(features)]);
    
    python.stdout.on('data', (data) => {
      const prediction = data.toString().trim();
      resolve(prediction as CrowdLevel);
    });
  });
}
```

---

## 💰 Cost Estimation

### Low Budget (~$50/month):
- Google Places API only
- 10,000 requests/month
- Suitable for 20-30 cafes with 2-min updates

### Medium Budget (~$500/month):
- Google Places API
- 5 WiFi-enabled cafes
- Social media monitoring
- 50-100 cafes total

### High Budget (~$2000+/month):
- All data sources
- Computer vision at major cafes
- Dedicated servers for ML
- 200+ cafes

---

## ⚠️ Privacy & Legal Considerations

1. **WiFi/Camera Data:**
   - Anonymize all data
   - Don't store MAC addresses
   - Clear privacy policy
   - Signage at cafes

2. **GDPR/Local Laws:**
   - Get user consent
   - Allow data deletion
   - Transparent data usage

3. **Cafe Partnerships:**
   - Written agreements
   - Revenue sharing model
   - Data access controls

---

## 🎯 Recommended Roadmap

**Month 1:**
- ✅ Launch with time-based AI (current implementation)
- Gather user feedback
- Sign up 5-10 cafe partners

**Month 2:**
- Integrate Google Places API
- Add database (Prisma + PostgreSQL)
- Implement caching

**Month 3:**
- Partner with 3 cafes for WiFi analytics
- Add social media monitoring
- Start collecting historical data

**Month 4:**
- Install cameras at 2 high-traffic cafes
- Train ML model on 3 months of data
- Launch beta of hybrid system

**Month 5:**
- Full production launch
- Scale to 50+ cafes
- Marketing push

---

## 📞 Support & Resources

- **Google Maps Platform:** https://developers.google.com/maps
- **WiFi Analytics:** UniFi, Cisco Meraki
- **Computer Vision:** Ultralytics YOLO, OpenCV
- **Database:** Supabase, PlanetScale, MongoDB Atlas

---

**Current Status:** 
The app currently uses intelligent time-based simulation. Follow this guide to integrate real data sources as you scale!
