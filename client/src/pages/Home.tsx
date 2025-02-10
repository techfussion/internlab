import React from "react";

import Footer from "@/components/layout/Footer";
import { SectionHeader, HeroSection, CompanyLogos, CategoryGrid } from "./helpers";

import pattern from "@/assets/Pattern.png";

import {
  category,
  popularRoles,
  popularCompanies,
  categoryColorCode,
} from "@/global/constants";
import { icons } from "@/global/imageUtil";
import RecommendationBanner from "@/components/layout/RecommendationBanner";


const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CompanyLogos />
      
      <section className="px-16 mt-10 pb-10">
        <SectionHeader title="Explore by" highlightedWord="category" />
        <CategoryGrid categories={category} />
      </section>
      
      <RecommendationBanner />
      
      <section className="px-16 mt-10 pb-10">
        <SectionHeader title="Popular" highlightedWord="companies" />
        <div className="flex flex-wrap gap-2 mt-5">
          {popularCompanies.map((company, index) => (
            <div
              key={index}
              className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] transition-transform"
            >
              <div className="flex flex-col mb-5 gap-3">
                <img src={company.img} alt={`${company.name} logo`} className="w-4" />
                <h4 className="font-medium text-sm text-midnight_blue-500">
                  {company.name}
                </h4>
              </div>
              <p className="text-xs opacity-50 mb-5">
                {company.about.slice(0, 100)}...
              </p>
              <div className="flex gap-1">
                <p className="text-[10px] font-extralight text-purple-500">
                  Click to view full company detail
                </p>
                <img src={icons.arrowRightBlue} alt="arrow" className="w-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="px-16 mt-10 p-10 bg-white-900 relative">
        <img
          src={pattern}
          alt="decorative pattern"
          className="absolute top-0 right-0 w-2/4 h-full"
        />
        <SectionHeader title="Popular" highlightedWord="roles" />
        <div className="flex flex-wrap gap-2 mt-5">
          {popularRoles.map((role, index) => (
            <div
              key={index}
              className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] transition-transform"
            >
              <div className="flex justify-between mb-5">
                <h4 className="font-medium text-sm text-midnight_blue-500">
                  {role.name}
                </h4>
                <img src={role.img} alt={`${role.name} icon`} className="w-4" />
              </div>
              <p className="text-xs opacity-50 mb-5">
                {role.name} is one of the most sought after roles, click find
                placement under this role...
              </p>
              <div className="flex gap-2 items-center">
                {role.category.map((cat, index) => (
                  <p
                    className={`text-[10px] ${categoryColorCode[cat]} font-thin px-2 py-1 rounded-full`}
                    key={index}
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;