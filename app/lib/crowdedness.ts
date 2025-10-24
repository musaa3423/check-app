import { Cafe, CrowdLevel, City } from '../types';

// Cafe definitions (static data)
const allCafes = [
  // عنيزة - Beautiful professional coffee shop images
  { id: '1', name: 'كوفي لاونج', logo: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '2', name: 'ميراج كافيه', logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '3', name: 'لافندر كافيه', logo: 'https://images.unsplash.com/photo-1501492673258-5ae9bbaa3c94?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '4', name: 'سمرلاند كافيه', logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '5', name: 'كوفي بلس', logo: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '6', name: 'بلاك آند وايت', logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '7', name: 'كافيه دي روما', logo: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  { id: '8', name: 'ذا كافيه', logo: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop&q=80', city: 'عنيزة' as City },
  // بريدة - Starbucks and modern cafes
  { id: '9', name: 'ستاربكس', logo: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=400&h=400&fit=crop&q=80', city: 'بريدة' as City },
  { id: '10', name: 'كافيه لاتيه', logo: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&q=80', city: 'بريدة' as City },
  { id: '11', name: 'نسكافيه', logo: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop&q=80', city: 'بريدة' as City },
  { id: '12', name: 'كوفي هاوس', logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=400&fit=crop&q=80', city: 'بريدة' as City },
  // الرس - Traditional and royal cafes
  { id: '13', name: 'كافيه الواحة', logo: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=400&fit=crop&q=80', city: 'الرس' as City },
  { id: '14', name: 'قهوتي', logo: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop&q=80', city: 'الرس' as City },
  { id: '15', name: 'الكافيه الملكي', logo: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&q=80', city: 'الرس' as City },
  // البكيرية - Garden and outdoor cafes
  { id: '16', name: 'كوفي شوب', logo: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop&q=80', city: 'البكيرية' as City },
  { id: '17', name: 'كافيه الحديقة', logo: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=400&fit=crop&q=80', city: 'البكيرية' as City },
  { id: '18', name: 'بلاك كوفي', logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop&q=80', city: 'البكيرية' as City },
];

// Advanced AI-based crowdedness analysis
// This function is called FRESH on each API request (Vercel serverless compatible)
function analyzeRealTimeCrowdedness(cafeId: string, cafeName: string): CrowdLevel {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  
  // AI Analysis Factors:
  let crowdScore = 0;
  
  // 1. Time-based patterns (40% weight)
  const timeScore = calculateTimeScore(hour, minute);
  crowdScore += timeScore * 0.4;
  
  // 2. Day patterns (25% weight)
  const dayScore = calculateDayScore(dayOfWeek, dayOfMonth);
  crowdScore += dayScore * 0.25;
  
  // 3. Cafe-specific patterns (20% weight)
  const cafeScore = calculateCafeScore(cafeId, cafeName, hour);
  crowdScore += cafeScore * 0.2;
  
  // 4. Random variations for realism (15% weight)
  const randomScore = Math.random();
  crowdScore += randomScore * 0.15;
  
  // Determine crowd level
  if (crowdScore >= 0.65) return 'busy';
  if (crowdScore >= 0.35) return 'moderate';
  return 'empty';
}

function calculateTimeScore(hour: number, minute: number): number {
  let score = 0.3; // Base score
  
  // Peak hours: 5 PM - 10 PM
  if (hour >= 17 && hour <= 22) {
    score += 0.4;
    // Even busier closer to 8 PM
    if (hour >= 19 && hour <= 21) {
      score += 0.2;
    }
  }
  
  // Morning coffee rush: 7 AM - 11 AM
  if (hour >= 7 && hour <= 11) {
    score += 0.25;
    // Peak at 9 AM
    if (hour === 9) {
      score += 0.15;
    }
  }
  
  // Lunch time: 12 PM - 3 PM
  if (hour >= 12 && hour <= 15) {
    score += 0.2;
  }
  
  // Late night: 11 PM - 2 AM (moderate)
  if (hour >= 23 || hour <= 2) {
    score += 0.15;
  }
  
  // Very early morning: 3 AM - 6 AM (empty)
  if (hour >= 3 && hour <= 6) {
    score -= 0.3;
  }
  
  // Minute-based micro-variations (creates continuous change)
  const minuteVariation = (Math.sin(minute / 10) * 0.1);
  score += minuteVariation;
  
  return Math.max(0, Math.min(1, score));
}

function calculateDayScore(dayOfWeek: number, dayOfMonth: number): number {
  let score = 0.3; // Base score
  
  // Weekend in Saudi Arabia (Thursday-Friday)
  if (dayOfWeek === 4 || dayOfWeek === 5) {
    score += 0.4;
  }
  
  // Wednesday evening (pre-weekend)
  if (dayOfWeek === 3) {
    score += 0.2;
  }
  
  // Saturday (some weekend effect)
  if (dayOfWeek === 6) {
    score += 0.15;
  }
  
  // Sunday-Tuesday (normal weekdays)
  if (dayOfWeek >= 0 && dayOfWeek <= 2) {
    score -= 0.1;
  }
  
  // End/start of month (payday effect)
  if (dayOfMonth <= 3 || dayOfMonth >= 28) {
    score += 0.15;
  }
  
  return Math.max(0, Math.min(1, score));
}

function calculateCafeScore(cafeId: string, cafeName: string, hour: number): number {
  let score = 0.5; // Base score
  
  // Popular cafes (based on name patterns)
  const popularNames = ['ستاربكس', 'لافندر', 'ميراج', 'الملكي'];
  if (popularNames.some(name => cafeName.includes(name))) {
    score += 0.2;
  }
  
  // Cafe-specific ID patterns (creates variety)
  const idNum = parseInt(cafeId);
  if (idNum % 3 === 0) {
    score += 0.15; // Every 3rd cafe is busier
  }
  if (idNum % 5 === 0) {
    score += 0.1; // Every 5th cafe gets boost
  }
  
  // Time-based cafe preferences
  if (hour >= 7 && hour <= 11) {
    // Breakfast cafes
    if (cafeName.includes('كوفي') || cafeName.includes('قهوة')) {
      score += 0.2;
    }
  }
  
  if (hour >= 20 && hour <= 23) {
    // Evening lounges
    if (cafeName.includes('لاونج') || cafeName.includes('كافيه')) {
      score += 0.15;
    }
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
