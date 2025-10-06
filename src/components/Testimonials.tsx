import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  
  const testimonialsData = t('testimonials.items', { returnObjects: true }) as Array<{
    id: number;
    content: string;
    author: string;
    type: string;
  }>;

  const testimonials = testimonialsData.map(item => ({
    ...item,
    type: t(`testimonials.${item.type}`)
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-cosmic-deep-space/30 to-cosmic-void/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-stellar-gold relative">
            <span className="relative z-10">{t('testimonials.title')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cosmic-stellar-gold via-cosmic-nebula-pink to-cosmic-aurora-cyan opacity-30 blur-sm -z-10"></div>
          </h2>
          <p className="text-lg text-cosmic-star-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-cosmic-deep-space/40 border-cosmic-stellar-gold/20 backdrop-blur-sm hover:bg-cosmic-deep-space/60 transition-all duration-300 group hover:border-cosmic-stellar-gold/40"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-cosmic-stellar-gold/20 text-cosmic-stellar-gold rounded-full mb-4">
                    {testimonial.type}
                  </span>
                  <blockquote className="text-cosmic-star-white/90 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </blockquote>
                </div>
                <div className="flex items-center justify-between">
                  <cite className="text-cosmic-stellar-gold font-medium text-sm not-italic">
                    — {testimonial.author}
                  </cite>
                  <div className="flex text-cosmic-stellar-gold/60">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
