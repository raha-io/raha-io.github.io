import { Fraunces, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';
import SkipLink from '@/components/SkipLink';
import StructuredData from '@/components/StructuredData';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const baseUrl = 'https://raha-io.github.io';

  return {
    title: t('title'),
    description: t('description'),
    icons: { icon: '/icon.png', apple: '/icon.png' },
    metadataBase: new URL(baseUrl),
    alternates: {
      languages: { en: '/en', fa: '/fa' },
      canonical: `/${locale}`,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Raha IO',
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Raha IO - Infrastructure, DevOps, Cloud',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const organizationData = {
  name: 'Raha IO',
  description:
    'Infrastructure and DevOps solutions based on AWS, Hetzner, and Arvancloud to reduce operational overhead.',
  url: 'https://raha-io.github.io',
  logo: 'https://raha-io.github.io/logo.png',
  email: 'elahe.dstn@gmail.com',
  telephone: '+98 935 225 7378',
  address: {
    city: 'Istanbul',
    country: 'Turkey',
  },
  sameAs: ['https://github.com/raha-io'],
};

const servicesData = [
  {
    name: 'Cloud Infrastructure',
    description:
      'Architecture and landing zones with security baselines and rollout plans on AWS, Hetzner, or Arvancloud.',
  },
  {
    name: 'DevOps & CI/CD',
    description: 'Standardized pipelines with templates, quality gates, and safe rollback paths.',
  },
  {
    name: 'Kubernetes',
    description:
      'Production clusters with autoscaling, policy controls, and secure multi-tenant isolation.',
  },
  {
    name: 'Monitoring & Observability',
    description: 'Dashboards, SLOs, and alert playbooks to shorten incident recovery time.',
  },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="fa" href="/fa" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData organization={organizationData} services={servicesData} />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Theme script must run before render to prevent flash
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),s=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',t==='dark'||(!t&&s)?'dark':'light')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <SkipLink />
        <NextIntlClientProvider messages={messages}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </NextIntlClientProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
