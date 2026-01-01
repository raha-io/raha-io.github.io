import { getTranslations, setRequestLocale } from 'next-intl/server'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

type Pillar = {
  title: string
  desc: string
}

type Stat = {
  value: string
  label: string
}

type Service = {
  title: string
  desc: string
  tags: string[]
}

type Step = {
  title: string
  desc: string
}

type Project = {
  title: string
  desc: string
  result: string
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations()

  const heroPillars = t.raw('hero.pillars') as Pillar[]
  const stats = t.raw('stats') as Stat[]
  const aboutHighlights = t.raw('about.highlights') as string[]
  const services = t.raw('services.items') as Service[]
  const processSteps = t.raw('process.steps') as Step[]
  const projects = t.raw('projects.items') as Project[]
  const clients = t.raw('clients.items') as string[]

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
              {heroPillars.map((pillar, index) => (
                <div key={pillar.title} className="pillar">
                  <div className="pillar-index">0{index + 1}</div>
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
            <div className="clients-list">
              {clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
            <div className="testimonial" style={{ marginTop: '2.5rem' }}>
              <blockquote>&ldquo;{t('testimonial.quote')}&rdquo;</blockquote>
              <div>
                <strong>{t('testimonial.name')}</strong>
                <div className="section-subtitle">
                  {t('testimonial.role')} - {t('testimonial.company')}
                </div>
              </div>
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
                <a href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.phone')}</strong>
                <a href={`tel:${t('contact.phone')}`}>{t('contact.phone')}</a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.whatsapp')}</strong>
                <a href={`https://wa.me/${t('contact.whatsapp')}`} target="_blank" rel="noopener noreferrer">
                  {t('contact.phone')}
                </a>
              </div>
              <div className="contact-item">
                <strong>{t('contact.labels.telegram')}</strong>
                <a href={`https://t.me/+${t('contact.telegram')}`} target="_blank" rel="noopener noreferrer">
                  {t('contact.phone')}
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
  )
}
