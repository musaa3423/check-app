import { Cafe, City } from '../types';

// Mock cafe data for عنيزة (Unaizah)
export const cafesData: Record<City, Cafe[]> = {
  'عنيزة': [
    { id: '1', name: 'كوفي لاونج', logo: '☕', crowdLevel: 'empty', city: 'عنيزة' },
    { id: '2', name: 'ميراج كافيه', logo: '🏛️', crowdLevel: 'moderate', city: 'عنيزة' },
    { id: '3', name: 'لافندر كافيه', logo: '🌸', crowdLevel: 'busy', city: 'عنيزة' },
    { id: '4', name: 'سمرلاند كافيه', logo: '🌞', crowdLevel: 'empty', city: 'عنيزة' },
    { id: '5', name: 'كوفي بلس', logo: '☕', crowdLevel: 'moderate', city: 'عنيزة' },
    { id: '6', name: 'بلاك آند وايت', logo: '⚫', crowdLevel: 'busy', city: 'عنيزة' },
    { id: '7', name: 'كافيه دي روما', logo: '🏺', crowdLevel: 'empty', city: 'عنيزة' },
    { id: '8', name: 'ذا كافيه', logo: '🎭', crowdLevel: 'moderate', city: 'عنيزة' },
  ],
  'بريدة': [
    { id: '9', name: 'ستاربكس', logo: '⭐', crowdLevel: 'busy', city: 'بريدة' },
    { id: '10', name: 'كافيه لاتيه', logo: '☕', crowdLevel: 'moderate', city: 'بريدة' },
    { id: '11', name: 'نسكافيه', logo: '🥤', crowdLevel: 'empty', city: 'بريدة' },
    { id: '12', name: 'كوفي هاوس', logo: '🏠', crowdLevel: 'empty', city: 'بريدة' },
  ],
  'الرس': [
    { id: '13', name: 'كافيه الواحة', logo: '🌴', crowdLevel: 'moderate', city: 'الرس' },
    { id: '14', name: 'قهوتي', logo: '☕', crowdLevel: 'empty', city: 'الرس' },
    { id: '15', name: 'الكافيه الملكي', logo: '👑', crowdLevel: 'busy', city: 'الرس' },
  ],
  'البكيرية': [
    { id: '16', name: 'كوفي شوب', logo: '☕', crowdLevel: 'empty', city: 'البكيرية' },
    { id: '17', name: 'كافيه الحديقة', logo: '🌳', crowdLevel: 'moderate', city: 'البكيرية' },
    { id: '18', name: 'بلاك كوفي', logo: '⚫', crowdLevel: 'busy', city: 'البكيرية' },
  ],
};

export function getCafesForCity(city: City): Cafe[] {
  return cafesData[city] || [];
}

export function getSuggestedCafes(city: City): Cafe[] {
  return cafesData[city].filter(cafe => cafe.crowdLevel === 'empty');
}
