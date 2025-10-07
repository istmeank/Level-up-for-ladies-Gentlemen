import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const I18nDirectionManager = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateDirection = () => {
      const lang = i18n.language;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
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
