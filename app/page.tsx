"use client";

import { useState } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyMI9 } from "@/components/sections/WhyMI9";
import { ContactModal } from "@/components/ui/ContactModal";

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Navbar onInitiate={() => setContactOpen(true)} />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,23,68,0.18),transparent_65%)] blur-3xl" />
          <div className="absolute right-[-12%] top-[38rem] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(13,27,62,0.5),transparent_60%)] blur-3xl" />
          <div className="absolute left-[35%] top-[120rem] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,23,68,0.12),transparent_70%)] blur-3xl" />
        </div>
        <Hero onInitiate={() => setContactOpen(true)} />
        <WhatWeDo />
        <Services />
        <HowItWorks />
        <WhyMI9 />
        <Pricing onInitiate={() => setContactOpen(true)} />
        <Team />
        <FAQ />
        <Contact onInitiate={() => setContactOpen(true)} />
      </main>
      <Footer />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
