type OrganizationData = {
  name: string;
  description: string;
  url: string;
  logo: string;
  email: string;
  telephone: string;
  address: {
    city: string;
    country: string;
  };
  sameAs: string[];
};

type ServiceData = {
  name: string;
  description: string;
};

type Props = {
  organization: OrganizationData;
  services: ServiceData[];
};

export default function StructuredData({ organization, services }: Props) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    description: organization.description,
    url: organization.url,
    logo: organization.logo,
    email: organization.email,
    telephone: organization.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: organization.address.city,
      addressCountry: organization.address.country,
    },
    sameAs: organization.sameAs,
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: organization.name,
    description: organization.description,
    url: organization.url,
    logo: organization.logo,
    email: organization.email,
    telephone: organization.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: organization.address.city,
      addressCountry: organization.address.country,
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML for structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML for structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {services.map((service) => (
        <script
          key={service.name}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires innerHTML
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              provider: { '@type': 'Organization', name: organization.name },
              name: service.name,
              description: service.description,
            }),
          }}
        />
      ))}
    </>
  );
}
