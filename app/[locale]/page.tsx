import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

const cloudLogos: Record<string, string> = {
  AWS: '/logos/aws.png',
  Hetzner: '/logos/hetzner.jpg',
  Arvancloud: '/logos/arvancloud.jpg',
};

type Pillar = {
  title: string;
  desc: string;
};

type Stat = {
  value: string;
  label: string;
};

type Service = {
  title: string;
  desc: string;
  tags: string[];
};

type Step = {
  title: string;
  desc: string;
};

type Project = {
  title: string;
  desc: string;
  result: string;
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const heroPillars = t.raw('hero.pillars') as Pillar[];
  const stats = t.raw('stats') as Stat[];
  const aboutHighlights = t.raw('about.highlights') as string[];
  const services = t.raw('services.items') as Service[];
  const processSteps = t.raw('process.steps') as Step[];
  const projects = t.raw('projects.items') as Project[];

  return (
    <div className="page" id="home">
      <SiteHeader />

      <main>
        <section className="section hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow reveal" style={{ '--delay': '0s' } as React.CSSProperties}>
                {t('hero.eyebrow')}
              </span>
              <h1 className="display reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                {t('hero.title')}
              </h1>
              <p className="lead reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                {t('hero.subtitle')}
              </p>
              <div className="cta-row reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                <a className="btn primary" href="#contact">
                  {t('hero.ctaPrimary')}
                </a>
                <a className="btn ghost" href="#services">
                  {t('hero.ctaSecondary')}
                </a>
              </div>
              <p className="meta-note reveal" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                {t('hero.note')}
              </p>
            </div>
            <div className="hero-card reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <div className="card-label">{t('hero.pillarsTitle')}</div>
              {heroPillars.map((pillar) => (
                <div key={pillar.title} className="pillar">
                  <div className="pillar-logo">
                    {cloudLogos[pillar.title] && (
                      <Image
                        src={cloudLogos[pillar.title]}
                        alt={`${pillar.title} logo`}
                        width={48}
                        height={28}
                      />
                    )}
                  </div>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p className="section-subtitle">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container stats-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stat-card reveal"
                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="section-subtitle">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section section-alt">
          <div className="container about-grid">
            <div>
              <div className="section-header">
                <span className="eyebrow">{t('nav.about')}</span>
                <h2 className="section-title">{t('about.title')}</h2>
                <p className="section-subtitle">{t('about.body')}</p>
              </div>
              <ul className="about-list">
                {aboutHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="about-card">
              <h3>{t('services.title')}</h3>
              <p className="section-subtitle">{t('services.subtitle')}</p>
              <div className="tag-list" style={{ marginTop: '1.4rem' }}>
                <span className="tag">{t('services.items.0.tags.0')}</span>
                <span className="tag">{t('services.items.1.tags.1')}</span>
                <span className="tag">{t('services.items.2.tags.2')}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('nav.services')}</span>
              <h2 className="section-title">{t('services.title')}</h2>
              <p className="section-subtitle">{t('services.subtitle')}</p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <h3>{service.title}</h3>
                  <p className="section-subtitle">{service.desc}</p>
                  <div className="tag-list">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('nav.process')}</span>
              <h2 className="section-title">{t('process.title')}</h2>
            </div>
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <div key={step.title} className="process-step">
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p className="section-subtitle">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('nav.projects')}</span>
              <h2 className="section-title">{t('projects.title')}</h2>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <h3>{project.title}</h3>
                  <p className="section-subtitle">{project.desc}</p>
                  <p className="result">{project.result}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('clients.title')}</span>
              <h2 className="section-title">{t('clients.title')}</h2>
            </div>
            <div className="squad-grid">
              <a
                href="https://bitbarg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="squad-card"
              >
                <Image
                  src="/logos/bitbarg.jpg"
                  alt={t('clients.bitbarg')}
                  width={64}
                  height={64}
                  className="squad-logo"
                />
                <span className="squad-name">{t('clients.bitbarg')}</span>
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contact-grid">
            <div>
              <div className="section-header">
                <span className="eyebrow">{t('nav.contact')}</span>
                <h2 className="section-title">{t('contact.title')}</h2>
                <p className="section-subtitle">{t('contact.subtitle')}</p>
              </div>
              <a className="btn primary" href={`mailto:${t('contact.email')}`}>
                {t('contact.cta')}
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-item">
                <strong>{t('contact.labels.email')}</strong>
                <a href={`mailto:${t('contact.email')}`}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {t('contact.email')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.phone')}</strong>
                <a href={`tel:${t('contact.phone')}`}>{t('contact.phone')}</a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.whatsapp')}</strong>
                <a
                  href={`https://wa.me/${t('contact.whatsapp')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('contact.phone')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.telegram')}</strong>
                <a
                  href={`https://t.me/${t('contact.telegram')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  {t('contact.phone')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.github')}</strong>
                <a href="https://github.com/raha-io" target="_blank" rel="noopener noreferrer">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  raha-io
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.location')}</strong>
                <span>{t('contact.address')}</span>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.hours')}</strong>
                <span>{t('contact.hours')}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
