import React from "react";
import Hero from "../components/Hero";
import ServiceSection from "../components/Servicesection";
import SDGSection from "../components/SDGSection";
import SectionImpact from "../components/SectionImpact";
import LawInNumbersSection from "../components/LawNum";
import SectionMission from "../components/Goals";

const Home = () => {
  return (
    <>
      <Hero />
      <ServiceSection />
      <SDGSection />
      <SectionImpact />
      <LawInNumbersSection />
      <SectionMission />
    </>
  );
};

export default Home;
