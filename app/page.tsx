import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoomsAndAvailabilitySection from "@/components/RoomsAndAvailabilitySection";
import FacilitiesSection from "@/components/FacilitiesSection";
import HomeGallerySection from "@/components/HomeGallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-900 w-full overflow-x-hidden">
      <Header />
      <Hero />
      <RoomsAndAvailabilitySection />
      <FacilitiesSection />
      <HomeGallerySection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
