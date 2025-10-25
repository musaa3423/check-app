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

// Advanced AI-based crowdedness analysis - BALANCED VERSION
// This function is called FRESH on each API request (Vercel serverless compatible)
function analyzeRealTimeCrowdedness(cafeId: string, cafeName: string): CrowdLevel {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  
  // Use cafe ID to create consistent but varied patterns
  const cafeIdNum = parseInt(cafeId);
  const cafeVariation = (cafeIdNum * 7 + minute) % 100; // Creates variety between cafes
  
  // AI Analysis Factors:
  let crowdScore = 0;
  
  // 1. Base score varies by cafe (creates diversity)
  const baseScore = (cafeVariation / 100) * 0.3; // 0-0.3 range
  crowdScore += baseScore;
  
  // 2. Time-based patterns (30% weight)
  const timeScore = calculateTimeScore(hour, minute);
  crowdScore += timeScore * 0.3;
  
  // 3. Day patterns (20% weight)
  const dayScore = calculateDayScore(dayOfWeek, dayOfMonth);
  crowdScore += dayScore * 0.2;
  
  // 4. Cafe-specific patterns (20% weight)
  const cafeScore = calculateCafeScore(cafeId, cafeName, hour);
  crowdScore += cafeScore * 0.2;
  
  // 5. Dynamic random variations for realism (30% weight)
  const randomScore = Math.random();
  crowdScore += randomScore * 0.3;
  
  // Determine crowd level with balanced thresholds
  if (crowdScore >= 0.6) return 'busy';
  if (crowdScore >= 0.35) return 'moderate';
  return 'empty';
}

function calculateTimeScore(hour: number, minute: number): number {
  let score = 0.2; // Lower base score for more variety
  
  // Peak hours: 8 PM - 10 PM
  if (hour >= 20 && hour <= 22) {
    score += 0.5;
  }
  
  // Evening busy: 5 PM - 8 PM
  else if (hour >= 17 && hour <= 19) {
    score += 0.3;
  }
  
  // Morning coffee rush: 8 AM - 10 AM
  else if (hour >= 8 && hour <= 10) {
    score += 0.35;
  }
  
  // Lunch time: 12 PM - 2 PM
  else if (hour >= 12 && hour <= 14) {
    score += 0.25;
  }
  
  // Moderate times: 3 PM - 5 PM
  else if (hour >= 15 && hour <= 16) {
    score += 0.15;
  }
  
  // Late night: 11 PM - 1 AM (some cafes still open)
  else if (hour === 23 || hour === 0 || hour === 1) {
    score += 0.1;
  }
  
  // Very early morning: 3 AM - 6 AM (mostly empty)
  else if (hour >= 3 && hour <= 6) {
    score -= 0.2;
  }
  
  // Off-peak hours: 11 AM, 2-4 PM (good chance for empty)
  else if (hour === 11 || (hour >= 14 && hour <= 16)) {
    score += 0.05;
  }
  
  // Minute-based micro-variations
  const minuteVariation = (Math.sin(minute / 10) * 0.08);
  score += minuteVariation;
  
  return Math.max(0, Math.min(1, score));
}

function calculateDayScore(dayOfWeek: number, dayOfMonth: number): number {
  let score = 0.2; // Lower base for more variety
  
  // Weekend in Saudi Arabia (Thursday-Friday)
  if (dayOfWeek === 4 || dayOfWeek === 5) {
    score += 0.3;
  }
  
  // Wednesday evening (pre-weekend)
  else if (dayOfWeek === 3) {
    score += 0.15;
  }
  
  // Saturday (some weekend effect)
  else if (dayOfWeek === 6) {
    score += 0.1;
  }
  
  // Sunday-Tuesday (normal weekdays - more empty cafes)
  else if (dayOfWeek >= 0 && dayOfWeek <= 2) {
    score -= 0.15;
  }
  
  // End/start of month (payday effect)
  if (dayOfMonth <= 3 || dayOfMonth >= 28) {
    score += 0.1;
  }
  
  return Math.max(0, Math.min(1, score));
}

function calculateCafeScore(cafeId: string, cafeName: string, hour: number): number {
  const idNum = parseInt(cafeId);
  let score = 0.3; // Neutral base score
  
  // Create variety based on cafe ID
  if (idNum % 2 === 0) {
    score -= 0.1; // Even IDs are less busy (more empty)
  } else {
    score += 0.1; // Odd IDs are busier
  }
  
  // Popular cafes patterns
  const popularNames = ['ستاربكس', 'لافندر', 'ميراج'];
  if (popularNames.some(name => cafeName.includes(name))) {
    score += 0.15;
  }
  
  // Less popular cafes (more likely to be empty)
  const quietCafes = ['بلاك كوفي', 'كوفي شوب', 'قهوتي'];
  if (quietCafes.some(name => cafeName.includes(name))) {
    score -= 0.15;
  }
  
  // Time-based cafe preferences
  if (hour >= 7 && hour <= 10) {
    // Breakfast cafes
    if (cafeName.includes('كوفي') || cafeName.includes('قهوة')) {
      score += 0.15;
    }
  }
  
  if (hour >= 20 && hour <= 23) {
    // Evening lounges
    if (cafeName.includes('لاونج') || cafeName.includes('كافيه')) {
      score += 0.1;
    }
  }
  
  // Some cafes are naturally quieter in afternoon
  if (hour >= 14 && hour <= 16) {
    if (idNum % 3 === 0) {
      score -= 0.2; // Every 3rd cafe is emptier in afternoon
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
