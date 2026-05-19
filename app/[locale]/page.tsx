import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import {
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  WebsiteIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from '@/components/icons';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

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

type Office = {
  label: string;
  city: string;
  district?: string;
  registrationNumber?: string;
  nationalId?: string;
  phone?: string;
  phoneDisplay?: string;
};

type TeamMember = {
  name: string;
  role: string;
  username: string;
  bio: string;
  photo: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    reddit?: string;
  };
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
  const teamMembers = t.raw('team.members') as TeamMember[];
  const offices = t.raw('contact.offices') as Office[];

  return (
    <div className="page" id="home">
      <SiteHeader />

      <main id="main">
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
            <div
              className="hero-panel reveal"
              style={{ '--delay': '0.2s' } as React.CSSProperties}
              aria-hidden="true"
            >
              <div className="hero-panel-header">
                <span className="hero-panel-dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="hero-panel-host">raha@cloud ~ %</span>
              </div>
              <div className="hero-panel-rows">
                <div className="hero-panel-row">
                  <span className="meta">$</span>
                  <span className="name">raha health --all</span>
                  <span className="meta" />
                </div>
                {heroPillars.map((pillar) => (
                  <div key={pillar.title} className="hero-panel-row">
                    <span className="dot" />
                    <span className="name">
                      <b>{pillar.title.toLowerCase()}</b>
                      <span className="tip" role="tooltip">
                        {pillar.desc}
                      </span>
                    </span>
                    <span className="meta">operational</span>
                  </div>
                ))}
              </div>
              <div className="hero-panel-foot">
                <span>
                  <strong>
                    {heroPillars.length}/{heroPillars.length}
                  </strong>{' '}
                  healthy
                </span>
                <span>
                  uptime · 99.9
                  <span className="cursor" />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="stat reveal"
                  style={{ '--delay': `${index * 0.08}s` } as React.CSSProperties}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container about-grid">
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

        <section id="process" className="section process-section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('nav.process')}</span>
              <h2 className="section-title">{t('process.title')}</h2>
            </div>
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <div key={step.title} className="process-step">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
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
              <span className="eyebrow">{t('nav.projects')}</span>
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
              <a
                href="https://hatchup.capital/"
                target="_blank"
                rel="noopener noreferrer"
                className="squad-card"
              >
                <Image
                  src="/logos/hatchup.jpg"
                  alt={t('clients.hatchup')}
                  width={64}
                  height={64}
                  className="squad-logo"
                />
                <span className="squad-name">{t('clients.hatchup')}</span>
              </a>
              <a
                href="https://www.avee.health/"
                target="_blank"
                rel="noopener noreferrer"
                className="squad-card"
              >
                <Image
                  src="/logos/aveehealth.svg"
                  alt={t('clients.aveehealth')}
                  width={64}
                  height={64}
                  className="squad-logo squad-logo--padded"
                />
                <span className="squad-name">{t('clients.aveehealth')}</span>
              </a>
            </div>
          </div>
        </section>

        <section id="team" className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('nav.team')}</span>
              <h2 className="section-title">{t('team.title')}</h2>
              <p className="section-subtitle">{t('team.subtitle')}</p>
            </div>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.username} className="team-card">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="team-photo"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="team-card-body">
                    <h3 className="team-name">{member.name}</h3>
                    <span className="team-role">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-social">
                      {member.social.github && (
                        <a
                          href={`https://github.com/${member.social.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <GitHubIcon />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.social.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <LinkedInIcon />
                        </a>
                      )}
                      {member.social.youtube && (
                        <a
                          href={`https://youtube.com/${member.social.youtube}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on YouTube`}
                        >
                          <YouTubeIcon />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={`https://instagram.com/${member.social.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Instagram`}
                        >
                          <InstagramIcon />
                        </a>
                      )}
                      {member.social.reddit && (
                        <a
                          href={`https://reddit.com/user/${member.social.reddit}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Reddit`}
                        >
                          <RedditIcon />
                        </a>
                      )}
                      {member.social.website && (
                        <a
                          href={member.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s website`}
                        >
                          <WebsiteIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="container contact-grid">
            <div>
              <div className="section-header">
                <span className="eyebrow">{t('nav.contact')}</span>
                <h2 className="section-title">{t('contact.title')}</h2>
                <p className="section-subtitle">{t('contact.subtitle')}</p>
              </div>
              <ContactForm />
            </div>
            <div className="contact-card">
              <div className="contact-item">
                <strong>{t('contact.labels.email')}</strong>
                <a href={`mailto:${t('contact.email')}`}>
                  <EmailIcon />
                  {t('contact.email')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.phone')}</strong>
                <a href={`tel:${t('contact.phone')}`}>
                  <bdi>{t('contact.phone')}</bdi>
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.whatsapp')}</strong>
                <a
                  href={`https://wa.me/${t('contact.whatsapp')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  <bdi>{t('contact.phone')}</bdi>
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.telegram')}</strong>
                <a
                  href={`https://t.me/${t('contact.telegram')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon />
                  <bdi>{t('contact.phone')}</bdi>
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.github')}</strong>
                <a href="https://github.com/rahacloud" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  rahacloud
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.offices')}</strong>
                <span>{t('contact.address')}</span>
              </div>
              {offices.map((office) => (
                <div key={office.label} className="contact-item office-item">
                  <strong>{office.label}</strong>
                  <span>{office.city}</span>
                  {office.district && (
                    <span className="office-meta">
                      {t('contact.labels.district')}: {office.district}
                    </span>
                  )}
                  {office.registrationNumber && (
                    <span className="office-meta">
                      {t('contact.labels.registrationNumber')}:{' '}
                      <bdi>{office.registrationNumber}</bdi>
                    </span>
                  )}
                  {office.nationalId && (
                    <span className="office-meta">
                      {t('contact.labels.nationalId')}: <bdi>{office.nationalId}</bdi>
                    </span>
                  )}
                  {office.phone && office.phoneDisplay && (
                    <a href={`tel:${office.phone}`}>
                      <bdi>{office.phoneDisplay}</bdi>
                    </a>
                  )}
                </div>
              ))}
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
