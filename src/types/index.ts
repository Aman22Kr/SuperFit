export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'strength' | 'cardio' | 'wellness' | 'dance' | 'recovery';
  shortDesc: string;
  fullDesc: string;
  intensity: 'Beginner' | 'Moderate' | 'High Intensity' | 'All Levels' | 'Moderate to High' | 'Customized';
  duration: string;
  caloriesBurned: string;
  image: string;
  benefits: string[];
  equipmentUsed: string[];
  suitableFor: string[];
  scheduleSlot: string;
}

export interface MembershipPlan {
  id: string;
  title: string;
  period: string;
  monthlyEquivalent: number;
  totalPrice: number;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  tagline: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  certifications: string[];
  specialties: string[];
  bio: string;
  branch: 'Thane' | 'Dombivli' | 'Both';
  image: string;
}

export interface ScheduleClass {
  id: string;
  time: string;
  title: string;
  category: string;
  trainer: string;
  branch: string;
  days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
  room: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  branch: string;
  quote: string;
  result: string;
  rating: number;
}

export interface BranchInfo {
  id: string;
  name: string;
  city: string;
  address: string;
  landmark: string;
  phone: string;
  altPhone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  facilities: string[];
}

export interface CartItem {
  id: string;
  type: 'membership' | 'daypass' | 'assessment';
  title: string;
  price: number;
  branch: string;
  dateAdded: string;
  details?: string;
}

export interface BookingRecord {
  bookingId: string;
  fullName: string;
  phone: string;
  email: string;
  branch: string;
  itemTitle: string;
  type: string;
  price: number;
  bookingDate: string;
  status: 'Confirmed' | 'Pending Verification';
}

export interface AdBanner {
  id: string;
  brand: string;
  tagline: string;
  ctaText: string;
  linkText: string;
  highlight: string;
}
