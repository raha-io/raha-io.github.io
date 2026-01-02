'use client';

import { useTranslations } from 'next-intl';

export default function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-title">{t('brand.name')}</div>
            <div className="footer-links">
              <span>{t('brand.tagline')}</span>
              <span>{t('contact.address')}</span>
            </div>
          </div>
          <div>
            <div className="footer-title">{t('nav.services')}</div>
            <div className="footer-links">
              <a href="#services">{t('services.items.0.title')}</a>
              <a href="#services">{t('services.items.1.title')}</a>
              <a href="#services">{t('services.items.2.title')}</a>
              <a href="#services">{t('services.items.3.title')}</a>
            </div>
          </div>
          <div>
            <div className="footer-title">{t('nav.contact')}</div>
            <div className="footer-links">
              <a href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a>
              <a href={`tel:${t('contact.phone')}`}>{t('contact.phone')}</a>
              <span>{t('contact.hours')}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">{t('footer.copyright')}</div>
      </div>
    </footer>
  );
}
