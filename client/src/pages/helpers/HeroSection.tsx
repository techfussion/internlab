import Nav from "@/components/layout/Nav";
import SearchBar from "@/components/SearchBar";
import { PopularSearchTerms } from "./PopularSearchTerms";
import Dashes from "@/assets/Vector.png";

export const HeroSection: React.FC = () => (
    <section className="bg-white-900 pb-10">
      <Nav />
      <section className="flex justify-center flex-col px-16 mt-8">
        <h1 className="text-6xl text-midnight_blue-500 leading-tight font-bold">
          Discover <br /> more than <br />
          <span className="text-blue-500">5000+ Placements</span>
        </h1>
        <img src={Dashes} alt="decorative dashes" className="w-[550px]" />
        <p className="opacity-70 text-sm text-gray-500 w-5/12 my-6">
          Great platform for the job seeker that searching for new career heights and passionate about startups.
        </p>
        <SearchBar />
        <PopularSearchTerms />
      </section>
    </section>
  );