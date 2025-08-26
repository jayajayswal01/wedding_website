'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ceremony.module.css';
import ceremonyImage1 from "../../assets/ceremony/ceremony1.jpg"
import ceremonyImage2 from "../../assets/ceremony/ceremony2.jpg"
import ceremonyImage3 from "../../assets/ceremony/ceremony3.webp"
import ceremonyImage4 from "../../assets/ceremony/ceremony4.jpg"
import ceremonyImage5 from "../../assets/ceremony/ceremony5.webp"

interface Ritual {
  id: string;
  name: string;
  description: string;
  time: string;
  significance: string;
  image: {
    src: string;
    alt: string;
  };
}

interface VenueDetails {
  name: string;
  address: string;
  date: string;
  time: string;
  mapUrl: string;
  image: {
    src: string;
    alt: string;
  };
}


const defaultRituals: Ritual[] = [
  {
    id: 'ganesh-puja',
    name: 'Ganesh Puja',
    description: 'The ceremony begins with prayers to Lord Ganesha, the remover of obstacles.',
    time: '8:00 AM',
    significance: 'Invoking Lord Ganesha\'s blessings ensures a smooth and successful wedding ceremony.',
    image: {
      src: ceremonyImage1.src,
      alt: 'Ganesh Puja ceremony'
    }
  },
  {
    id: 'mandap-muhurat',
    name: 'Mandap Muhurat',
    description: 'The sacred wedding canopy is blessed and sanctified.',
    time: '9:00 AM',
    significance: 'The mandap represents the couple\'s new home and the four pillars of life.',
    image: {
      src: ceremonyImage2.src,
      alt: 'Wedding Mandap decoration'
    }
  },
  {
    id: 'var-mala',
    name: 'Var Mala',
    description: 'Exchange of garlands between the bride and groom.',
    time: '11:00 AM',
    significance: 'Symbolizes the acceptance of each other as life partners.',
    image: {
      src: ceremonyImage3.src,
      alt: 'Varmala ceremony'
    }
  },
  {
    id: 'saat-phere',
    name: 'Saat Phere',
    description: 'The sacred seven rounds around the ceremonial fire.',
    time: '12:00 PM',
    significance: 'Each phera represents a sacred vow and blessing for the couple\'s married life.',
    image: {
      src: ceremonyImage4.src,
      alt: 'Saat Phere ceremony'
    }
  }
];

const defaultVenue: VenueDetails = {
  name: 'Royal Garden Palace',
  address: '123 Wedding Avenue, Mumbai, Maharashtra 400001',
  date: 'December 31, 2024',
  time: '8:00 AM onwards',
  mapUrl: 'https://goo.gl/maps/your-venue-location',
  image: {
    src: ceremonyImage5.src,
    alt: 'Royal Garden Palace venue'
  }
};

export default function Ceremony() {
  const [activeRitual, setActiveRitual] = useState<string>(defaultRituals[0].id);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  return (
    <section className={styles.ceremony} id="ceremony">
      <div className={styles.decorativeHeader}>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h2 className={styles.title}>Wedding Ceremony</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
      </div>

      {/* Venue Section */}
      <div className={styles.venueSection}>
        <div className={styles.venueImage}>
          <Image
            src={defaultVenue.image.src}
            alt={defaultVenue.image.alt}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
        <div className={styles.venueDetails}>
          <h3 className={styles.venueName}>{defaultVenue.name}</h3>
          <p className={styles.venueAddress}>{defaultVenue.address}</p>
          <div className={styles.dateTime}>
            <div className={styles.dateTimeItem}>
              <span className={styles.icon}>📅</span>
              <span>{defaultVenue.date}</span>
            </div>
            <div className={styles.dateTimeItem}>
              <span className={styles.icon}>⏰</span>
              <span>{defaultVenue.time}</span>
            </div>
          </div>
          <a 
            href={defaultVenue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            View on Google Maps
          </a>
        </div>
      </div>

      {/* Rituals Timeline */}
      <div className={styles.ritualsSection}>
        <h3 className={styles.ritualsTitle}>Wedding Rituals</h3>
        
        <button 
          className={`${styles.timelineToggle} ${isTimelineExpanded ? styles.expanded : ''}`}
          onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
          aria-expanded={isTimelineExpanded}
        >
          View Timeline
          <span className={styles.toggleIcon} aria-hidden="true" />
        </button>

        <div className={`${styles.ritualsTimeline} ${isTimelineExpanded ? styles.expanded : ''}`}>
          {defaultRituals.map((ritual, index) => (
            <div
              key={ritual.id}
              className={`${styles.ritualCard} ${activeRitual === ritual.id ? styles.active : ''}`}
            >
              <div className={styles.ritualTime}>
                <span className={styles.timeLabel}>{ritual.time}</span>
                <div className={styles.timelineDot} aria-hidden="true" />
              </div>
              
              <button
                className={styles.ritualContent}
                onClick={() => setActiveRitual(ritual.id)}
                aria-expanded={activeRitual === ritual.id}
              >
                <h4 className={styles.ritualName}>{ritual.name}</h4>
                <p className={styles.ritualDescription}>{ritual.description}</p>
                
                {activeRitual === ritual.id && (
                  <div className={styles.ritualDetails}>
                    <div className={styles.ritualImage}>
                      <Image
                        src={ritual.image.src}
                        alt={ritual.image.alt}
                        width={400}
                        height={300}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.ritualSignificance}>
                      <h5>Significance</h5>
                      <p>{ritual.significance}</p>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.decorativeFooter}>
        <Image
          src="/mandala-small.svg"
          alt=""
          width={100}
          height={100}
          className={styles.footerMandala}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
