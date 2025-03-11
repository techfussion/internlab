import React, { useEffect, useState } from "react";

import Footer from "@/components/layout/Footer";
import { SectionHeader, HeroSection, CompanyLogos, CategoryGrid } from "./helpers";

import pattern from "@/assets/Pattern.png";

import {
  category,
  categoryColorCode,
} from "@/global/constants";
import { icons } from "@/global/imageUtil";
import RecommendationBanner from "@/components/layout/RecommendationBanner";
import { Link } from "react-router-dom";
import apiClient from "@/interceptor/axios.interceptor";


const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [domains, setDomains] = useState<any[]>([]);

  const fetchHomeData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/companies?page=${page}&limit=10`);
      const responseDomain = await apiClient.get(`/domains?page=${page}&take=10`);

      const { data } = response.data;
      const { domains } = responseDomain.data;

      setCompanies(data);
      setDomains(domains);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, [])

  return (
    <>
      <HeroSection />
      <CompanyLogos />
      
      <section className="px-16 mt-10 pb-10">
        <SectionHeader title="Explore by" highlightedWord="Industry Type" />
        <CategoryGrid categories={category} />
      </section>
      
      <RecommendationBanner />
      
      <section className="px-16 mt-10 pb-10">
        <SectionHeader title="Popular" highlightedWord="companies" showAll route="/companies"/>

        <div className="flex flex-wrap gap-2 mt-5">
          {companies?.map((company, index) => (
            <Link
              key={index}
              to={`/companies/${company?.id}`}
              className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] transition-transform"
            >
              <div className="flex flex-col mb-5 gap-3">
                <img src={company?.logo} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = icons.design; }} alt={`${company.name} logo`} className="w-4" />
                <h4 className="font-medium text-sm text-midnight_blue-500">
                  {company.name}
                </h4>
              </div>
              <p className="text-xs opacity-50 mb-5">
                {company?.description?.slice(0, 100)}...
              </p>
              <div className="flex gap-1">
                <p className="text-[10px] font-extralight text-purple-500">
                  Click to view full company detail
                </p>
                <img src={icons.arrowRightBlue} alt="arrow" className="w-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      
      <section className="px-16 mt-10 p-10 bg-white-900 relative">
        <img
          src={pattern}
          alt="decorative pattern"
          className="absolute top-0 right-0 w-2/4 h-full"
        />
        <SectionHeader title="Popular" highlightedWord="roles" showAll route="/placements" className="z-30"/>
        <div className="flex flex-wrap gap-2 mt-5 z-10">
          {domains?.map((domain, index) => (
            <Link
              to={`/placements/${domain?.id}`}
              key={index}
              className="flex flex-col my-5 p-4 bg-white-900 border w-56 cursor-pointer hover:scale-105 z-[1] transition-transform"
            >
              <div className="flex justify-between mb-5">
                <h4 className="font-medium text-sm text-midnight_blue-500">
                  {domain?.name}
                </h4>
                <img src={domain?.company?.logo} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = icons.design; }} alt={`${domain?.name} icon`} className="w-4" />
              </div>
              <p className="text-xs opacity-50 mb-5">
                {domain?.description}
              </p>
              <div className="flex gap-2 items-center">
                {domain?.tags?.map((tag: string, index: number) => (
                  <p
                    className={`text-[10px] ${categoryColorCode[tag]} font-thin px-2 py-1 rounded-full`}
                    key={index}
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <div className="flex gap-1">
                <p className="text-[10px] font-extralight text-purple-500">
                  View
                </p>
                <img src={icons.arrowRightBlue} alt="arrow" className="w-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Home;