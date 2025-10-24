export type CrowdLevel = 'busy' | 'moderate' | 'empty';

export interface Cafe {
  id: string;
  name: string;
  logo: string;
  crowdLevel: CrowdLevel;
  city: string;
}

export type City = 'عنيزة' | 'بريدة' | 'الرس' | 'البكيرية';

export interface User {
  contact: string;
  verified: boolean;
  selectedCity?: City;
}
