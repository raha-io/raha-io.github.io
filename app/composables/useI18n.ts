import en from '~/locales/en.json'
import fa from '~/locales/fa.json'

const messages = { en, fa } as const

export type Locale = keyof typeof messages

const defaultLocale: Locale = 'en'

const getMessage = (locale: Locale, key: string): unknown => {
  const parts = key.split('.')
  let current: any = messages[locale]

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined
    }
    current = current[part]
  }

  return current
}

export const useI18n = () => {
  const localeCookie = useCookie<Locale>('locale', {
    default: () => defaultLocale
  })

  const locale = useState<Locale>('locale', () => localeCookie.value || defaultLocale)

  watch(
    locale,
    (value) => {
      localeCookie.value = value
    },
    { immediate: true }
  )

  const dir = computed(() => (locale.value === 'fa' ? 'rtl' : 'ltr'))

  const t = (key: string): string => {
    const value = getMessage(locale.value, key)
    return typeof value === 'string' ? value : key
  }

  const tm = <T = unknown>(key: string): T => {
    return getMessage(locale.value, key) as T
  }

  const setLocale = (next: Locale) => {
    locale.value = next
  }

  return {
    locale,
    dir,
    t,
    tm,
    setLocale,
    locales: Object.keys(messages) as Locale[]
  }
}
