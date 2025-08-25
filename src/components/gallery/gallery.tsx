'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './gallery.module.css';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'PreWedding' | 'Mehendi' | 'Sangeet' | 'Wedding' | 'Reception';
  thumbnail: {
    width: number;
    height: number;
  };
  full: {
    width: number;
    height: number;
  };
}

interface GalleryProps {
  images?: GalleryImage[];
}

const defaultImages: GalleryImage[] = [
  {
    id: "pre-wedding-1",
    src: "/gallery/pre-wedding-1.jpg",
    alt: "Romantic couple photoshoot in garden",
    category: "PreWedding",
    thumbnail: { width: 400, height: 300 },
    full: { width: 1200, height: 800 }
  },
  {
    id: "mehendi-1",
    src: "/gallery/mehendi-1.jpg",
    alt: "Beautiful mehendi design on bride's hands",
    category: "Mehendi",
    thumbnail: { width: 400, height: 300 },
    full: { width: 1200, height: 800 }
  },
  {
    id: "sangeet-1",
    src: "/gallery/sangeet-1.jpg",
    alt: "Family dance performance at sangeet",
    category: "Sangeet",
    thumbnail: { width: 400, height: 300 },
    full: { width: 1200, height: 800 }
  }
];

const categories = [
  { id: "all", label: "All Photos" },
  { id: "PreWedding", label: "Pre-Wedding" },
  { id: "Mehendi", label: "Mehendi" },
  { id: "Sangeet", label: "Sangeet" },
  { id: "Wedding", label: "Wedding" },
  { id: "Reception", label: "Reception" }
];

export default function Gallery({ images = defaultImages }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedImageId, setExpandedImageId] = useState<string | null>(null);

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleImageClick = useCallback((imageId: string) => {
    setExpandedImageId(imageId);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedImageId(null);
    document.body.style.overflow = 'auto';
  }, []);

  const expandedImage = expandedImageId 
    ? images.find(img => img.id === expandedImageId) 
    : null;

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.decorativeHeader}>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h2 className={styles.title}>Captured Moments</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
      </div>

      <div className={styles.filters} role="tablist" aria-label="Filter gallery by category">
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.filterButton} ${
              activeCategory === category.id ? styles.active : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
            role="tab"
            aria-selected={activeCategory === category.id}
            aria-controls="gallery-grid"
          >
            {category.label}
            <span className={styles.buttonBorder} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div 
        id="gallery-grid" 
        className={styles.grid}
        role="tabpanel"
        aria-label={`Gallery showing ${activeCategory === 'all' ? 'all' : activeCategory} photos`}
      >
        {filteredImages.map((image) => (
          <button
            key={image.id}
            className={styles.imageContainer}
            onClick={() => handleImageClick(image.id)}
            aria-label={`View larger version of ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.thumbnail.width}
              height={image.thumbnail.height}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay}>
              <span className={styles.viewIcon} aria-hidden="true">
                🔍
              </span>
            </div>
          </button>
        ))}
      </div>

      {expandedImage && (
        <div 
          className={styles.modal}
          role="dialog"
          aria-label="Expanded image view"
          onClick={handleCloseExpanded}
        >
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={handleCloseExpanded}
              aria-label="Close expanded image"
            >
              ×
            </button>
            <Image
              src={expandedImage.src}
              alt={expandedImage.alt}
              width={expandedImage.full.width}
              height={expandedImage.full.height}
              className={styles.expandedImage}
              priority
            />
            <p className={styles.imageCaption}>{expandedImage.alt}</p>
          </div>
        </div>
      )}

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
