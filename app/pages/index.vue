<template>
  <div class="page" id="home">
    <SiteHeader />

    <main>
      <section class="section hero">
        <div class="container hero-grid">
          <div class="hero-content">
            <span class="eyebrow reveal" style="--delay: 0s">{{ t('hero.eyebrow') }}</span>
            <h1 class="display reveal" style="--delay: 0.1s">{{ t('hero.title') }}</h1>
            <p class="lead reveal" style="--delay: 0.2s">{{ t('hero.subtitle') }}</p>
            <div class="cta-row reveal" style="--delay: 0.3s">
              <a class="btn primary" href="#contact">{{ t('hero.ctaPrimary') }}</a>
              <a class="btn ghost" href="#services">{{ t('hero.ctaSecondary') }}</a>
            </div>
            <p class="meta-note reveal" style="--delay: 0.4s">{{ t('hero.note') }}</p>
          </div>
          <div class="hero-card reveal" style="--delay: 0.2s">
            <div class="card-label">{{ t('hero.pillarsTitle') }}</div>
            <div
              v-for="(pillar, index) in heroPillars"
              :key="pillar.title"
              class="pillar"
            >
              <div class="pillar-index">0{{ index + 1 }}</div>
              <div>
                <h3>{{ pillar.title }}</h3>
                <p class="section-subtitle">{{ pillar.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container stats-grid">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-card reveal"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="stat-value">{{ stat.value }}</div>
            <div class="section-subtitle">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <section id="about" class="section section-alt">
        <div class="container about-grid">
          <div>
            <div class="section-header">
              <span class="eyebrow">{{ t('nav.about') }}</span>
              <h2 class="section-title">{{ t('about.title') }}</h2>
              <p class="section-subtitle">{{ t('about.body') }}</p>
            </div>
            <ul class="about-list">
              <li v-for="highlight in aboutHighlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
          <div class="about-card">
            <h3>{{ t('services.title') }}</h3>
            <p class="section-subtitle">{{ t('services.subtitle') }}</p>
            <div class="tag-list" style="margin-top: 1.4rem">
              <span class="tag">{{ t('services.items.0.tags.0') }}</span>
              <span class="tag">{{ t('services.items.1.tags.1') }}</span>
              <span class="tag">{{ t('services.items.2.tags.2') }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="section">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">{{ t('nav.services') }}</span>
            <h2 class="section-title">{{ t('services.title') }}</h2>
            <p class="section-subtitle">{{ t('services.subtitle') }}</p>
          </div>
          <div class="services-grid">
            <article
              v-for="service in services"
              :key="service.title"
              class="service-card"
            >
              <h3>{{ service.title }}</h3>
              <p class="section-subtitle">{{ service.desc }}</p>
              <div class="tag-list">
                <span v-for="tag in service.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">{{ t('nav.process') }}</span>
            <h2 class="section-title">{{ t('process.title') }}</h2>
          </div>
          <div class="process-grid">
            <div v-for="(step, index) in processSteps" :key="step.title" class="process-step">
              <span>{{ index + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p class="section-subtitle">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="section">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">{{ t('nav.projects') }}</span>
            <h2 class="section-title">{{ t('projects.title') }}</h2>
          </div>
          <div class="projects-grid">
            <article v-for="project in projects" :key="project.title" class="project-card">
              <h3>{{ project.title }}</h3>
              <p class="section-subtitle">{{ project.desc }}</p>
              <p class="result">{{ project.result }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <span class="eyebrow">{{ t('clients.title') }}</span>
            <h2 class="section-title">{{ t('clients.title') }}</h2>
          </div>
          <div class="clients-list">
            <span v-for="client in clients" :key="client">{{ client }}</span>
          </div>
          <div class="testimonial" style="margin-top: 2.5rem">
            <blockquote>"{{ t('testimonial.quote') }}"</blockquote>
            <div>
              <strong>{{ t('testimonial.name') }}</strong>
              <div class="section-subtitle">
                {{ t('testimonial.role') }} - {{ t('testimonial.company') }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="section">
        <div class="container contact-grid">
          <div>
            <div class="section-header">
              <span class="eyebrow">{{ t('nav.contact') }}</span>
              <h2 class="section-title">{{ t('contact.title') }}</h2>
              <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
            </div>
            <a class="btn primary" :href="`mailto:${t('contact.email')}`">{{ t('contact.cta') }}</a>
          </div>
          <div class="contact-card">
            <div class="contact-item">
              <strong>{{ t('contact.labels.email') }}</strong>
              <a :href="`mailto:${t('contact.email')}`">{{ t('contact.email') }}</a>
            </div>
            <div class="contact-item">
              <strong>{{ t('contact.labels.phone') }}</strong>
              <a :href="`tel:${t('contact.phone')}`">{{ t('contact.phone') }}</a>
            </div>
            <div class="contact-item">
              <strong>{{ t('contact.labels.location') }}</strong>
              <span>{{ t('contact.address') }}</span>
            </div>
            <div class="contact-item">
              <strong>{{ t('contact.labels.hours') }}</strong>
              <span>{{ t('contact.hours') }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
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

const { t, tm } = useI18n()

const heroPillars = computed(() => (tm<Pillar[]>('hero.pillars') ?? []))
const stats = computed(() => (tm<Stat[]>('stats') ?? []))
const aboutHighlights = computed(() => (tm<string[]>('about.highlights') ?? []))
const services = computed(() => (tm<Service[]>('services.items') ?? []))
const processSteps = computed(() => (tm<Step[]>('process.steps') ?? []))
const projects = computed(() => (tm<Project[]>('projects.items') ?? []))
const clients = computed(() => (tm<string[]>('clients.items') ?? []))
</script>
