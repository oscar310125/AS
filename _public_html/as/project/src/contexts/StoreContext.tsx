import React, { createContext, useContext, useState, useEffect } from 'react';

interface StoreSettings {
  storeName: string;
  storeDescription: string;
  currency: string;
  taxRate: number;
  defaultShippingPrice: number;
  enableWeightBasedShipping: boolean;
  enableDiscountCodes: boolean;
  enableSizeSelection: boolean;
  enableColorSelection: boolean;
}

interface DeliveryPrice {
  state: string;
  homeDelivery: number;
  stopDesk: number;
  weightMultiplier?: number;
}

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
  expiryDate?: string;
  minOrderAmount?: number;
}

interface StoreContextType {
  settings: StoreSettings;
  deliveryPrices: DeliveryPrice[];
  discountCodes: DiscountCode[];
  updateSettings: (settings: Partial<StoreSettings>) => void;
  updateDeliveryPrices: (prices: DeliveryPrice[]) => void;
  addDiscountCode: (code: DiscountCode) => void;
  updateDiscountCode: (id: string, code: Partial<DiscountCode>) => void;
  deleteDiscountCode: (id: string) => void;
  validateDiscountCode: (code: string, orderAmount: number) => DiscountCode | null;
  calculateDeliveryPrice: (state: string, deliveryType: 'home' | 'stopDesk', weight?: number) => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Wilayas d'Algérie avec prix de livraison
const defaultDeliveryPrices: DeliveryPrice[] = [
  { state: 'Adrar', homeDelivery: 1600, stopDesk: 800, weightMultiplier: 1.2 },
  { state: 'Chlef', homeDelivery: 900, stopDesk: 450, weightMultiplier: 1.0 },
  { state: 'Laghouat', homeDelivery: 1200, stopDesk: 600, weightMultiplier: 1.1 },
  { state: 'Oum El Bouaghi', homeDelivery: 900, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Batna', homeDelivery: 850, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Béjaïa', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Biskra', homeDelivery: 850, stopDesk: 350, weightMultiplier: 1.1 },
  { state: 'Béchar', homeDelivery: 1400, stopDesk: 800, weightMultiplier: 1.3 },
  { state: 'Blida', homeDelivery: 800, stopDesk: 350, weightMultiplier: 0.8 },
  { state: 'Bouira', homeDelivery: 850, stopDesk: 400, weightMultiplier: 0.9 },
  { state: 'Tamanrasset', homeDelivery: 1600, stopDesk: 1000, weightMultiplier: 1.5 },
  { state: 'Tébessa', homeDelivery: 800, stopDesk: 600, weightMultiplier: 1.1 },
  { state: 'Tlemcen', homeDelivery: 900, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Tiaret', homeDelivery: 950, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Tizi Ouzou', homeDelivery: 850, stopDesk: 400, weightMultiplier: 0.9 },
  { state: 'Alger', homeDelivery: 750, stopDesk: 350, weightMultiplier: 0.7 },
  { state: 'Djelfa', homeDelivery: 1200, stopDesk: 600, weightMultiplier: 1.0 },
  { state: 'Jijel', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Sétif', homeDelivery: 850, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Saïda', homeDelivery: 1000, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Skikda', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Sidi Bel Abbès', homeDelivery: 900, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Annaba', homeDelivery: 850, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Guelma', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Constantine', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Médéa', homeDelivery: 850, stopDesk: 400, weightMultiplier: 0.9 },
  { state: 'Mostaganem', homeDelivery: 900, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'M\'Sila', homeDelivery: 900, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Mascara', homeDelivery: 950, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Ouargla', homeDelivery: 1200, stopDesk: 600, weightMultiplier: 1.2 },
  { state: 'Oran', homeDelivery: 900, stopDesk: 350, weightMultiplier: 0.9 },
  { state: 'El Bayadh', homeDelivery: 1400, stopDesk: 600, weightMultiplier: 1.1 },
  { state: 'Illizi', homeDelivery: 1800, stopDesk: 1200, weightMultiplier: 1.4 },
  { state: 'Bordj Bou Arreridj', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Boumerdès', homeDelivery: 650, stopDesk: 400, weightMultiplier: 0.8 },
  { state: 'El Tarf', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.1 },
  { state: 'Tindouf', homeDelivery: 1600, stopDesk: 1000, weightMultiplier: 1.4 },
  { state: 'Tissemsilt', homeDelivery: 950, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'El Oued', homeDelivery: 1000, stopDesk: 600, weightMultiplier: 1.1 },
  { state: 'Khenchela', homeDelivery: 800, stopDesk: 350, weightMultiplier: 1.1 },
  { state: 'Souk Ahras', homeDelivery: 850, stopDesk: 400, weightMultiplier: 1.1 },
  { state: 'Tipaza', homeDelivery: 850, stopDesk: 350, weightMultiplier: 0.8 },
  { state: 'Mila', homeDelivery: 800, stopDesk: 350, weightMultiplier: 1.0 },
  { state: 'Aïn Defla', homeDelivery: 900, stopDesk: 400, weightMultiplier: 0.9 },
  { state: 'Naâma', homeDelivery: 1400, stopDesk: 800, weightMultiplier: 1.2 },
  { state: 'Aïn Témouchent', homeDelivery: 950, stopDesk: 400, weightMultiplier: 1.0 },
  { state: 'Ghardaïa', homeDelivery: 1200, stopDesk: 600, weightMultiplier: 1.1 },
  { state: 'Relizane', homeDelivery: 950, stopDesk: 400, weightMultiplier: 1.0 }
];

const defaultSettings: StoreSettings = {
  storeName: 'AS',
  storeDescription: 'Votre boutique en ligne de confiance',
  currency: 'DA',
  taxRate: 19,
  defaultShippingPrice: 500,
  enableWeightBasedShipping: true,
  enableDiscountCodes: true,
  enableSizeSelection: true,
  enableColorSelection: true
};

const defaultDiscountCodes: DiscountCode[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    isActive: true,
    minOrderAmount: 5000
  },
  {
    id: '2',
    code: 'SAVE500',
    type: 'fixed',
    value: 500,
    isActive: true,
    minOrderAmount: 2000
  },
  {
    id: '3',
    code: 'NEWCLIENT',
    type: 'percentage',
    value: 15,
    isActive: true,
    minOrderAmount: 10000
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('storeSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [deliveryPrices, setDeliveryPrices] = useState<DeliveryPrice[]>(() => {
    const saved = localStorage.getItem('deliveryPrices');
    return saved ? JSON.parse(saved) : defaultDeliveryPrices;
  });

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(() => {
    const saved = localStorage.getItem('discountCodes');
    return saved ? JSON.parse(saved) : defaultDiscountCodes;
  });

  useEffect(() => {
    localStorage.setItem('storeSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('deliveryPrices', JSON.stringify(deliveryPrices));
  }, [deliveryPrices]);

  useEffect(() => {
    localStorage.setItem('discountCodes', JSON.stringify(discountCodes));
  }, [discountCodes]);

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateDeliveryPrices = (prices: DeliveryPrice[]) => {
    setDeliveryPrices(prices);
  };

  const addDiscountCode = (code: DiscountCode) => {
    setDiscountCodes(prev => [...prev, code]);
  };

  const updateDiscountCode = (id: string, updates: Partial<DiscountCode>) => {
    setDiscountCodes(prev => prev.map(code => 
      code.id === id ? { ...code, ...updates } : code
    ));
  };

  const deleteDiscountCode = (id: string) => {
    setDiscountCodes(prev => prev.filter(code => code.id !== id));
  };

  const validateDiscountCode = (code: string, orderAmount: number): DiscountCode | null => {
    const discount = discountCodes.find(d => 
      d.code.toLowerCase() === code.toLowerCase() && 
      d.isActive &&
      (!d.minOrderAmount || orderAmount >= d.minOrderAmount) &&
      (!d.expiryDate || new Date(d.expiryDate) > new Date())
    );
    return discount || null;
  };

  const calculateDeliveryPrice = (state: string, deliveryType: 'home' | 'stopDesk', weight = 1): number => {
    const statePrice = deliveryPrices.find(p => p.state === state);
    if (!statePrice) return settings.defaultShippingPrice;

    const basePrice = deliveryType === 'home' ? statePrice.homeDelivery : statePrice.stopDesk;
    
    if (settings.enableWeightBasedShipping && statePrice.weightMultiplier) {
      return Math.round(basePrice * (weight * statePrice.weightMultiplier));
    }
    
    return basePrice;
  };

  return (
    <StoreContext.Provider value={{
      settings,
      deliveryPrices,
      discountCodes,
      updateSettings,
      updateDeliveryPrices,
      addDiscountCode,
      updateDiscountCode,
      deleteDiscountCode,
      validateDiscountCode,
      calculateDeliveryPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}