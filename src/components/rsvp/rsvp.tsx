'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import styles from './rsvp.module.css';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  numberOfGuests: number;
  attendance: 'yes' | 'no' | '';
  dietaryRestrictions: string;
  events: {
    mehendi: boolean;
    sangeet: boolean;
    wedding: boolean;
    reception: boolean;
  };
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface RSVPProps {
  deadline: string;
  maxGuests?: number;
}

export default function RSVP({ deadline, maxGuests = 4 }: RSVPProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfGuests: 1,
    attendance: '',
    dietaryRestrictions: '',
    events: {
      mehendi: false,
      sangeet: false,
      wedding: false,
      reception: false
    },
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.attendance) {
      newErrors.attendance = 'Please indicate your attendance';
    }

    if (formData.attendance === 'yes') {
      if (!Object.values(formData.events).some(v => v)) {
        newErrors.events = 'Please select at least one event';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), maxGuests);
    setFormData(prev => ({
      ...prev,
      numberOfGuests: value
    }));
  };

  const handleEventToggle = (eventName: keyof FormData['events']) => {
    setFormData(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [eventName]: !prev.events[eventName]
      }
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Thank You!</h3>
        <p>Your RSVP has been successfully submitted.</p>
        <p>We look forward to celebrating with you!</p>
      </div>
    );
  }

  return (
    <section className={styles.rsvp} id="rsvp">
      <div className={styles.decorativeHeader}>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h2 className={styles.title}>RSVP</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
      </div>

      <p className={styles.deadline}>
        Please respond by <span className={styles.date}>{deadline}</span>
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Your Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.name ? styles.error : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={styles.errorMessage}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Optional"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="attendance" className={styles.label}>
            Will you be attending? <span className={styles.required}>*</span>
          </label>
          <select
            id="attendance"
            name="attendance"
            value={formData.attendance}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.attendance ? styles.error : ''}`}
            aria-invalid={!!errors.attendance}
            aria-describedby={errors.attendance ? 'attendance-error' : undefined}
          >
            <option value="">Please select...</option>
            <option value="yes">Yes, I will attend</option>
            <option value="no">No, I cannot attend</option>
          </select>
          {errors.attendance && (
            <span id="attendance-error" className={styles.errorMessage}>
              {errors.attendance}
            </span>
          )}
        </div>

        {formData.attendance === 'yes' && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="numberOfGuests" className={styles.label}>
                Number of Guests (including yourself)
              </label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                min="1"
                max={maxGuests}
                value={formData.numberOfGuests}
                onChange={handleNumberChange}
                className={styles.input}
              />
              <span className={styles.helpText}>
                Maximum {maxGuests} guests allowed
              </span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Events You Will Attend <span className={styles.required}>*</span>
              </label>
              <div className={styles.eventsGrid}>
                {Object.entries(formData.events).map(([event, checked]) => (
                  <label key={event} className={styles.eventCheckbox}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleEventToggle(event as keyof FormData['events'])}
                    />
                    <span>{event.charAt(0).toUpperCase() + event.slice(1)}</span>
                  </label>
                ))}
              </div>
              {errors.events && (
                <span className={styles.errorMessage}>
                  {errors.events}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dietaryRestrictions" className={styles.label}>
                Dietary Restrictions
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Please let us know of any dietary restrictions"
              />
            </div>
          </>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message for the Couple
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textarea}
            placeholder="Share your wishes or message for us"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </form>

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
