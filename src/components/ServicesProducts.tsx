import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Briefcase, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
      toast.error('Erreur lors du chargement des services et produits');
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
      toast.info(`Contactez-moi pour en savoir plus sur "${item.name}"`);
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
          <div className="animate-pulse">Chargement des services et produits...</div>
        </div>
      </section>;
  }
  return <section className="py-20 px-6 bg-gradient-to-br from-background via-cosmic-deep-space to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
            Services & Produits
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-stellar-gold to-cosmic-nebula-green mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez nos services d'accompagnement personnalisés et nos produits exclusifs pour votre développement
          </p>

          {/* Filtres */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant={selectedType === 'all' ? 'stellar' : 'outline'} onClick={() => setSelectedType('all')} className="gap-2">
              Tout voir
            </Button>
            <Button variant={selectedType === 'service' ? 'stellar' : 'outline'} onClick={() => setSelectedType('service')} className="gap-2">
              <Briefcase className="w-4 h-4" />
              Services
            </Button>
            <Button variant={selectedType === 'product' ? 'stellar' : 'outline'} onClick={() => setSelectedType('product')} className="gap-2">
              <Package className="w-4 h-4" />
              Produits
            </Button>
          </div>
        </div>

        {filteredItems.length === 0 ? <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold cosmic-text mb-4">Nouveaux services en préparation</h3>
            <p className="text-muted-foreground">
              De nouveaux services et produits exclusifs arrivent bientôt !
            </p>
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => <Card key={item.id} className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 hover:border-cosmic-stellar-gold/40 transition-all duration-300 group flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg">
                  {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-56 md:h-64 object-contain group-hover:scale-105 transition-transform duration-300 p-0" /> : <div className="w-full h-56 md:h-64 bg-gradient-to-br from-cosmic-stellar-gold/20 to-cosmic-nebula-green/20 flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>}
                  <div className="absolute top-4 right-4">
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="cosmic-text text-xl">{item.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6">
                    {item.description}
                  </p>

                  {/* Fonctionnalités */}
                  {item.features && Array.isArray(item.features) && item.features.length > 0 && <div className="mb-6">
                      <h4 className="font-semibold text-cosmic-stellar-gold mb-3">Inclus :</h4>
                      <ul className="space-y-2">
                        {item.features.slice(0, 3).map((feature: string, index: number) => <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-cosmic-nebula-green mr-2 flex-shrink-0" />
                            {feature}
                          </li>)}
                        {item.features.length > 3 && <li className="text-sm text-cosmic-stellar-gold">
                            +{item.features.length - 3} autres fonctionnalités
                          </li>}
                      </ul>
                    </div>}

                  <div className="mt-auto">
                    <div className="flex flex-col mb-4">
                      <div className="text-2xl font-bold cosmic-text">
                        {item.name.includes('Livre Qui suis-je') ? 'Exclusivement disponible pour les inscrits au programme Perception.' : item.price === 0 ? 'Gratuit' : `À partir de ${item.price} DA`}
                      </div>
                    </div>

                    
                  </div>
                </CardContent>
              </Card>)}
          </div>}

        {/* Section CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-cosmic-stellar-gold/10 to-cosmic-nebula-green/10 border-cosmic-stellar-gold/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold cosmic-text mb-4">
                Besoin d'un service personnalisé ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Chaque parcours est unique. Contactez-moi pour créer une solution sur mesure qui correspond parfaitement à vos besoins et objectifs.
              </p>
              <Button variant="stellar" size="lg" onClick={() => handleContact({
              name: 'Service personnalisé'
            } as ServiceProduct)}>
                Discutons de votre projet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ServicesProducts;