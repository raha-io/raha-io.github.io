<template>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text">
          <strong>{{ t('brand.name') }}</strong>
          <span>{{ t('brand.tagline') }}</span>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="#about">{{ t('nav.about') }}</a>
        <a href="#services">{{ t('nav.services') }}</a>
        <a href="#process">{{ t('nav.process') }}</a>
        <a href="#projects">{{ t('nav.projects') }}</a>
        <a href="#contact">{{ t('nav.contact') }}</a>
      </nav>
      <div class="header-actions">
        <a class="btn small ghost" href="#contact">{{ t('hero.ctaPrimary') }}</a>
        <LocaleToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
