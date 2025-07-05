import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Store, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const RestaurantForm = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1); // 1: Restaurant Info, 2: Add Meals
  const [restaurantData, setRestaurantData] = useState({
    restaurantName: '',
    contactNumber: ''
  });
  
  const [mealData, setMealData] = useState({
    mealName: '',
    mealPrice: '',
    mealSize: '',
    mealImage: null as File | null
  });

  const handleRestaurantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally store to Supabase
    // For now, we'll show a success message and move to step 2
    toast({
      title: isRTL ? "تم الحفظ" : "Saved",
      description: t('clickToAddMeals'),
      variant: "default",
    });
    
    setStep(2);
  };

  const handleMealSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally store meal data to Supabase
    toast({
      title: isRTL ? "تم إضافة الوجبة" : "Meal Added",
      description: isRTL ? "تم إضافة الوجبة بنجاح" : "Meal added successfully",
      variant: "default",
    });

    // Reset meal form
    setMealData({
      mealName: '',
      mealPrice: '',
      mealSize: '',
      mealImage: null
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMealData(prev => ({ ...prev, mealImage: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
          className="mb-6"
        >
          {isRTL ? <ArrowRight className="w-4 h-4 mr-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'العودة' : 'Back'}
        </Button>

        {step === 1 && (
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {isRTL ? 'معلومات المطعم' : 'Restaurant Information'}
              </CardTitle>
              <p className="text-muted-foreground">
                {isRTL ? 'املأ بيانات المطعم للانضمام' : 'Fill restaurant details to join'}
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleRestaurantSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="restaurantName">{t('restaurantName')}</Label>
                  <Input
                    id="restaurantName"
                    value={restaurantData.restaurantName}
                    onChange={(e) => setRestaurantData(prev => ({ ...prev, restaurantName: e.target.value }))}
                    placeholder={isRTL ? 'أدخل اسم المطعم' : 'Enter restaurant name'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactNumber">{t('contactNumber')}</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={restaurantData.contactNumber}
                    onChange={(e) => setRestaurantData(prev => ({ ...prev, contactNumber: e.target.value }))}
                    placeholder={isRTL ? 'أدخل رقم التواصل' : 'Enter contact number'}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-secondary hover:opacity-90 mt-6"
                >
                  {t('send')}
                </Button>
              </form>

              {/* Supabase Connection Notice */}
              <div className="mt-6 p-4 bg-gradient-hero rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground text-center">
                  {isRTL 
                    ? 'ملاحظة: لحفظ البيانات في قاعدة البيانات، يرجى ربط المشروع بـ Supabase'
                    : 'Note: To save data to database, please connect the project to Supabase'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {isRTL ? 'إضافة وجبة' : 'Add Meal'}
              </CardTitle>
              <p className="text-muted-foreground">
                {isRTL ? 'اضف وجبات مطعمك' : 'Add your restaurant meals'}
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleMealSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="mealName">{t('mealName')}</Label>
                  <Input
                    id="mealName"
                    value={mealData.mealName}
                    onChange={(e) => setMealData(prev => ({ ...prev, mealName: e.target.value }))}
                    placeholder={isRTL ? 'أدخل اسم الوجبة' : 'Enter meal name'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mealPrice">{t('mealPrice')}</Label>
                  <Input
                    id="mealPrice"
                    type="number"
                    step="0.01"
                    value={mealData.mealPrice}
                    onChange={(e) => setMealData(prev => ({ ...prev, mealPrice: e.target.value }))}
                    placeholder={isRTL ? 'أدخل سعر الوجبة' : 'Enter meal price'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mealSize">{t('mealSize')}</Label>
                  <Input
                    id="mealSize"
                    value={mealData.mealSize}
                    onChange={(e) => setMealData(prev => ({ ...prev, mealSize: e.target.value }))}
                    placeholder={isRTL ? 'أدخل حجم الوجبة' : 'Enter meal size'}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mealImage">
                    {isRTL ? 'صورة الوجبة (640x640)' : 'Meal Image (640x640)'}
                  </Label>
                  <Input
                    id="mealImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                  />
                  {mealData.mealImage && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {mealData.mealImage.name}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 mt-6"
                >
                  {isRTL ? 'إضافة الوجبة' : 'Add Meal'}
                </Button>
              </form>

              <Button 
                variant="outline" 
                onClick={() => navigate('/home')}
                className="w-full mt-4"
              >
                {isRTL ? 'انتهيت من الإضافة' : 'Finish Adding Meals'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RestaurantForm;