'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LocaleToggle from './LocaleToggle';

export default function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home">
          <Image src="/logo.png" alt="Raha IO" width={44} height={44} className="brand-mark" />
          <span className="brand-text">
            <strong>{t('brand.name')}</strong>
            <span>{t('brand.tagline')}</span>
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#about">{t('nav.about')}</a>
          <a href="#services">{t('nav.services')}</a>
          <a href="#process">{t('nav.process')}</a>
          <a href="#projects">{t('nav.projects')}</a>
          <a href="#team">{t('nav.team')}</a>
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
        <div className="header-actions">
          <a className="btn small ghost" href="#contact">
            {t('hero.ctaPrimary')}
          </a>
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}
