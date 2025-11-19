import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Briefcase, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface ServiceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string; // Changed from 'service' | 'product' to string
  image_url: string | null;
  features: any; // Changed from string[] to any to handle Json type
  is_active: boolean;
}
const ServicesProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<'all' | 'service' | 'product'>('all');
  useEffect(() => {
    fetchServicesProducts();
  }, []);
  const fetchServicesProducts = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('services_products').select('*').eq('is_active', true).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching services/products:', error);
      toast.error(t('servicesProducts.loading'));
    } finally {
      setLoading(false);
    }
  };
  const handleContact = (item: ServiceProduct) => {
    // Redirection vers la section contact avec l'item sélectionné
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
      toast.info(`${t('servicesProducts.contactMe')} "${item.name}"`);
    }
  };
  const filteredItems = items.filter(item => selectedType === 'all' || item.type === selectedType);
  const getTypeIcon = (type: string) => {
    return type === 'service' ? <Briefcase className="w-5 h-5" /> : <Package className="w-5 h-5" />;
  };
  const getTypeColor = (type: string) => {
    return type === 'service' ? 'bg-cosmic-nebula-green/20 text-cosmic-nebula-green' : 'bg-cosmic-purple-pink/20 text-cosmic-purple-pink';
  };
  if (loading) {
    return <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">{t('servicesProducts.loading')}</div>
        </div>
      </section>;
  }
  return <section className="py-20 px-6 bg-gradient-to-br from-background via-cosmic-deep-space to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
            {t('servicesProducts.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-stellar-gold to-cosmic-nebula-green mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-center">
            {t('servicesProducts.subtitle')}
          </p>

          {/* Filtres */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant={selectedType === 'all' ? 'stellar' : 'outline'} onClick={() => setSelectedType('all')} className="gap-2">
              {t('servicesProducts.viewAll')}
            </Button>
            <Button variant={selectedType === 'service' ? 'stellar' : 'outline'} onClick={() => setSelectedType('service')} className="gap-2">
              <Briefcase className="w-4 h-4" />
              {t('servicesProducts.services')}
            </Button>
            <Button variant={selectedType === 'product' ? 'stellar' : 'outline'} onClick={() => setSelectedType('product')} className="gap-2">
              <Package className="w-4 h-4" />
              {t('servicesProducts.products')}
            </Button>
          </div>
        </div>

        {filteredItems.length === 0 ? <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold cosmic-text mb-4">{t('servicesProducts.comingSoonTitle')}</h3>
            <p className="text-muted-foreground">
              {t('servicesProducts.comingSoonDescription')}
            </p>
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => <Card key={item.id} className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 hover:border-cosmic-stellar-gold/40 transition-all duration-300 group flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg">
                  {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-48 bg-gradient-to-br from-cosmic-stellar-gold/20 to-cosmic-nebula-green/20 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>}
                  <div className="absolute top-4 right-4">
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">
                        {t(`servicesProducts.type${item.type === 'service' ? 'Service' : 'Product'}`)}
                      </span>
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="cosmic-text text-xl">{item.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 rtl:text-right">
                    {item.description}
                  </p>

                  {/* Fonctionnalités */}
                  {item.features && Array.isArray(item.features) && item.features.length > 0 && <div className="mb-6">
                      <h4 className="font-semibold text-cosmic-stellar-gold mb-3">{t('servicesProducts.included')}</h4>
                      <ul className="space-y-2">
                        {item.features.slice(0, 3).map((feature: string, index: number) => <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-cosmic-nebula-green mr-2 flex-shrink-0" />
                            {feature}
                          </li>)}
                        {item.features.length > 3 && <li className="text-sm text-cosmic-stellar-gold">
                            +{item.features.length - 3} {t('servicesProducts.moreFeatures')}
                          </li>}
                      </ul>
                    </div>}

                  <div className="mt-auto">
                    <div className="flex flex-col mb-4">
                      <div className="text-2xl font-bold cosmic-text">
                        {item.name.includes('Livre Qui suis-je') ? t('servicesProducts.bookExclusive') : item.price === 0 ? t('servicesProducts.free') : `${t('servicesProducts.from')} ${item.price} DA`}
                      </div>
                    </div>

                    {item.name.toLowerCase().includes('perception') ? (
                      <Button 
                        variant="stellar" 
                        className="w-full group"
                        onClick={() => navigate('/perception')}
                      >
                        {t('servicesProducts.apply')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full border-cosmic-stellar-gold/30 hover:border-cosmic-stellar-gold/60"
                        onClick={() => handleContact(item)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('servicesProducts.contactButton')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {/* Section CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-cosmic-stellar-gold/10 to-cosmic-nebula-green/10 border-cosmic-stellar-gold/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold cosmic-text mb-4 text-center">
                {t('servicesProducts.customService')}
              </h3>
              <p className="text-muted-foreground mb-6 text-center">
                {t('servicesProducts.customServiceText')}
              </p>
              <Button variant="stellar" size="lg" onClick={() => handleContact({
              name: t('servicesProducts.customServiceName')
            } as ServiceProduct)}>
                {t('servicesProducts.discussProject')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ServicesProducts;