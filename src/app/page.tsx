import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import OurStory from "@/components/our_story/OurStory";
import Ceremony from "@/components/ceremony/ceremony";
import Events from "@/components/events/events";
import Gallery from '@/components/gallery/gallery';
import RSVP from "@/components/rsvp/rsvp";
import Footer from "@/components/footer/footer";
import Event1 from "../assets/events/events1.jpg"
import Event2 from "../assets/events/events2.jpg"



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
      />
      <Ceremony />
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
          image: { src: Event2.src, alt: "Sangeet celebration" },
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
          image: { src: Event1.src, alt: "Mehendi ceremony" },
          dress_code: "Colorful/Floral Attire",
          highlights: [
            "Mehendi artist for guests",
            "Light snacks and drinks",
            "Photo booth"
          ]
        }
      ]} />
      <Gallery />
      <RSVP deadline="2024-12-15" />
      <Footer
        coupleNames={{ partner1: 'John', partner2: 'Jane' }}
        weddingDate={new Date('2024-12-31T17:00:00')}
        venue={{ name: "Grand Ballroom, City Hotel", city: "YourCity" }}
      />
    </div>
  );
}
