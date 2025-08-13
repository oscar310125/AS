import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Translations = {
  en: {
    // Header & Navigation
    'nav.shop': 'Shop',
    'nav.categories': 'Categories',
    'nav.cart': 'Cart',
    'nav.orders': 'My Orders',
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Products',
    'nav.customers': 'Customers',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Store Info
    'store.name': 'AS',
    'store.description': 'Your trusted online store',
    
    // Product Page
    'products.search': 'Search products...',
    'products.allCategories': 'All Categories',
    'products.allProducts': 'All Products',
    'products.popular': 'Popular',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.inStock': 'In Stock',
    'products.lowStock': 'Low Stock',
    'products.noResults': 'No products found',
    'products.adjustFilters': 'Try adjusting your search or filter criteria',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Looks like you haven\'t added any items to your cart yet.',
    'cart.continueShopping': 'Continue Shopping',
    'cart.proceedCheckout': 'Proceed to Checkout',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.clearAll': 'Clear all items',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.complete': 'Complete your purchase',
    'checkout.backToCart': 'Back to Cart',
    'checkout.shipping': 'Shipping',
    'checkout.payment': 'Payment',
    'checkout.review': 'Review',
    'checkout.shippingInfo': 'Shipping Information',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.reviewOrder': 'Review Your Order',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.city': 'City',
    'checkout.state': 'Province',
    'checkout.selectState': 'Select a province',
    'checkout.deliveryType': 'Delivery Type',
    'checkout.homeDelivery': 'Home Delivery',
    'checkout.stopDesk': 'Stop Desk',
    'checkout.continuePayment': 'Continue to Payment',
    'checkout.backShipping': 'Back to Shipping',
    'checkout.reviewOrderBtn': 'Review Order',
    'checkout.backPayment': 'Back to Payment',
    'checkout.placeOrder': 'Place Order',
    'checkout.orderSummary': 'Order Summary',
    'checkout.discountCode': 'Discount Code',
    'checkout.enterCode': 'Enter your code',
    'checkout.apply': 'Apply',
    'checkout.remove': 'Remove',
    'checkout.secureCheckout': 'Secure checkout with SSL encryption',
    
    // Orders
    'orders.title': 'My Orders',
    'orders.track': 'Track and manage your orders',
    'orders.noOrders': 'No orders yet',
    'orders.noOrdersDesc': 'When you place your first order, it will appear here.',
    'orders.startShopping': 'Start Shopping',
    'orders.viewDetails': 'View Details',
    'orders.invoice': 'Invoice',
    'orders.trackOrder': 'Track',
    'orders.delivered': 'Delivered',
    'orders.shipped': 'Shipped',
    'orders.processing': 'Processing',
    'orders.placedOn': 'Placed on',
    'orders.tracking': 'Tracking',
    'orders.estimatedDelivery': 'Estimated Delivery',
    'orders.orderDetails': 'Order Details',
    'orders.orderInfo': 'Order Information',
    'orders.items': 'Items',
    'orders.orderSummary': 'Order Summary',
    
    // Settings
    'settings.title': 'Store Settings',
    'settings.configure': 'Configure your store preferences',
    'settings.general': 'General',
    'settings.delivery': 'Delivery',
    'settings.discounts': 'Discount Codes',
    'settings.generalSettings': 'General Settings',
    'settings.storeName': 'Store Name',
    'settings.storeDescription': 'Description',
    'settings.currency': 'Currency',
    'settings.taxRate': 'Tax Rate (%)',
    'settings.productOptions': 'Product Options',
    'settings.enableSizes': 'Enable size selection',
    'settings.enableColors': 'Enable color selection',
    'settings.enableWeightShipping': 'Weight-based shipping',
    'settings.enableDiscountCodes': 'Enable discount codes',
    'settings.deliverySettings': 'Delivery Settings',
    'settings.discountCodes': 'Discount Codes',
    'settings.addCode': 'Add Code',
    'settings.percentage': 'Percentage',
    'settings.fixedAmount': 'Fixed Amount',
    'settings.minOrder': 'Min. order (DA)',
    'settings.add': 'Add',
    'settings.cancel': 'Cancel',
    'settings.active': 'Active',
    'settings.inactive': 'Inactive',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.quantity': 'Quantity',
    'common.price': 'Price',
    'common.category': 'Category',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.featured': 'Featured',
    'common.priceLowHigh': 'Price: Low to High',
    'common.priceHighLow': 'Price: High to Low',
    'common.rating': 'Highest Rated',
    'common.nameAZ': 'Name A-Z',
  },
  
  fr: {
    // Header & Navigation
    'nav.shop': 'Boutique',
    'nav.categories': 'Catégories',
    'nav.cart': 'Panier',
    'nav.orders': 'Mes Commandes',
    'nav.dashboard': 'Tableau de Bord',
    'nav.products': 'Produits',
    'nav.customers': 'Clients',
    'nav.analytics': 'Analyses',
    'nav.settings': 'Paramètres',
    
    // Store Info
    'store.name': 'AS',
    'store.description': 'Votre boutique en ligne de confiance',
    
    // Product Page
    'products.search': 'Rechercher des produits...',
    'products.allCategories': 'Toutes les Catégories',
    'products.allProducts': 'Tous les Produits',
    'products.popular': 'Populaires',
    'products.addToCart': 'Ajouter au Panier',
    'products.outOfStock': 'Rupture de Stock',
    'products.inStock': 'En Stock',
    'products.lowStock': 'Stock Faible',
    'products.noResults': 'Aucun produit trouvé',
    'products.adjustFilters': 'Essayez d\'ajuster vos critères de recherche ou de filtre',
    
    // Cart
    'cart.title': 'Panier d\'Achat',
    'cart.empty': 'Votre panier est vide',
    'cart.emptyDesc': 'Il semble que vous n\'ayez encore ajouté aucun article à votre panier.',
    'cart.continueShopping': 'Continuer les Achats',
    'cart.proceedCheckout': 'Procéder au Paiement',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.tax': 'TVA',
    'cart.total': 'Total',
    'cart.clearAll': 'Vider le panier',
    
    // Checkout
    'checkout.title': 'Commande',
    'checkout.complete': 'Finalisez votre achat',
    'checkout.backToCart': 'Retour au Panier',
    'checkout.shipping': 'Livraison',
    'checkout.payment': 'Paiement',
    'checkout.review': 'Révision',
    'checkout.shippingInfo': 'Informations de Livraison',
    'checkout.paymentInfo': 'Informations de Paiement',
    'checkout.reviewOrder': 'Réviser Votre Commande',
    'checkout.firstName': 'Prénom',
    'checkout.lastName': 'Nom',
    'checkout.email': 'Email',
    'checkout.phone': 'Téléphone',
    'checkout.city': 'Ville',
    'checkout.state': 'Wilaya',
    'checkout.selectState': 'Sélectionnez une wilaya',
    'checkout.deliveryType': 'Type de Livraison',
    'checkout.homeDelivery': 'Livraison à Domicile',
    'checkout.stopDesk': 'Stop Desk',
    'checkout.continuePayment': 'Continuer vers le Paiement',
    'checkout.backShipping': 'Retour à la Livraison',
    'checkout.reviewOrderBtn': 'Réviser la Commande',
    'checkout.backPayment': 'Retour au Paiement',
    'checkout.placeOrder': 'Passer la Commande',
    'checkout.orderSummary': 'Résumé de la Commande',
    'checkout.discountCode': 'Code de Réduction',
    'checkout.enterCode': 'Entrez votre code',
    'checkout.apply': 'Appliquer',
    'checkout.remove': 'Supprimer',
    'checkout.secureCheckout': 'Paiement sécurisé avec cryptage SSL',
    
    // Orders
    'orders.title': 'Mes Commandes',
    'orders.track': 'Suivez et gérez vos commandes',
    'orders.noOrders': 'Aucune commande',
    'orders.noOrdersDesc': 'Quand vous passerez votre première commande, elle apparaîtra ici.',
    'orders.startShopping': 'Commencer les Achats',
    'orders.viewDetails': 'Voir les Détails',
    'orders.invoice': 'Facture',
    'orders.trackOrder': 'Suivre',
    'orders.delivered': 'Livré',
    'orders.shipped': 'Expédié',
    'orders.processing': 'En Traitement',
    'orders.placedOn': 'Passée le',
    'orders.tracking': 'Suivi',
    'orders.estimatedDelivery': 'Livraison Estimée',
    'orders.orderDetails': 'Détails de la Commande',
    'orders.orderInfo': 'Informations de Commande',
    'orders.items': 'Articles',
    'orders.orderSummary': 'Résumé de Commande',
    
    // Settings
    'settings.title': 'Paramètres du Magasin',
    'settings.configure': 'Configurez les préférences de votre boutique',
    'settings.general': 'Général',
    'settings.delivery': 'Livraison',
    'settings.discounts': 'Codes Promo',
    'settings.generalSettings': 'Paramètres Généraux',
    'settings.storeName': 'Nom du Magasin',
    'settings.storeDescription': 'Description',
    'settings.currency': 'Devise',
    'settings.taxRate': 'Taux de TVA (%)',
    'settings.productOptions': 'Options Produits',
    'settings.enableSizes': 'Activer la sélection de tailles',
    'settings.enableColors': 'Activer la sélection de couleurs',
    'settings.enableWeightShipping': 'Livraison basée sur le poids',
    'settings.enableDiscountCodes': 'Activer les codes de réduction',
    'settings.deliverySettings': 'Paramètres de Livraison',
    'settings.discountCodes': 'Codes de Réduction',
    'settings.addCode': 'Ajouter Code',
    'settings.percentage': 'Pourcentage',
    'settings.fixedAmount': 'Montant Fixe',
    'settings.minOrder': 'Commande min. (DA)',
    'settings.add': 'Ajouter',
    'settings.cancel': 'Annuler',
    'settings.active': 'Actif',
    'settings.inactive': 'Inactif',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.close': 'Fermer',
    'common.quantity': 'Quantité',
    'common.price': 'Prix',
    'common.category': 'Catégorie',
    'common.status': 'Statut',
    'common.actions': 'Actions',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.sort': 'Trier',
    'common.featured': 'En Vedette',
    'common.priceLowHigh': 'Prix: Croissant',
    'common.priceHighLow': 'Prix: Décroissant',
    'common.rating': 'Mieux Notés',
    'common.nameAZ': 'Nom A-Z',
  },
  
  ar: {
    // Header & Navigation
    'nav.shop': 'المتجر',
    'nav.categories': 'الفئات',
    'nav.cart': 'السلة',
    'nav.orders': 'طلباتي',
    'nav.dashboard': 'لوحة التحكم',
    'nav.products': 'المنتجات',
    'nav.customers': 'العملاء',
    'nav.analytics': 'التحليلات',
    'nav.settings': 'الإعدادات',
    
    // Store Info
    'store.name': 'AS',
    'store.description': 'متجرك الإلكتروني الموثوق',
    
    // Product Page
    'products.search': 'البحث عن المنتجات...',
    'products.allCategories': 'جميع الفئات',
    'products.allProducts': 'جميع المنتجات',
    'products.popular': 'الأكثر شعبية',
    'products.addToCart': 'أضف إلى السلة',
    'products.outOfStock': 'نفد من المخزون',
    'products.inStock': 'متوفر',
    'products.lowStock': 'مخزون منخفض',
    'products.noResults': 'لم يتم العثور على منتجات',
    'products.adjustFilters': 'حاول تعديل معايير البحث أو التصفية',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.emptyDesc': 'يبدو أنك لم تضف أي عناصر إلى سلتك بعد.',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.proceedCheckout': 'المتابعة للدفع',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.shipping': 'الشحن',
    'cart.tax': 'الضريبة',
    'cart.total': 'المجموع',
    'cart.clearAll': 'إفراغ السلة',
    
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.complete': 'أكمل عملية الشراء',
    'checkout.backToCart': 'العودة للسلة',
    'checkout.shipping': 'الشحن',
    'checkout.payment': 'الدفع',
    'checkout.review': 'المراجعة',
    'checkout.shippingInfo': 'معلومات الشحن',
    'checkout.paymentInfo': 'معلومات الدفع',
    'checkout.reviewOrder': 'مراجعة طلبك',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'اسم العائلة',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'الهاتف',
    'checkout.city': 'المدينة',
    'checkout.state': 'الولاية',
    'checkout.selectState': 'اختر ولاية',
    'checkout.deliveryType': 'نوع التوصيل',
    'checkout.homeDelivery': 'التوصيل للمنزل',
    'checkout.stopDesk': 'نقطة الاستلام',
    'checkout.continuePayment': 'المتابعة للدفع',
    'checkout.backShipping': 'العودة للشحن',
    'checkout.reviewOrderBtn': 'مراجعة الطلب',
    'checkout.backPayment': 'العودة للدفع',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.orderSummary': 'ملخص الطلب',
    'checkout.discountCode': 'كود الخصم',
    'checkout.enterCode': 'أدخل الكود',
    'checkout.apply': 'تطبيق',
    'checkout.remove': 'إزالة',
    'checkout.secureCheckout': 'دفع آمن مع تشفير SSL',
    
    // Orders
    'orders.title': 'طلباتي',
    'orders.track': 'تتبع وإدارة طلباتك',
    'orders.noOrders': 'لا توجد طلبات',
    'orders.noOrdersDesc': 'عندما تضع طلبك الأول، سيظهر هنا.',
    'orders.startShopping': 'ابدأ التسوق',
    'orders.viewDetails': 'عرض التفاصيل',
    'orders.invoice': 'الفاتورة',
    'orders.trackOrder': 'تتبع',
    'orders.delivered': 'تم التوصيل',
    'orders.shipped': 'تم الشحن',
    'orders.processing': 'قيد المعالجة',
    'orders.placedOn': 'تم الطلب في',
    'orders.tracking': 'التتبع',
    'orders.estimatedDelivery': 'التوصيل المتوقع',
    'orders.orderDetails': 'تفاصيل الطلب',
    'orders.orderInfo': 'معلومات الطلب',
    'orders.items': 'العناصر',
    'orders.orderSummary': 'ملخص الطلب',
    
    // Settings
    'settings.title': 'إعدادات المتجر',
    'settings.configure': 'قم بتكوين تفضيلات متجرك',
    'settings.general': 'عام',
    'settings.delivery': 'التوصيل',
    'settings.discounts': 'أكواد الخصم',
    'settings.generalSettings': 'الإعدادات العامة',
    'settings.storeName': 'اسم المتجر',
    'settings.storeDescription': 'الوصف',
    'settings.currency': 'العملة',
    'settings.taxRate': 'معدل الضريبة (%)',
    'settings.productOptions': 'خيارات المنتج',
    'settings.enableSizes': 'تفعيل اختيار الأحجام',
    'settings.enableColors': 'تفعيل اختيار الألوان',
    'settings.enableWeightShipping': 'الشحن حسب الوزن',
    'settings.enableDiscountCodes': 'تفعيل أكواد الخصم',
    'settings.deliverySettings': 'إعدادات التوصيل',
    'settings.discountCodes': 'أكواد الخصم',
    'settings.addCode': 'إضافة كود',
    'settings.percentage': 'نسبة مئوية',
    'settings.fixedAmount': 'مبلغ ثابت',
    'settings.minOrder': 'أقل طلب (دج)',
    'settings.add': 'إضافة',
    'settings.cancel': 'إلغاء',
    'settings.active': 'نشط',
    'settings.inactive': 'غير نشط',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.close': 'إغلاق',
    'common.quantity': 'الكمية',
    'common.price': 'السعر',
    'common.category': 'الفئة',
    'common.status': 'الحالة',
    'common.actions': 'الإجراءات',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.featured': 'مميز',
    'common.priceLowHigh': 'السعر: من الأقل للأعلى',
    'common.priceHighLow': 'السعر: من الأعلى للأقل',
    'common.rating': 'الأعلى تقييماً',
    'common.nameAZ': 'الاسم أ-ي',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'fr'; // Default to French
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}