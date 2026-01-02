'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LocaleToggle() {
  const t = useTranslations('lang');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'en' | 'fa') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <fieldset className="locale-toggle" aria-label="Language toggle">
      <button
        type="button"
        className={locale === 'en' ? 'active' : ''}
        onClick={() => switchLocale('en')}
      >
        {t('en')}
      </button>
      <button
        type="button"
        className={locale === 'fa' ? 'active' : ''}
        onClick={() => switchLocale('fa')}
      >
        {t('fa')}
      </button>
    </fieldset>
  );
}
