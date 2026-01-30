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

const cloudLogos: Record<string, string> = {
  AWS: '/logos/aws.svg',
  Hetzner: '/logos/hetzner.svg',
  Arvancloud: '/logos/arvancloud.svg',
  ابرآروان: '/logos/arvancloud.svg',
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

type TeamMember = {
  name: string;
  role: string;
  username: string;
  bio: string;
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
            <div className="hero-card reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <div className="card-label">{t('hero.pillarsTitle')}</div>
              {heroPillars.map((pillar) => (
                <div key={pillar.title} className="pillar">
                  <div className="pillar-logo">
                    {cloudLogos[pillar.title] && (
                      <Image
                        src={cloudLogos[pillar.title]}
                        alt={`${pillar.title} logo`}
                        width={80}
                        height={32}
                        unoptimized
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

        <section id="team" className="section">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">{t('team.title')}</span>
              <h2 className="section-title">{t('team.title')}</h2>
              <p className="section-subtitle">{t('team.subtitle')}</p>
            </div>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <div key={member.username} className="team-card">
                  <Image
                    src={`https://github.com/${member.username}.png`}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="team-photo"
                    unoptimized
                  />
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
                <a href={`tel:${t('contact.phone')}`}>{t('contact.phone')}</a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.whatsapp')}</strong>
                <a
                  href={`https://wa.me/${t('contact.whatsapp')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
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
                  <TelegramIcon />
                  {t('contact.phone')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.github')}</strong>
                <a href="https://github.com/raha-io" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
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
