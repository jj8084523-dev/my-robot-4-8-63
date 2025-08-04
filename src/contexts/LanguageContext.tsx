
import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  direction: 'ltr',
  toggleLanguage: () => {},
  t: (key: string) => key,
});

// Sample translations
const translations = {
  en: {
    // Auth
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.forgotPassword': 'Forgot password?',
    'login.submit': 'Login',
    'login.noAccount': "Don't have an account yet?",
    'login.register': 'Register now',
    
    'register.title': 'Register for My Robot',
    'register.subtitle': 'Create an account to enroll your child in our courses',
    'register.parentInfo': 'Parent Information',
    'register.studentInfo': 'Student Information',
    'register.confirmReg': 'Confirm Registration',
    'register.parentName': 'Parent Full Name',
    'register.email': 'Email',
    'register.phone': 'Phone Number',
    'register.studentName': 'Student Name',
    'register.studentAge': 'Student Age',
    'register.interest': 'Interest Area',
    'register.level': 'Course Level',
    'register.coupon': 'Coupon Code (optional)',
    'register.terms': 'I agree to the terms and conditions',
    'register.back': 'Back',
    'register.continue': 'Continue',
    'register.complete': 'Complete Registration',
    'register.haveAccount': 'Already have an account?',
    'register.signIn': 'Sign in',
    
    // Dashboard
    'dashboard.overview': 'Dashboard Overview',
    'dashboard.totalReg': 'Total Registrations',
    'dashboard.activeCourses': 'Active Courses',
    'dashboard.pendingApproval': 'Pending Approvals',
    'dashboard.revenue': 'Revenue',
    'dashboard.regTrend': 'Registration Trend',
    'dashboard.recentActivity': 'Recent Activity',
    
    'courses.title': 'Courses Management',
    'courses.addNew': 'Add New Course',
    'courses.search': 'Search courses...',
    'courses.filter': 'Filter',
    'courses.name': 'Course Name',
    'courses.level': 'Level',
    'courses.ageRange': 'Age Range',
    'courses.enrolled': 'Enrolled',
    'courses.schedule': 'Schedule',
    'courses.coordinator': 'Coordinator',
    'courses.actions': 'Actions',
    
    'users.title': 'User Management',
    'users.all': 'All Users',
    'users.active': 'Active',
    'users.pending': 'Pending',
    'users.inactive': 'Inactive',
    'users.search': 'Search users...',
    'users.filters': 'Filters',
    'users.parent': 'Parent',
    'users.status': 'Status',
    'users.payment': 'Payment',
    
    'attendance.title': 'Attendance Tracking',
    'payments.title': 'Payment Management',
    
    // Common
    'common.thisMonth': 'This month',
    'common.export': 'Export CSV',
    'common.view': 'View',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
  },
  ar: {
    // Auth
    'login.title': 'تسجيل الدخول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.submit': 'تسجيل الدخول',
    'login.noAccount': 'ليس لديك حساب بعد؟',
    'login.register': 'سجل الآن',
    
    'register.title': 'التسجيل في روبوتي',
    'register.subtitle': 'أنشئ حسابًا لتسجيل طفلك في دوراتنا',
    'register.parentInfo': 'معلومات ولي الأمر',
    'register.studentInfo': 'معلومات الطالب',
    'register.confirmReg': 'تأكيد التسجيل',
    'register.parentName': 'اسم ولي الأمر الكامل',
    'register.email': 'البريد الإلكتروني',
    'register.phone': 'رقم الهاتف',
    'register.studentName': 'اسم الطالب',
    'register.studentAge': 'عمر الطالب',
    'register.interest': 'مجال الاهتمام',
    'register.level': 'مستوى الدورة',
    'register.coupon': 'رمز القسيمة (اختياري)',
    'register.terms': 'أوافق على الشروط والأحكام',
    'register.back': 'رجوع',
    'register.continue': 'متابعة',
    'register.complete': 'إتمام التسجيل',
    'register.haveAccount': 'لديك حساب بالفعل؟',
    'register.signIn': 'تسجيل الدخول',
    
    // Dashboard
    'dashboard.overview': 'نظرة عامة على لوحة التحكم',
    'dashboard.totalReg': 'إجمالي التسجيلات',
    'dashboard.activeCourses': 'الدورات النشطة',
    'dashboard.pendingApproval': 'في انتظار الموافقة',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.regTrend': 'اتجاه التسجيل',
    'dashboard.recentActivity': 'النشاط الأخير',
    
    'courses.title': 'إدارة الدورات',
    'courses.addNew': 'إضافة دورة جديدة',
    'courses.search': 'البحث عن دورات...',
    'courses.filter': 'تصفية',
    'courses.name': 'اسم الدورة',
    'courses.level': 'المستوى',
    'courses.ageRange': 'الفئة العمرية',
    'courses.enrolled': 'المسجلون',
    'courses.schedule': 'الجدول',
    'courses.coordinator': 'المنسق',
    'courses.actions': 'الإجراءات',
    
    'users.title': 'إدارة المستخدمين',
    'users.all': 'جميع المستخدمين',
    'users.active': 'نشط',
    'users.pending': 'قيد الانتظار',
    'users.inactive': 'غير نشط',
    'users.search': 'البحث عن مستخدمين...',
    'users.filters': 'التصفية',
    'users.parent': 'ولي الأمر',
    'users.status': 'الحالة',
    'users.payment': 'الدفع',
    
    'attendance.title': 'تتبع الحضور',
    'payments.title': 'إدارة المدفوعات',
    
    // Common
    'common.thisMonth': 'هذا الشهر',
    'common.export': 'تصدير CSV',
    'common.view': 'عرض',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.search': 'بحث',
    'common.submit': 'إرسال',
    'common.reset': 'إعادة تعيين',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Check if localStorage has a saved language preference
  const savedLanguage = localStorage.getItem('language') as Language;
  const initialLanguage: Language = savedLanguage || 'en';
  
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Set the HTML dir attribute and lang when language changes
  const setDocumentAttributes = (lang: Language, dir: Direction) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    
    // Add any additional styling adjustments for RTL if needed
    if (dir === 'rtl') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  };

  // Set initial document attributes
  setDocumentAttributes(language, direction);

  // Toggle between languages
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    
    setLanguage(newLanguage);
    setDocumentAttributes(newLanguage, newDirection);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    const translationMap = translations[language];
    return translationMap[key as keyof typeof translationMap] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
