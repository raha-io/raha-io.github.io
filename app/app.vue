<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { locale, dir, t } = useI18n()

useHead(() => ({
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description')
    },
    {
      name: 'theme-color',
      content: '#f2c14e'
    }
  ],
  htmlAttrs: {
    lang: locale.value,
    dir: dir.value,
    'data-locale': locale.value
  },
  bodyAttrs: {
    class: locale.value === 'fa' ? 'locale-fa' : 'locale-en'
  }
}))
</script>
