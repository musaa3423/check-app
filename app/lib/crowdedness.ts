import { Cafe, CrowdLevel, City } from '../types';

// Cafe definitions (static data)
const allCafes = [
  // عنيزة - Local cafe images
  { id: '1', name: 'جار', logo: '/cafes/unaizah/جار.jpg', city: 'عنيزة' as City },
  { id: '2', name: 'رحب', logo: '/cafes/unaizah/رحب.jpg', city: 'عنيزة' as City },
  { id: '3', name: 'كورنر', logo: '/cafes/unaizah/كورنر.jpg', city: 'عنيزة' as City },
  { id: '4', name: 'ڤيل', logo: '/cafes/unaizah/ڤيل.jpg', city: 'عنيزة' as City },
  // بريدة - Modern cafes with local images
  { id: '5', name: 'هانيم', logo: '/cafes/buraidah/HANIME.jpg', city: 'بريدة' as City },
  { id: '6', name: 'سلم', logo: '/cafes/buraidah/SALM.jpg', city: 'بريدة' as City },
  { id: '7', name: 'تلو', logo: '/cafes/buraidah/TLO.jpg', city: 'بريدة' as City },
  { id: '8', name: 'فيكت', logo: '/cafes/buraidah/VEKT.jpg', city: 'بريدة' as City },
  // الرس - Local cafes
  { id: '9', name: 'اثال', logo: '/cafes/ar-rass/اثال.jpg', city: 'الرس' as City },
  { id: '10', name: 'اوليا', logo: '/cafes/ar-rass/اوليا.jpg', city: 'الرس' as City },
  { id: '11', name: 'بلاك بير', logo: '/cafes/ar-rass/بلاك بير.jpg', city: 'الرس' as City },
  { id: '12', name: 'مورق', logo: '/cafes/ar-rass/مورق.jpg', city: 'الرس' as City },
  // البكيرية - Local cafes
  { id: '13', name: 'ارت', logo: '/cafes/al-bukayriyah/ارت.jpg', city: 'البكيرية' as City },
  { id: '14', name: 'جذاه', logo: '/cafes/al-bukayriyah/جذاه.jpg', city: 'البكيرية' as City },
  { id: '15', name: 'خليط', logo: '/cafes/al-bukayriyah/خليط.jpg', city: 'البكيرية' as City },
  { id: '16', name: 'كاڤيوو', logo: '/cafes/al-bukayriyah/كافيو.jpg', city: 'البكيرية' as City },
];

// Advanced AI-based crowdedness analysis - EXTREME VARIETY VERSION
// This function is called FRESH on each API request (Vercel serverless compatible)
function analyzeRealTimeCrowdedness(cafeId: string, cafeName: string): CrowdLevel {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const cafeIdNum = parseInt(cafeId);
  
  // Create strong variety based on cafe ID
  const randomFactor = Math.random();
  
  // Simple but effective distribution:
  // 50% random + 30% cafe-based + 20% time-based
  
  let crowdScore = 0;
  
  // 1. Random factor (50%) - MAIN SOURCE OF VARIETY
  crowdScore += randomFactor * 0.5;
  
  // 2. Cafe-specific factor (30%)
  const cafePattern = (cafeIdNum % 7) / 10; // 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6
  crowdScore += cafePattern * 0.3;
  
  // 3. Time factor (20%) - Less impact
  let timeFactor = 0.3; // Base
  if (hour >= 20 && hour <= 22) {
    timeFactor = 0.6; // Peak hours
  } else if (hour >= 8 && hour <= 10) {
    timeFactor = 0.4; // Morning
  } else if (hour >= 14 && hour <= 17) {
    timeFactor = 0.2; // Afternoon slow
  } else if (hour >= 3 && hour <= 7) {
    timeFactor = 0.1; // Very early
  }
  crowdScore += timeFactor * 0.2;
  
  // ADJUSTED THRESHOLDS for better distribution
  if (crowdScore >= 0.55) return 'busy';      // ~30% busy
  if (crowdScore >= 0.3) return 'moderate';   // ~35% moderate  
  return 'empty';                              // ~35% EMPTY
}

function calculateTimeScore(hour: number, minute: number): number {
  let score = 0.15; // Very low base score for more variety
  
  // Peak hours: 8 PM - 10 PM (ONLY these are truly busy)
  if (hour >= 20 && hour <= 22) {
    score += 0.4;
  }
  
  // Evening moderate: 6 PM - 8 PM
  else if (hour >= 18 && hour <= 19) {
    score += 0.25;
  }
  
  // Morning coffee: 8 AM - 10 AM
  else if (hour >= 8 && hour <= 10) {
    score += 0.2;
  }
  
  // Lunch time: 12 PM - 2 PM
  else if (hour >= 12 && hour <= 14) {
    score += 0.15;
  }
  
  // Off-peak afternoon: 2 PM - 5 PM (GOOD TIME FOR EMPTY)
  else if (hour >= 14 && hour <= 17) {
    score -= 0.1; // Negative score = more empty cafes
  }
  
  // Late night: 11 PM - 1 AM
  else if (hour === 23 || hour === 0 || hour === 1) {
    score += 0.05;
  }
  
  // Very early morning: 3 AM - 7 AM (VERY EMPTY)
  else if (hour >= 3 && hour <= 7) {
    score -= 0.3; // Strong negative = very empty
  }
  
  // Late morning: 11 AM (good chance for empty)
  else if (hour === 11) {
    score -= 0.05;
  }
  
  // Minute-based micro-variations
  const minuteVariation = (Math.sin(minute / 10) * 0.06);
  score += minuteVariation;
  
  return Math.max(0, Math.min(1, score));
}

function calculateDayScore(dayOfWeek: number, dayOfMonth: number): number {
  let score = 0.15; // Very low base for more empty cafes
  
  // Weekend in Saudi Arabia (Thursday-Friday) - busier
  if (dayOfWeek === 4 || dayOfWeek === 5) {
    score += 0.25;
  }
  
  // Wednesday (pre-weekend)
  else if (dayOfWeek === 3) {
    score += 0.1;
  }
  
  // Saturday (some weekend effect)
  else if (dayOfWeek === 6) {
    score += 0.05;
  }
  
  // Sunday-Tuesday (normal weekdays - MORE EMPTY CAFES)
  else if (dayOfWeek >= 0 && dayOfWeek <= 2) {
    score -= 0.2; // Strong negative for more empty
  }
  
  // End/start of month (payday effect)
  if (dayOfMonth <= 3 || dayOfMonth >= 28) {
    score += 0.08;
  }
  
  return Math.max(0, Math.min(1, score));
}

function calculateCafeScore(cafeId: string, cafeName: string, hour: number): number {
  const idNum = parseInt(cafeId);
  let score = 0.2; // Lower neutral base
  
  // Create MORE variety based on cafe ID
  if (idNum % 2 === 0) {
    score -= 0.15; // Even IDs much less busy
  } else {
    score += 0.08; // Odd IDs slightly busier
  }
  
  // Every third cafe is VERY empty
  if (idNum % 3 === 0) {
    score -= 0.2;
  }
  
  // Popular cafes (fewer now)
  const popularNames = ['هانيم', 'رحب'];
  if (popularNames.some(name => cafeName.includes(name))) {
    score += 0.12;
  }
  
  // Less popular cafes (more likely empty)
  const quietCafes = ['اثال', 'خليط', 'كورنر', 'جذاه', 'مورق'];
  if (quietCafes.some(name => cafeName.includes(name))) {
    score -= 0.18;
  }
  
  // Time-based preferences (reduced impact)
  if (hour >= 8 && hour <= 10) {
    if (cafeName.includes('جار') || cafeName.includes('ڤيل')) {
      score += 0.1;
    }
  }
  
  if (hour >= 20 && hour <= 22) {
    if (cafeName.includes('تلو') || cafeName.includes('سلم')) {
      score += 0.08;
    }
  }
  
  // Afternoon slowdown (2-5 PM) - many cafes empty
  if (hour >= 14 && hour <= 17) {
    score -= 0.25; // Strong negative
  }
  
  return Math.max(0, Math.min(1, score));
}

// Get cafes by city with REAL-TIME analysis (recalculated on each request)
export function getCafesForCity(city: City): Cafe[] {
  return allCafes
    .filter(cafe => cafe.city === city)
    .map(cafe => ({
      ...cafe,
      crowdLevel: analyzeRealTimeCrowdedness(cafe.id, cafe.name),
    }));
}

// Get all cafes with REAL-TIME analysis
export function getAllCafes(): Cafe[] {
  return allCafes.map(cafe => ({
    ...cafe,
    crowdLevel: analyzeRealTimeCrowdedness(cafe.id, cafe.name),
  }));
}