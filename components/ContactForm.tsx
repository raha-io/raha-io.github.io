'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SendIcon } from './icons';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const createGitHubIssue = () => {
    const title = encodeURIComponent(`Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `## Contact Form Submission

**Name:** ${formData.name}
**Email:** ${formData.email}
**Company:** ${formData.company || 'Not provided'}

## Message

${formData.message}
`
    );

    window.open(
      `https://github.com/raha-io/raha-io.github.io/issues/new?title=${title}&body=${body}&labels=contact`,
      '_blank'
    );
  };

  const sendViaEmail = () => {
    const subject = encodeURIComponent(`New inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:elahe.dstn@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Try GitHub first, with email as fallback
    createGitHubIssue();

    setFormState('success');
    setTimeout(() => {
      setFormState('idle');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">{t('name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t('emailPlaceholder')}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="company">{t('company')}</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder={t('companyPlaceholder')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">{t('message')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
        />
      </div>
      <div className="form-actions">
        <button
          type="submit"
          className="btn primary"
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? (
            t('sending')
          ) : formState === 'success' ? (
            t('sent')
          ) : (
            <>
              <SendIcon size={16} />
              {t('send')}
            </>
          )}
        </button>
        <button
          type="button"
          className="btn ghost"
          onClick={sendViaEmail}
          disabled={formState === 'submitting' || !formData.name || !formData.email || !formData.message}
        >
          {t('sendViaEmail')}
        </button>
      </div>
    </form>
  );
}
