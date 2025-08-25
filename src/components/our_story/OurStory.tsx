'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './OurStory.module.css';
import OurStoryImage from "../../assets/ourstory/ourstory.webp"
import OurStoryImage1 from "../../assets/ourstory/ourstory1.avif"
import OurStoryImage2 from "../../assets/ourstory/ourstory2.png"

import type { StaticImageData } from 'next/image';

interface StoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image: {
    src: string | StaticImageData;
    alt: string;
  };
}


const defaultEvents: StoryEvent[] = [
  {
    id: 'first-meet',
    date: 'August 15, 2023',
    title: 'First Meeting',
    description: 'We first met at a mutual friend\'s Diwali celebration. The festival of lights truly brought light into our lives.',
    image: {
      src: OurStoryImage,
      alt: 'Ilik meeting at Diwali celebration'
    }
  },
  {
    id: 'first-date',
    date: 'September 1, 2023',
    title: 'First Date',
    description: 'Our first date was at a local chai cafe. We talked for hours about our families, dreams, and shared love for Bollywood movies.',
    image: {
      src: OurStoryImage1,
      alt: 'First date at the chai cafe'
    }
  },
  {
    id: 'proposal',
    date: 'February 14, 2024',
    title: 'The Proposal',
    description: 'During a family trip to Udaipur, surrounded by the beauty of the City Palace, we decided to spend our lives together.',
    image: {
      src: OurStoryImage2,
      alt: 'Proposal at Udaipur City Palace'
    }
  }
];

export default function OurStory(){
  const [activeEvent, setActiveEvent] = useState<string>(defaultEvents[0].id);

  return (
    <section className={styles.ourStory} id="our-story">
      <div className={styles.decorativeHeader}>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h2 className={styles.title}>Our Story</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
      </div>

      <p className={styles.introduction}>
        The beautiful journey of Priya & Jane
      </p>

      <div className={styles.timeline}>
        <div className={styles.timelineNav} role="tablist" aria-label="Story timeline">
          {defaultEvents.map((event, index) => (
            <button
              key={event.id}
              className={`${styles.timelinePoint} ${activeEvent === event.id ? styles.active : ''}`}
              onClick={() => setActiveEvent(event.id)}
              role="tab"
              aria-selected={activeEvent === event.id}
              aria-controls={`story-${event.id}`}
              id={`tab-${event.id}`}
            >
              <span className={styles.timelineDate}>{event.date}</span>
              <span className={styles.timelineDot} aria-hidden="true" />
              <span className={styles.timelineTitle}>{event.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.storyContent}>
          {defaultEvents.map((event) => (
            <div
              key={event.id}
              id={`story-${event.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${event.id}`}
              className={`${styles.storyEvent} ${activeEvent === event.id ? styles.active : ''}`}
              hidden={activeEvent !== event.id}
            >
              <div className={styles.storyImage}>
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  width={600}
                  height={400}
                  className={styles.image}
                />
              </div>
              <div className={styles.storyText}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDate}>{event.date}</p>
                <p className={styles.eventDescription}>{event.description}</p>
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
