import React from "react";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SearchBar from "@/components/SearchBar";
import RecommendationBanner from "@/components/layout/RecommendationBanner";
import { POPULAR_SEARCH_COMPANIES } from "@/global/constants";
import { Link } from "react-router-dom";
import { popularCompanies } from "@/global/constants";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Filters from "@/pages/helpers/Filters"

const PopularSearchTerms: React.FC = () => (
    <p className="text-xs text-textBlack1 mt-4 opacity-70">
      Popular: {' '}
      {POPULAR_SEARCH_COMPANIES.map((term: any, index: any) => (
        <React.Fragment key={term}>
          {index > 0 && ', '}
          <Link to="#" className="text-blue-500 hover:text-blue-300">
            {term}
          </Link>
        </React.Fragment>
      ))}
    </p>
  );

  
const BrowseCompany: React.FC = () => {
    return (
        <>
            <section className="bg-white-900 pb-10">
                <Nav />
                <div className="flex items-center justify-center flex-col mt-8">
                    <h1 className="text-5xl text-midnight_blue-500 font-bold">
                        Find your <span className="text-blue-500">dream company</span>
                    </h1>
                    {/* <img src={Dashes} alt="Decorative dashes" className="w-[250px] mt-2 float-right" /> */}
                    <p className="opacity-70 text-sm my-6 mt-4">Find the dream company you would like to work.</p>
                    <div className="mt-3">
                        <SearchBar className="w-full" buttonText="Search" stretch/>
                        <PopularSearchTerms />
                    </div>
                </div>
            </section>

            <section className="flex justify-center self-center px-16 py-10 ">

                <aside className="pt-[3rem]">
                <Filters/>
                </aside>
            <section className="px-16 py-10">
                <h2 className="text-xl text-midnight_blue-500 font-bold mb-1">Recommended Companies</h2>
                <p className="text-[10px] text-gray-500">Peoples popular choices</p>
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
                            <Link   to={`/${company.name.replace(/\s+/g, '-').toLowerCase()}/profile`} className="text-[10px] font-extralight text-purple-500">
                            Click to view full company detail
                            </Link>
                            {/* <img src={icons.arrowRightBlue} alt="arrow" className="w-2" /> */}
                        </div>
                        </div>
                    ))}
                </div>
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious to="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink to="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext to="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
            </section>
            <RecommendationBanner />
            <Footer />
        </>
    )
}

export default BrowseCompany;