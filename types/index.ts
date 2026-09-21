export type CategoryType = 'all' | 'root' | 'leafy' | 'boxes';

export type DayCode = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  season: 'winter' | 'summer';
  isAvailable: boolean;
  category?: string;
}

export interface Market {
  id: string;
  dayCode: DayCode;
  day: string;
  locationName: string;
  address: string;
  hours: string;
  standInfo: string;
  isOrganicOnly: boolean;
  googleMapsUrl?: string;
  isActive: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  inquiryType: 'general' | 'order' | 'visit';
  message: string;
}

export interface MarketSchedule {
  id: string;
  day: string;             // π.χ. "Δευτέρα"
  dayCode: DayCode;        // Για προγραμματιστική σύγκριση (π.χ. 'mon')
  locationName: string;    // π.χ. "Λαϊκή Αγορά Κηφισιάς"
  address: string;         // π.χ. "Οδός Χαριλάου Τρικούπη & Ελαιών"
  hours: string;           // π.χ. "07:00 - 14:30"
  standInfo: string;       // π.χ. "Πόστο 14 (Έναντι Πάρκου)"
  googleMapsUrl?: string;  // Link για πλοήγηση
  isOrganicOnly?: boolean; // Badge για αμιγώς βιολογική αγορά
}



