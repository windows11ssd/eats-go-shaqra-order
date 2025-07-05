import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Truck, Store, User, Globe, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-food.jpg';

const UserTypeSelection = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      {/* Header with controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-4">
        {/* Language Toggle */}
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <Label htmlFor="language-switch" className="text-sm">
              {t('language')}
            </Label>
            <div className="flex items-center gap-2">
              <span className={language === 'en' ? 'font-medium' : ''}>EN</span>
              <Switch
                id="language-switch"
                checked={language === 'ar'}
                onCheckedChange={(checked) => setLanguage(checked ? 'ar' : 'en')}
              />
              <span className={language === 'ar' ? 'font-medium' : ''}>العربية</span>
            </div>
          </div>
        </Card>

        {/* Theme Toggle */}
        <Card className="p-3">
          <div className="flex items-center gap-2">
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <Label htmlFor="theme-switch" className="text-sm">
              {t('theme')}
            </Label>
            <Switch
              id="theme-switch"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {/* Hero Image */}
        <div className="mb-8 relative">
          <img 
            src={heroImage} 
            alt="Go Shaqra Food Delivery"
            className="w-64 h-64 object-cover rounded-full shadow-strong"
          />
          <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20"></div>
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          {t('appName')}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-md">
          {t('selectUserType')}
        </p>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Drivers Card */}
          <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/driver-form')}>
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Truck className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t('drivers')}</h3>
              <p className="text-muted-foreground mb-6">
                {isRTL ? 'انضم كسائق توصيل' : 'Join as a delivery driver'}
              </p>
              <Button variant="outline" className="w-full">
                {isRTL ? 'ابدأ الآن' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>

          {/* Restaurant Owners Card */}
          <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/restaurant-form')}>
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Store className="w-10 h-10 text-secondary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t('restaurantOwners')}</h3>
              <p className="text-muted-foreground mb-6">
                {isRTL ? 'اضف مطعمك للمنصة' : 'Add your restaurant to the platform'}
              </p>
              <Button variant="outline" className="w-full">
                {isRTL ? 'ابدأ الآن' : 'Get Started'}  
              </Button>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card className="group hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate('/home')}>
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t('users')}</h3>
              <p className="text-muted-foreground mb-6">
                {isRTL ? 'اطلب طعامك المفضل' : 'Order your favorite food'}
              </p>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                {isRTL ? 'ابدأ الطلب' : 'Start Ordering'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;