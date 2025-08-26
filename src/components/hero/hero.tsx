'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './hero.module.css';
import heroImage from "../../assets/hero/hero.jpg"

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroProps {
  weddingDate: Date;
  venue: string;
  groomName: string;
  brideName: string;
}

const calculateTimeLeft = (weddingDate: Date): CountdownTime => {
  const difference = weddingDate.getTime() - new Date().getTime();
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const formatNumber = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export default function Hero({ weddingDate, venue, groomName, brideName }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft(weddingDate));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);

    // Trigger fade-in animation after component mounts
    const animationTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearInterval(timer);
      clearTimeout(animationTimer);
    };
  }, [weddingDate]);

  return (
    <section className={`${styles.hero} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.backgroundOverlay} />
      
      <div className={styles.content}>
        <h1 className={styles.names} aria-label={`${groomName} and ${brideName}'s Wedding`}>
          <span className={styles.nameText}>{groomName}</span>
          <span className={styles.ampersand}>&</span>
          <span className={styles.nameText}>{brideName}</span>
        </h1>

        <p className={styles.date}>
          {weddingDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        
        <p className={styles.venue}>{venue}</p>

        <div className={styles.countdown} role="timer" aria-label="Time until wedding">
          <div className={styles.countdownItem}>
            <span className={styles.number}>{formatNumber(timeLeft.days)}</span>
            <span className={styles.label}>Days</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.number}>{formatNumber(timeLeft.hours)}</span>
            <span className={styles.label}>Hours</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.number}>{formatNumber(timeLeft.minutes)}</span>
            <span className={styles.label}>Minutes</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.number}>{formatNumber(timeLeft.seconds)}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>

        <div className={styles.cta}>
          <Link href="/ceremony" className={`${styles.button} ${styles.primary}`}>
            View Ceremony Details
          </Link>
          <Link href="/rsvp" className={`${styles.button} ${styles.secondary}`}>
            RSVP Now
          </Link>
        </div>
      </div>

      <div className={styles.decorativeElement} aria-hidden="true">
        <Image
          src={heroImage}
          alt=""
          width={200}
          height={200}
          className={styles.mandala}
        />
      </div>
    </section>
  );
}
