'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './icons';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => setVisible(window.scrollY > 400);
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        update();
        frame = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon size={20} />
    </button>
  );
}
