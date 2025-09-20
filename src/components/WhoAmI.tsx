import { Card, CardContent } from "@/components/ui/card";
import profilePhoto from "@/assets/profile-photo.png";
const WhoAmI = () => {
  return <section className="py-20 px-6 bg-gradient-to-br from-cosmic-deep-space via-background to-cosmic-deep-space">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
            Qui suis-je ?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cosmic-stellar-gold to-cosmic-nebula-green mx-auto mb-8"></div>
        </div>

        {/* Photo de profil - centrée en haut avec constellation orbitante */}
        <div className="flex justify-center mb-16">
          <div className="relative w-96 h-96">
            {/* Constellation d'étoiles orbitantes autour de la photo */}
            <div className="absolute inset-0 animate-[spin_40s_linear_infinite]">
              {/* Étoile Bienveillance - Nord */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-4 h-4 bg-cosmic-purple-pink rounded-full animate-pulse mb-2 mx-auto shadow-[0_0_20px_hsl(var(--cosmic-purple-pink))] relative">
                  <div className="absolute inset-0 bg-cosmic-purple-pink rounded-full animate-ping"></div>
                </div>
                <span className="text-xs font-semibold text-cosmic-purple-pink whitespace-nowrap">❤️ Bienveillance</span>
              </div>
              
              {/* Étoile Souveraineté - Est */}
              <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 text-center">
                <div className="w-4 h-4 bg-cosmic-stellar-gold rounded-full animate-pulse mb-2 mx-auto shadow-[0_0_20px_hsl(var(--cosmic-stellar-gold))] relative">
                  <div className="absolute inset-0 bg-cosmic-stellar-gold rounded-full animate-ping animation-delay-1000"></div>
                </div>
                <span className="text-xs font-semibold text-cosmic-stellar-gold whitespace-nowrap">👑 Souveraineté</span>
              </div>
              
              {/* Étoile Acceptation - Sud */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                <div className="w-4 h-4 bg-cosmic-nebula-green rounded-full animate-pulse mb-2 mx-auto shadow-[0_0_20px_hsl(var(--cosmic-nebula-green))] relative">
                  <div className="absolute inset-0 bg-cosmic-nebula-green rounded-full animate-ping animation-delay-2000"></div>
                </div>
                <span className="text-xs font-semibold text-cosmic-nebula-green whitespace-nowrap">🙏 Acceptation</span>
              </div>
              
              {/* Étoile Sagesse - Ouest */}
              <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 text-center">
                <div className="w-4 h-4 bg-cosmic-nebula-purple rounded-full animate-pulse mb-2 mx-auto shadow-[0_0_20px_hsl(var(--cosmic-nebula-purple))] relative">
                  <div className="absolute inset-0 bg-cosmic-nebula-purple rounded-full animate-ping animation-delay-3000"></div>
                </div>
                <span className="text-xs font-semibold text-cosmic-nebula-purple whitespace-nowrap">🧠 Sagesse</span>
              </div>
            </div>

            {/* Photo centrale */}
            <div className="w-80 h-80 relative mx-auto mt-8">
              {/* Effet nébuleux multiples couches */}
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-stellar-gold/30 to-cosmic-nebula-green/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-cosmic-nebula-purple/20 to-cosmic-purple-pink/20 rounded-full blur-2xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-cosmic-stellar-gold/10 to-cosmic-nebula-green/10 rounded-full blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-card to-cosmic-deep-space rounded-full p-4 border border-cosmic-stellar-gold/40 shadow-2xl h-full">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src={profilePhoto} alt="Photo de profil - Le sage Roi des nuages" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Petites étoiles décoratives fixes */}
            <div className="absolute top-8 left-12 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-16 right-16 w-1 h-1 bg-cosmic-stellar-gold rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute bottom-16 left-16 w-1 h-1 bg-cosmic-nebula-green rounded-full animate-ping animation-delay-2000"></div>
            <div className="absolute bottom-8 right-12 w-1 h-1 bg-cosmic-purple-pink rounded-full animate-ping animation-delay-3000"></div>
            <div className="absolute top-20 left-8 w-0.5 h-0.5 bg-cosmic-nebula-purple rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-2000"></div>
          </div>
        </div>

        {/* Titre honorifique */}
        <div className="text-center mb-12">
          <p className="text-xl text-cosmic-stellar-gold italic font-semibold">
            "Le sage Roi des nuages"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Comme m'appellent affectueusement mes Padawans
          </p>
        </div>

        {/* Contenu - en bas en colonnes */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Mon Parcours */}
          <div className="space-y-6 relative">
            <Card className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 h-full relative overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold cosmic-text mb-6">Mon Parcours</h3>
                <p className="text-muted-foreground leading-relaxed">Fort de plusieurs années d'expérience dans la Psychothérapie et le Développement personnel et professionel, j'accompagne les Hommes et Les Femmes de valeur dans leur quête d'excellence. Ma mission est de vous aider à révéler votre potentiel et à atteindre vos objectifs les plus ambitieux.</p>
              </CardContent>
              {/* Petites étoiles décoratives autour de la carte */}
              <div className="absolute top-4 right-4 w-1 h-1 bg-cosmic-stellar-gold rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-cosmic-nebula-green rounded-full animate-ping"></div>
            </Card>
          </div>

          {/* Ma Vision */}
          <div className="space-y-6 relative">
            <Card className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 h-full relative overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold cosmic-text mb-6">Ma Vision</h3>
                <p className="text-muted-foreground leading-relaxed">Je crois fermement que chaque personne possède un potentiel extraordinaire. Mon approche combine méthodes Psychologiques et Musulman basé sur le Coran et mon propre systeme de vale pour créer des transformations durables et significatives dans votre vie personnelle et professionnelle.</p>
              </CardContent>
              {/* Petites étoiles décoratives autour de la carte */}
              <div className="absolute top-6 left-4 w-1 h-1 bg-cosmic-purple-pink rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute bottom-4 right-6 w-0.5 h-0.5 bg-cosmic-nebula-purple rounded-full animate-ping animation-delay-2000"></div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default WhoAmI;