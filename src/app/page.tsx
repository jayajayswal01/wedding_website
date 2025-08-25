import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import OurStory from "@/components/our_story/OurStory";
import Ceremony from "@/components/ceremony/ceremony";
import Events from "@/components/events/events";
import Gallery from '@/components/gallery/gallery';
import RSVP from "@/components/rsvp/rsvp";
import Footer from "@/components/footer/footer";

const storyEvents = [
  {
    id: 'first-meet',
    date: 'August 15, 2023',
    title: 'First Meeting',
    description: 'We first met at a mutual friend\'s Diwali celebration. The festival of lights truly brought light into our lives.',
    image: {
      src: '/story/first-meet.jpg',
      alt: 'First meeting at Diwali celebration'
    }
  },
  {
    id: 'first-date',
    date: 'September 1, 2023',
    title: 'First Date',
    description: 'Our first date was at a local chai cafe. We talked for hours about our families, dreams, and shared love for Bollywood movies.',
    image: {
      src: '/story/first-date.jpg',
      alt: 'First date at the chai cafe'
    }
  },
  {
    id: 'proposal',
    date: 'February 14, 2024',
    title: 'The Proposal',
    description: 'During a family trip to Udaipur, surrounded by the beauty of the City Palace, we decided to spend our lives together.',
    image: {
      src: '/story/proposal.jpg',
      alt: 'Proposal at Udaipur City Palace'
    }
  }
];

export default function Home() {
  return (
   <div>
    <Navbar />
    <Hero 
      weddingDate={new Date('2024-12-31T17:00:00')} 
      venue="Grand Ballroom, City Hotel" 
      groomName="John" 
      brideName="Jane" 
    />
    <OurStory 
      coupleNames={{ partner1: 'John', partner2: 'Jane' }}
      events={storyEvents}
    />
    <Ceremony 
      venue={{
        name: "Grand Ballroom, City Hotel",
        address: "123 Main Street, YourCity, Country",
        mapUrl: "https://maps.google.com/?q=Grand+Ballroom+City+Hotel",
        date: "December 31, 2024",
        time: "5:00 PM",
        image: { src: "/venue/ballroom.jpg", alt: "Grand Ballroom at City Hotel" }
      }}
      rituals={[
        { 
          id: "baraat", 
          name: "Baraat", 
          time: "5:00 PM", 
          description: "The groom's wedding procession with music and dancing.", 
          significance: "Symbolizes the groom's journey to the wedding venue.", 
          image: { src: "/rituals/baraat.jpg", alt: "Baraat procession" }
        },
        { 
          id: "phere", 
          name: "Phere", 
          time: "6:00 PM", 
          description: "The couple circles the sacred fire seven times.", 
          significance: "Represents the vows taken by the couple.", 
          image: { src: "/rituals/phere.jpg", alt: "Phere ceremony" }
        },
        { 
          id: "reception", 
          name: "Reception", 
          time: "8:00 PM", 
          description: "Celebratory dinner and dancing with family and friends.", 
          significance: "Marks the beginning of the couple's new life together.", 
          image: { src: "/rituals/reception.jpg", alt: "Wedding reception" }
        }
      ]}
    />
    <Events events={[
      {
        id: "sangeet",
        name: "Sangeet",
        date: "December 30, 2024",
        time: "7:00 PM",
        location: {
          name: "Banquet Hall, City Hotel",
          address: "123 Main Street, YourCity, Country",
          mapUrl: "https://maps.google.com/?q=Banquet+Hall+City+Hotel"
        },
        description: "A night of music and dance to celebrate the upcoming wedding.",
        image: { src: "/events/sangeet.jpg", alt: "Sangeet celebration" },
        dress_code: "Traditional/Indian Attire",
        highlights: [
          "Live music and dance performances",
          "Family dance-off",
          "Snacks and refreshments"
        ]
      },
      {
        id: "mehendi",
        name: "Mehendi",
        date: "December 29, 2024",
        time: "4:00 PM",
        location: {
          name: "Garden Lawn, City Hotel",
          address: "123 Main Street, YourCity, Country",
          mapUrl: "https://maps.google.com/?q=Garden+Lawn+City+Hotel"
        },
        description: "Traditional mehendi ceremony with family and friends.",
        image: { src: "/events/mehendi.jpg", alt: "Mehendi ceremony" },
        dress_code: "Colorful/Floral Attire",
        highlights: [
          "Mehendi artist for guests",
          "Light snacks and drinks",
          "Photo booth"
        ]
      }
    ]} />
    <Gallery 
      // Optional: provide custom images array to override defaults
    />
    <RSVP deadline="2024-12-15" />
    <Footer 
      coupleNames={{ partner1: 'John', partner2: 'Jane' }}
      weddingDate={new Date('2024-12-31T17:00:00')}
      venue={{ name: "Grand Ballroom, City Hotel", city: "YourCity" }}
    />
   </div>
  );
}
