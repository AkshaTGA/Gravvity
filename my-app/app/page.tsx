"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import WingsPage from "./wings/page";
import { OverallCoordinatorsSection } from "@/components/overall-coordinators-section";
import { FacultyCoordinatorsSection } from "@/components/faculty-coordinators-section";
import IntroVideo from "@/components/intro-video";
import { useState, useEffect, JSX } from "react";

export default function Home() {
  const [content, setContent] = useState<JSX.Element>(<><IntroVideo /></>);

  useEffect(() => {
    const t = setTimeout(() => {
      setContent(
        <>
          <Navigation />
          <main className="bg-background">
            <HeroSection />
            <AboutSection />
            <WingsPage />
            <FacultyCoordinatorsSection />
            <OverallCoordinatorsSection />
          </main>
          <Footer />
        </>
      );
    }, 8500);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {content}
    </>
  );
}
