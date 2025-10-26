import { NextRequest, NextResponse } from 'next/server';
import { City } from '@/app/types';
import { getCafesForCity } from '@/app/lib/crowdedness';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city') as City;
  
  if (!city) {
    return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
  }
  
  // Get real-time AI-analyzed data
  const cafes = getCafesForCity(city).map(cafe => ({
    ...cafe,
    lastUpdated: new Date().toISOString(),
  }));
  
  if (cafes.length === 0) {
    return NextResponse.json({ error: 'Invalid city' }, { status: 400 });
  }
  
  return NextResponse.json({
    cafes,
    timestamp: new Date().toISOString(),
    city,
  });
}