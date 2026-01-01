<template>
  <div class="locale-toggle" role="group" aria-label="Language toggle">
    <button
      type="button"
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
    >
      {{ t('lang.en') }}
    </button>
    <button
      type="button"
      :class="{ active: locale === 'fa' }"
      @click="setLocale('fa')"
    >
      {{ t('lang.fa') }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale, t } = useI18n()
</script>
