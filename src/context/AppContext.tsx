import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, BookingRecord } from '../types';

interface BmiRecord {
  id: string;
  date: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: string;
  dailyCalories: number;
  goal: string;
}

interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  branch: string;
  serviceInterest: string;
  message: string;
  date: string;
}

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'dateAdded'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  bookings: BookingRecord[];
  confirmCheckout: (customerInfo: { fullName: string; phone: string; email: string; branch: string }) => BookingRecord[];
  
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  inquiries: InquiryRecord[];
  submitInquiry: (data: Omit<InquiryRecord, 'id' | 'date'>) => void;

  bmiHistory: BmiRecord[];
  saveBmiRecord: (record: Omit<BmiRecord, 'id' | 'date'>) => void;

  selectedBranch: 'Thane' | 'Dombivli';
  setSelectedBranch: (branch: 'Thane' | 'Dombivli') => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  animationSpeed: 'NORMAL' | 'SLOW' | 'FAST' | 'OFF';
  setAnimationSpeed: (speed: 'NORMAL' | 'SLOW' | 'FAST' | 'OFF') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'superfit_cart_v1',
  BOOKINGS: 'superfit_bookings_v1',
  FAVORITES: 'superfit_favorites_v1',
  INQUIRIES: 'superfit_inquiries_v1',
  BMI: 'superfit_bmi_history_v1',
  BRANCH: 'superfit_branch_pref_v1',
  ANIMATION: 'superfit_anim_pref_v1',
};

function getSafeStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getSafeStorage<CartItem[]>(STORAGE_KEYS.CART, []));
  const [bookings, setBookings] = useState<BookingRecord[]>(() => getSafeStorage<BookingRecord[]>(STORAGE_KEYS.BOOKINGS, []));
  const [favorites, setFavorites] = useState<string[]>(() => getSafeStorage<string[]>(STORAGE_KEYS.FAVORITES, ['strength-training', 'power-yoga']));
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => getSafeStorage<InquiryRecord[]>(STORAGE_KEYS.INQUIRIES, []));
  const [bmiHistory, setBmiHistory] = useState<BmiRecord[]>(() => getSafeStorage<BmiRecord[]>(STORAGE_KEYS.BMI, []));
  const [selectedBranch, setSelectedBranchState] = useState<'Thane' | 'Dombivli'>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.BRANCH);
    return stored === 'Dombivli' ? 'Dombivli' : 'Thane';
  });
  const [animationSpeed, setAnimationSpeedState] = useState<'NORMAL' | 'SLOW' | 'FAST' | 'OFF'>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ANIMATION);
    return (stored as any) || 'NORMAL';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // storage full or disabled
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BMI, JSON.stringify(bmiHistory));
    } catch {}
  }, [bmiHistory]);

  const setSelectedBranch = (branch: 'Thane' | 'Dombivli') => {
    setSelectedBranchState(branch);
    try {
      localStorage.setItem(STORAGE_KEYS.BRANCH, branch);
    } catch {}
  };

  const setAnimationSpeed = (speed: 'NORMAL' | 'SLOW' | 'FAST' | 'OFF') => {
    setAnimationSpeedState(speed);
    try {
      localStorage.setItem(STORAGE_KEYS.ANIMATION, speed);
    } catch {}
  };

  const addToCart = (item: Omit<CartItem, 'id' | 'dateAdded'>) => {
    const newItem: CartItem = {
      ...item,
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      dateAdded: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmCheckout = (customerInfo: { fullName: string; phone: string; email: string; branch: string }) => {
    const newBookings: BookingRecord[] = cart.map((item, idx) => ({
      bookingId: 'SF-' + Math.floor(100000 + Math.random() * 900000) + '-' + (idx + 1),
      fullName: customerInfo.fullName,
      phone: customerInfo.phone,
      email: customerInfo.email,
      branch: customerInfo.branch,
      itemTitle: item.title,
      type: item.type,
      price: item.price,
      bookingDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Confirmed',
    }));

    setBookings((prev) => [...newBookings, ...prev]);
    clearCart();
    return newBookings;
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const submitInquiry = (data: Omit<InquiryRecord, 'id' | 'date'>) => {
    const record: InquiryRecord = {
      ...data,
      id: 'inq_' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setInquiries((prev) => [record, ...prev]);
  };

  const saveBmiRecord = (data: Omit<BmiRecord, 'id' | 'date'>) => {
    const record: BmiRecord = {
      ...data,
      id: 'bmi_' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setBmiHistory((prev) => [record, ...prev.slice(0, 9)]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        bookings,
        confirmCheckout,
        favorites,
        toggleFavorite,
        isFavorite,
        inquiries,
        submitInquiry,
        bmiHistory,
        saveBmiRecord,
        selectedBranch,
        setSelectedBranch,
        isSearchOpen,
        setIsSearchOpen,
        animationSpeed,
        setAnimationSpeed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
