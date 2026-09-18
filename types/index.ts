export type CategoryType = 'all' | 'root' | 'leafy' | 'boxes';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  unit: string;
  imageUrl: string;
  isFreshPicked: boolean;
  description: string;
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