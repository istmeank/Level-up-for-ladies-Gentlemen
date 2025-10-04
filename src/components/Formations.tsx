import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Star, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
interface Formation {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string | null;
  duration: number | null;
  level: string;
  is_published: boolean;
}
interface FormationPurchase {
  formation_id: string;
  payment_status: string;
}
const Formations = () => {
  const { t } = useTranslation();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [purchases, setPurchases] = useState<FormationPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchFormations();
    fetchUserPurchases();
  }, []);
  const fetchFormations = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('formations').select('*').eq('is_published', true).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setFormations(data || []);
    } catch (error) {
      console.error('Error fetching formations:', error);
      toast.error(t('formations.loading'));
    } finally {
      setLoading(false);
    }
  };
  const fetchUserPurchases = async () => {
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) return;
      const {
        data,
        error
      } = await supabase.from('formation_purchases').select('formation_id, payment_status').eq('user_id', user.id).eq('payment_status', 'completed');
      if (error) throw error;
      setPurchases(data || []);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };
  const handlePurchase = async (formation: Formation) => {
    try {
      // Simuler un achat direct sans authentification requise
      toast.success(`Formation "${formation.title}" achetée avec succès ! Un email de confirmation sera envoyé.`);

      // Ici vous pourriez rediriger vers un système de paiement comme Stripe
      // ou ouvrir une modal de paiement
    } catch (error) {
      console.error('Error purchasing formation:', error);
      toast.error('Erreur lors de l\'achat de la formation');
    }
  };
  const isPurchased = (formationId: string) => {
    return purchases.some(p => p.formation_id === formationId);
  };
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'débutant':
        return 'bg-cosmic-stellar-gold/20 text-cosmic-stellar-gold';
      case 'intermédiaire':
        return 'bg-cosmic-nebula-green/20 text-cosmic-nebula-green';
      case 'avancé':
        return 'bg-cosmic-purple-pink/20 text-cosmic-purple-pink';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  if (loading) {
    return <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">{t('formations.loading')}</div>
        </div>
      </section>;
  }
  return <section className="py-20 px-6 bg-gradient-to-br from-cosmic-deep-space via-background to-cosmic-deep-space">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
            {t('formations.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-stellar-gold to-cosmic-nebula-green mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('formations.subtitle')}</p>
        </div>

        {formations.length === 0 ? <div className="text-center py-16">
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold cosmic-text mb-4">Nouvelles formations en préparation</h3>
            <p className="text-muted-foreground">
              De nouvelles formations exclusives arrivent bientôt. Restez connectés !
            </p>
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formations.map(formation => <Card key={formation.id} className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 hover:border-cosmic-stellar-gold/40 transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  {formation.thumbnail_url ? <img src={formation.thumbnail_url} alt={formation.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" /> : <div className="w-full h-48 bg-gradient-to-br from-cosmic-stellar-gold/20 to-cosmic-nebula-green/20 flex items-center justify-center">
                      <Play className="w-16 h-16 text-cosmic-stellar-gold" />
                    </div>}
                  <div className="absolute top-4 right-4">
                    <Badge className={getLevelColor(formation.level)}>
                      {formation.level}
                    </Badge>
                  </div>
                  {isPurchased(formation.id) && <div className="absolute top-4 left-4">
                      <Badge className="bg-cosmic-nebula-green/20 text-cosmic-nebula-green">
                        <Star className="w-3 h-3 mr-1" />
                        {t('formations.acquired')}
                      </Badge>
                    </div>}
                </div>

                <CardHeader>
                  <CardTitle className="cosmic-text text-xl mb-2">{formation.title}</CardTitle>
                  {formation.duration && <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {formation.duration} {t('formations.minutes')}
                    </div>}
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-1">
                    apprenez à construire des relations qui durent sur le long terme grâce à cette formation qui vous apprendra les bases solides d'un mariage réussi
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold cosmic-text">
                      {formation.price === 0 ? t('formations.free') : `${formation.price} DA`}
                    </div>

                    <Button variant="outline" className="gap-2 border-cosmic-stellar-gold/30 hover:bg-cosmic-stellar-gold/10" onClick={() => handlePurchase(formation)}>
                      {t('formations.buyNow')}
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>}
      </div>
    </section>;
};
export default Formations;