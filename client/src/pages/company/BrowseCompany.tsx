import React, { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SearchBar from "@/components/SearchBar";
import { POPULAR_SEARCH_COMPANIES } from "@/global/constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import apiClient from "@/interceptor/axios.interceptor";
import { icons } from "@/global/imageUtil";

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
    const [loading, setLoading] = useState<boolean>(false);
    const [companies, setCompanies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const location = useLocation();
  
    const fetchCompanies = async (page = 1) => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);
        const response = await apiClient.get(`/companies?page=${page}&limit=10`, { params });
        
        const { meta, data } = response.data;
  
        setCompanies(data);
        setTotalPages(meta.pageCount);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    const generatePageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      pages.push(1);
      
      let start = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
      let end = Math.min(totalPages, start + maxPagesToShow - 1);
      
      if (end === totalPages) {
        start = Math.max(2, totalPages - maxPagesToShow + 1);
      }
      
      for (let i = start; i < end && i < totalPages; i++) {
        pages.push(i);
      }
      
      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
      
      return pages;
    };
  
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    useEffect(() => {
        fetchCompanies(currentPage);
    }, [currentPage, location.search]);
  
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
                        <SearchBar className="w-full" buttonText="Search" page="companies" stretch/>
                        <PopularSearchTerms />
                    </div>
                </div>
            </section>

            <section className="flex px-16 py-10 ">
                <aside className="pt-[3rem]">
                <Filters page="companies"/>
                </aside>
                <div className="px-16 py-10">
                    <h2 className="text-xl text-midnight_blue-500 font-bold mb-1">Recommended Companies</h2>
                    <p className="text-[10px] text-gray-500">By profile or peoples popular choices</p>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {companies.map((company, index) => (
                            <div
                            key={index}
                            className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] transition-transform"
                            >
                            <div className="flex flex-col mb-5 gap-3">
                                <img src={company.img || icons.design} alt={`${company.name} logo`} className="w-4" />
                                <h4 className="font-medium text-sm text-midnight_blue-500">
                                {company.name}
                                </h4>
                            </div>
                            <p className="text-xs opacity-50 mb-5">
                                {company.description.slice(0, 100)}...
                            </p>
                            <div className="flex gap-1">
                                <Link to={`/companies/${company.id}`} className="text-[10px] font-extralight text-purple-500">
                                Click to view full company detail
                                </Link>
                                {/* <img src={icons.arrowRightBlue} alt="arrow" className="w-2" /> */}
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {totalPages > 1 && (
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious
                        to={`#page-${currentPage - 1}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                    </PaginationItem>

                    {generatePageNumbers().map((page, index) => (
                    <PaginationItem key={page}>
                        {index > 0 && page - generatePageNumbers()[index - 1] > 1 && (
                        <PaginationEllipsis />
                        )}
                        <PaginationLink
                        to={`#page-${page}`}
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(page)}
                        >
                        {page}
                        </PaginationLink>
                    </PaginationItem>
                    ))}

                    <PaginationItem>
                    <PaginationNext 
                        to={`#page-${currentPage + 1}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            )}
            <Footer />
        </>
    )
}

export default BrowseCompany;