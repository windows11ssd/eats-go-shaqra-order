import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const DriverForm = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    nationality: '',
    age: '',
    idNumber: '',
    phoneNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally store to Supabase
    // For now, we'll show a success message
    toast({
      title: isRTL ? "تم الإرسال" : "Request Sent",
      description: t('driverRequestSent'),
      variant: "default",
    });

    // Reset form
    setFormData({
      name: '',
      nationality: '',
      age: '',
      idNumber: '',
      phoneNumber: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          {isRTL ? <ArrowRight className="w-4 h-4 mr-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
          {isRTL ? 'العودة' : 'Back'}
        </Button>

        <Card className="shadow-medium">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">
              {isRTL ? 'نموذج السائق' : 'Driver Application'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isRTL ? 'املأ البيانات للانضمام كسائق' : 'Fill the form to join as a driver'}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="nationality">{t('nationality')}</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder={isRTL ? 'أدخل جنسيتك' : 'Enter your nationality'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="age">{t('age')}</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder={isRTL ? 'أدخل عمرك' : 'Enter your age'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="idNumber">{t('idNumber')}</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  placeholder={isRTL ? 'أدخل رقم الهوية' : 'Enter your ID number'}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder={isRTL ? 'أدخل رقم الهاتف' : 'Enter your phone number'}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 mt-6"
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
      </div>
    </div>
  );
};

export default DriverForm;