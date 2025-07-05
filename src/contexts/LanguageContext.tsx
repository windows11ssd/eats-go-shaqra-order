import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // App Name
    appName: 'جو شقراء',
    
    // User Type Selection
    selectUserType: 'اختر نوع المستخدم',
    drivers: 'السائقين',
    restaurantOwners: 'أصحاب المطاعم',
    users: 'المستخدمين',
    
    // Forms
    name: 'الاسم',
    nationality: 'الجنسية',
    age: 'العمر',
    idNumber: 'رقم الهوية',
    phoneNumber: 'رقم الهاتف',
    restaurantName: 'اسم المطعم',
    contactNumber: 'رقم التواصل',
    mealName: 'اسم الوجبة',
    mealPrice: 'سعر الوجبة',
    mealSize: 'حجم الوجبة',
    
    // Buttons
    send: 'إرسال',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    forgotPassword: 'نسيت كلمة المرور؟',
    
    // Messages
    driverRequestSent: 'تم إرسال طلبك، سنقوم بمراجعته والرد عليك',
    clickToAddMeals: 'اضغط هنا لبدء إضافة الوجبات',
    
    // Navigation
    home: 'الرئيسية',
    profile: 'الملف الشخصي',
    orders: 'الطلبات',
    cart: 'العربة',
    
    // Language & Theme
    language: 'اللغة',
    theme: 'الوضع',
    light: 'فاتح',
    dark: 'داكن',
    
    // Food Categories
    fastFood: 'وجبات سريعة',
    traditional: 'أكلات شعبية',
    healthy: 'أكل صحي',
    desserts: 'حلويات',
    
    // Order Status
    preparing: 'جاري التحضير',
    onTheWay: 'في الطريق',
    delivered: 'تم التسليم'
  },
  en: {
    // App Name
    appName: 'Go Shaqra',
    
    // User Type Selection
    selectUserType: 'Select User Type',
    drivers: 'Drivers',
    restaurantOwners: 'Restaurant Owners',
    users: 'Users',
    
    // Forms
    name: 'Name',
    nationality: 'Nationality',
    age: 'Age',
    idNumber: 'ID Number',
    phoneNumber: 'Phone Number',
    restaurantName: 'Restaurant Name',
    contactNumber: 'Contact Number',
    mealName: 'Meal Name',
    mealPrice: 'Meal Price',
    mealSize: 'Meal Size',
    
    // Buttons
    send: 'Send',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    
    // Messages
    driverRequestSent: 'Your request has been sent, we will review it and get back to you',
    clickToAddMeals: 'Click here to start adding meals',
    
    // Navigation
    home: 'Home',
    profile: 'Profile',
    orders: 'Orders',
    cart: 'Cart',
    
    // Language & Theme
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    
    // Food Categories
    fastFood: 'Fast Food',
    traditional: 'Traditional Food',
    healthy: 'Healthy Food',
    desserts: 'Desserts',
    
    // Order Status
    preparing: 'Preparing',
    onTheWay: 'On the Way',
    delivered: 'Delivered'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar'); // Arabic default

  useEffect(() => {
    const savedLanguage = localStorage.getItem('go-shaqra-language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('go-shaqra-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      isRTL: language === 'ar'
    }}>
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