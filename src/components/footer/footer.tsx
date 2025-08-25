'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';

interface FooterProps {
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  weddingDate: Date;
  venue: {
    name: string;
    city: string;
  };
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

interface FooterSection {
  id: string;
  title: string;
  links: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

const navigationSections: FooterSection[] = [
  {
    id: 'main',
    title: 'Quick Links',
    links: [
      { id: 'story', label: 'Our Story', href: '#our-story' },
      { id: 'ceremony', label: 'Ceremony', href: '#ceremony' },
      { id: 'events', label: 'Events', href: '#events' },
      { id: 'gallery', label: 'Gallery', href: '#gallery' },
      { id: 'rsvp', label: 'RSVP', href: '#rsvp' }
    ]
  },
  {
    id: 'events',
    title: 'Wedding Events',
    links: [
      { id: 'mehendi', label: 'Mehendi Night', href: '#events' },
      { id: 'sangeet', label: 'Sangeet', href: '#events' },
      { id: 'wedding', label: 'Wedding Ceremony', href: '#ceremony' },
      { id: 'reception', label: 'Reception', href: '#events' }
    ]
  },
  {
    id: 'info',
    title: 'Information',
    links: [
      { id: 'accommodations', label: 'Accommodations', href: '#accommodations' },
      { id: 'travel', label: 'Travel Info', href: '#travel' },
      { id: 'gifts', label: 'Gift Registry', href: '#gifts' },
      { id: 'contact', label: 'Contact Us', href: '#contact' }
    ]
  }
];

export default function Footer({ coupleNames, weddingDate, venue, socialLinks = {} }: FooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.decorativeTop}>
        <Image
          src="/mandala-small.svg"
          alt=""
          width={100}
          height={100}
          className={styles.topMandala}
          aria-hidden="true"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h2 className={styles.names}>
            {coupleNames.partner1} & {coupleNames.partner2}
          </h2>
          <p className={styles.date}>
            {weddingDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className={styles.venue}>
            {venue.name}, {venue.city}
          </p>
        </div>

        <nav className={styles.navigation} aria-label="Footer Navigation">
          <div className={styles.navGrid}>
            {navigationSections.map((section) => (
              <div key={section.id} className={styles.navSection}>
                <button
                  className={`${styles.sectionTitle} ${
                    expandedSection === section.id ? styles.expanded : ''
                  }`}
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={expandedSection === section.id}
                  aria-controls={`section-${section.id}`}
                >
                  {section.title}
                  <span className={styles.expandIcon} aria-hidden="true" />
                </button>
                <ul
                  id={`section-${section.id}`}
                  className={`${styles.linksList} ${
                    expandedSection === section.id ? styles.expanded : ''
                  }`}
                >
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {Object.keys(socialLinks).length > 0 && (
          <div className={styles.social}>
            <h3 className={styles.socialTitle}>Follow Our Journey</h3>
            <div className={styles.socialLinks}>
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Follow us on Instagram"
                >
                  <Image
                    src="/icons/instagram.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Follow us on Facebook"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Follow us on Twitter"
                >
                  <Image
                    src="/icons/twitter.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        )}

        <div className={styles.copyright}>
          <p>
            © {new Date().getFullYear()} {coupleNames.partner1} & {coupleNames.partner2}
          </p>
          <p className={styles.love}>Made with ❤️ for our special day</p>
        </div>
      </div>
    </footer>
  );
}
