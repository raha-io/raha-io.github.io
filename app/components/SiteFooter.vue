<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-title">{{ t('brand.name') }}</div>
          <div class="footer-links">
            <span>{{ t('brand.tagline') }}</span>
            <span>{{ t('contact.address') }}</span>
          </div>
        </div>
        <div>
          <div class="footer-title">{{ t('nav.services') }}</div>
          <div class="footer-links">
            <a href="#services">{{ t('services.items.0.title') }}</a>
            <a href="#services">{{ t('services.items.1.title') }}</a>
            <a href="#services">{{ t('services.items.2.title') }}</a>
            <a href="#services">{{ t('services.items.3.title') }}</a>
          </div>
        </div>
        <div>
          <div class="footer-title">{{ t('nav.contact') }}</div>
          <div class="footer-links">
            <a :href="`mailto:${t('contact.email')}`">{{ t('contact.email') }}</a>
            <a :href="`tel:${t('contact.phone')}`">{{ t('contact.phone') }}</a>
            <span>{{ t('contact.hours') }}</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">{{ t('footer.copyright') }}</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
