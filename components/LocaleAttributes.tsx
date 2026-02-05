'use client';

import { useEffect } from 'react';

interface LocaleAttributesProps {
  locale: string;
}

export default function LocaleAttributes({ locale }: LocaleAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
