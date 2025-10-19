import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const I18nDirectionManager = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateDirection = () => {
      const lang = i18n.language;
      const direction = lang === 'ar' ? 'rtl' : 'ltr';
      
      document.documentElement.lang = lang;
      document.documentElement.dir = direction;
      document.body.dir = direction;
      
      // Force re-render
      document.body.style.direction = direction;
    };

    // Set initial direction
    updateDirection();

    // Listen to language changes
    i18n.on('languageChanged', updateDirection);

    return () => {
      i18n.off('languageChanged', updateDirection);
    };
  }, [i18n]);

  return null;
};

export default I18nDirectionManager;
