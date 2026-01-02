'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const locale = browserLang.startsWith('fa') ? 'fa' : 'en';
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}
