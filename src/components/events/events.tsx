'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './events.module.css';
import eventsImage1 from '../../assets/events/events1.jpg';
import eventsImage2 from '../../assets/events/events2.jpg';
import eventsImage3 from '../../assets/events/events3.jpg';

interface EventDetails {
  id: string;
  name: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    mapUrl: string;
  };
  description: string;
  dress_code: string;
  image: {
    src: string;
    alt: string;
  };
  highlights: string[];
}

interface EventsProps {
  events: EventDetails[];
}

const defaultEvents: EventDetails[] = [
  {
    id: 'mehendi',
    name: 'Mehendi Night',
    date: 'December 29, 2024',
    time: '6:00 PM - 10:00 PM',
    location: {
      name: 'Garden Court',
      address: '123 Celebration Lane, Mumbai, Maharashtra 400001',
      mapUrl: 'https://goo.gl/maps/your-mehendi-location'
    },
    description: 'Join us for an evening of traditional Mehendi artistry, music, and celebrations as we adorn the bride with beautiful henna designs.',
    dress_code: 'Traditional Indian Attire (Green & Yellow Theme)',
    image: {
      src: eventsImage1.src,
      alt: 'Mehendi celebration setup'
    },
    highlights: [
      'Professional Mehendi Artists',
      'Live Folk Music',
      'Traditional Dance Performances',
      'Dinner & Refreshments'
    ]
  },
  {
    id: 'sangeet',
    name: 'Sangeet Ceremony',
    date: 'December 30, 2024',
    time: '7:00 PM - 11:00 PM',
    location: {
      name: 'Royal Ballroom',
      address: '456 Celebration Avenue, Mumbai, Maharashtra 400001',
      mapUrl: 'https://goo.gl/maps/your-sangeet-location'
    },
    description: 'An evening filled with music, dance, and celebrations as both families come together to showcase their performances.',
    dress_code: 'Indo-Western (Blue & Gold Theme)',
    image: {
      src: eventsImage2.src,
      alt: 'Sangeet ceremony setup'
    },
    highlights: [
      'Family Dance Performances',
      'Live Band',
      'Professional Choreographers',
      'Gala Dinner'
    ]
  },
  {
    id: 'reception',
    name: 'Wedding Reception',
    date: 'December 31, 2024',
    time: '7:30 PM Onwards',
    location: {
      name: 'Grand Palace Hall',
      address: '789 Celebration Road, Mumbai, Maharashtra 400001',
      mapUrl: 'https://goo.gl/maps/your-reception-location'
    },
    description: 'Join us for a grand celebration of our union with dinner, music, and blessings from all our loved ones.',
    dress_code: 'Formal Indian/Western Attire (Maroon & Gold Theme)',
    image: {
      src: eventsImage3.src,
      alt: 'Reception hall setup'
    },
    highlights: [
      "Couple's Grand Entry",
      "Photo Sessions",
      "Live Music",
      "Multi-cuisine Dinner"
    ]
  }
];

export default function Events({ events = defaultEvents }: EventsProps) {
  const [activeEvent, setActiveEvent] = useState<string>(events[0].id);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setActiveEvent(eventId);
    setExpandedMobile(expandedMobile === eventId ? null : eventId);
  };

  return (
    <section className={styles.events} id="events">
      <div className={styles.decorativeHeader}>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h2 className={styles.title}>Wedding Events</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
      </div>

      <div className={styles.eventsContainer}>
        <div className={styles.eventTabs} role="tablist" aria-label="Wedding events">
          {events.map((event) => (
            <button
              key={event.id}
              className={`${styles.eventTab} ${activeEvent === event.id ? styles.active : ''}`}
              onClick={() => handleEventClick(event.id)}
              role="tab"
              aria-selected={activeEvent === event.id}
              aria-controls={`panel-${event.id}`}
              id={`tab-${event.id}`}
            >
              <span className={styles.eventName}>{event.name}</span>
              <span className={styles.eventDate}>{event.date}</span>
            </button>
          ))}
        </div>

        <div className={styles.eventDetails}>
          {events.map((event) => (
            <div
              key={event.id}
              id={`panel-${event.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${event.id}`}
              className={`${styles.eventPanel} ${
                activeEvent === event.id || expandedMobile === event.id ? styles.active : ''
              }`}
              hidden={activeEvent !== event.id && expandedMobile !== event.id}
            >
              <div className={styles.eventImage}>
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>

              <div className={styles.eventContent}>
                <div className={styles.eventHeader}>
                  <h3 className={styles.eventTitle}>{event.name}</h3>
                  <p className={styles.eventDateTime}>
                    <span className={styles.icon}>📅</span> {event.date}
                    <br />
                    <span className={styles.icon}>⏰</span> {event.time}
                  </p>
                </div>

                <div className={styles.eventLocation}>
                  <h4 className={styles.locationTitle}>{event.location.name}</h4>
                  <p className={styles.address}>{event.location.address}</p>
                  <a
                    href={event.location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mapLink}
                  >
                    View on Google Maps
                  </a>
                </div>

                <p className={styles.description}>{event.description}</p>

                <div className={styles.dressCode}>
                  <h4 className={styles.dressCodeTitle}>Dress Code</h4>
                  <p className={styles.dressCodeText}>{event.dress_code}</p>
                </div>

                <div className={styles.highlights}>
                  <h4 className={styles.highlightsTitle}>Event Highlights</h4>
                  <ul className={styles.highlightsList}>
                    {event.highlights.map((highlight, index) => (
                      <li key={`${event.id}-highlight-${index}`} className={styles.highlightItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.decorativeFooter} aria-hidden="true">
        <Image
          src="/mandala-small.svg"
          alt=""
          width={100}
          height={100}
          className={styles.footerMandala}
        />
      </div>
    </section>
  );
}
