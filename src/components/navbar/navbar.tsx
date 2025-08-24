'use client';

import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'couple',
    label: 'Our Story',
    href: '/our-story'
  },
  {
    id: 'ceremony',
    label: 'Ceremony',
    href: '/ceremony',
    subItems: [
      { id: 'venue', label: 'Venue', href: '/ceremony/venue' },
      { id: 'schedule', label: 'Schedule', href: '/ceremony/schedule' },
      { id: 'rituals', label: 'Hindu Rituals', href: '/ceremony/rituals' }
    ]
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    subItems: [
      { id: 'mehendi', label: 'Mehendi', href: '/events/mehendi' },
      { id: 'sangeet', label: 'Sangeet', href: '/events/sangeet' },
      { id: 'reception', label: 'Reception', href: '/events/reception' }
    ]
  },
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery'
  },
  {
    id: 'rsvp',
    label: 'RSVP',
    href: '/rsvp'
  }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDropdownToggle(id);
    }
  }, []);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(`.${styles.navbar}`)) {
      setActiveDropdown(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.navbarBrand}>
        <Link href="/" className={styles.logo}>
          John & Jane
        </Link>
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={handleMenuToggle}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`${styles.navItem} ${
              item.subItems ? styles.hasDropdown : ''
            } ${activeDropdown === item.id ? styles.active : ''}`}
          >
            {item.subItems ? (
              <>
                <button
                  className={styles.dropdownToggle}
                  onClick={() => handleDropdownToggle(item.id)}
                  onKeyDown={(e) => handleKeyPress(e, item.id)}
                  aria-expanded={activeDropdown === item.id}
                  aria-haspopup="true"
                >
                  {item.label}
                  <span className={styles.dropdownArrow} aria-hidden="true" />
                </button>
                <ul
                  className={`${styles.dropdownMenu} ${
                    activeDropdown === item.id ? styles.show : ''
                  }`}
                  role="menu"
                >
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id} role="none">
                      <Link
                        href={subItem.href}
                        className={styles.dropdownItem}
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
