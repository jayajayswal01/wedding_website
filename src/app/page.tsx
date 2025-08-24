import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";

export default function Home() {
  return (
   <div>
    <h1>Hello</h1>
    <Navbar />
    <Hero 
      weddingDate={new Date('2024-12-31T17:00:00')} 
      venue="Grand Ballroom, City Hotel" 
      groomName="John" 
      brideName="Jane" 
    />
   </div>
  );
}
