import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const { t, isRTL } = useLanguage();

  // Mock data for demonstration
  const featuredMeals = [
    { id: 1, name: 'Kabsa', price: 25, category: 'traditional' },
    { id: 2, name: 'Burger', price: 15, category: 'fastFood' },
    { id: 3, name: 'Salad', price: 12, category: 'healthy' },
    { id: 4, name: 'Baklava', price: 8, category: 'desserts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            {t('appName')}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'اطلب طعامك المفضل الآن' : 'Order your favorite food now'}
          </p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isRTL ? 'الفئات' : 'Categories'}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{t('fastFood')}</Badge>
            <Badge variant="outline">{t('traditional')}</Badge>
            <Badge variant="outline">{t('healthy')}</Badge>
            <Badge variant="outline">{t('desserts')}</Badge>
          </div>
        </div>

        {/* Featured Meals */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isRTL ? 'الوجبات المميزة' : 'Featured Meals'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMeals.map((meal) => (
              <Card key={meal.id} className="group hover:shadow-soft transition-all">
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-lg mb-2"></div>
                  <CardTitle className="text-lg">{meal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {meal.price} {isRTL ? 'ريال' : 'SAR'}
                    </span>
                    <Badge variant="secondary">{t(meal.category)}</Badge>
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    {isRTL ? 'أضف للعربة' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Message */}
        <Card className="bg-gradient-hero border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">
              {isRTL ? 'مرحباً بك في جو شقراء!' : 'Welcome to Go Shaqra!'}
            </h3>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'لتفعيل جميع الميزات مثل التسجيل وحفظ البيانات، يرجى ربط المشروع بـ Supabase'
                : 'To enable all features like authentication and data storage, please connect the project to Supabase'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;