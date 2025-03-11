"use client"

import { useEffect, useState } from "react"
import Nav from "@/components/layout/Nav"
import { useLocation } from "react-router-dom";
import SearchBar from "@/components/SearchBar"
import { PopularSearchTerms } from "@/pages/helpers/PopularSearchTerms"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Footer from "@/components/layout/Footer"
import Filters from "@/pages/helpers/Filters"
import { Button } from "@/components/ui/button"
import apiClient from "@/interceptor/axios.interceptor"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { icons } from "@/global/imageUtil"

type Jobs = {
  id: string;
  name: string;
  company: {
    id: string;
    name: string;
    logo: string;
    state: string;
    country: string;
  };
  description: string;
  location: string;
  type: string;
  tags: string[];
  logo: string;
};

function FindPlacement() {
  const [loading, setLoading] = useState<boolean>(false);
  const [placements, setPlacements] = useState<Jobs[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const location = useLocation();

  const fetchPlacements = async (page = 1) => {
    try {
      setLoading(true);

      const params = new URLSearchParams(location.search);
      const response = await apiClient.get(`/domains?page=${page}&take=10`, { params });
      
      const { meta, domains } = response.data;
      const totalPages = Math.ceil(meta.total / meta.take);

      setPlacements(domains);
      setTotalPages(totalPages);
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
    fetchPlacements(currentPage);
  }, [currentPage, location.search]);

  return (
    <>
      <section className="bg-white-900 pb-10">
        <Nav />
        <div className="flex items-center justify-center flex-col mt-8">
          <h1 className="text-5xl text-midnight_blue-500 font-bold">
            Find your <span className="text-blue-500">dream Placement</span>
          </h1>
          <p className="opacity-70 text-sm my-6 mt-4">Here you will find specific roles or position offered by companies</p>
          <div className="mt-3">
            <SearchBar className="w-full" page="placements" buttonText="Search" stretch />
            <PopularSearchTerms />
          </div>
        </div>
      </section>

      <section className="px-16 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Filters page="placements"/>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div>
              <h2 className="text-xl text-midnight_blue-500 font-bold mb-1">{location.pathname === 'placements' ? "Recommended Placements": "Placement Results"}</h2>
              <p className="text-[10px] text-gray-500 mb-6">{location.pathname === 'placements' ? "By profile or peoples popular choices": "Based on filters or search"}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {placements?.map((placement) => (
                  <Card
                    key={placement.id}
                    className="bg-white p-6 flex items-center gap-6 shadow-sm rounded-none"
                  >
                    <div className="w-12 h-12 bg-white-900 rounded-lg flex items-center justify-center">
                      <img src={placement?.company?.logo} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = icons.design; }} alt={placement?.company?.name} width={32} height={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{placement?.name}</h3>
                      <div className="text-xs text-gray-600 mb-3">
                        {placement?.company?.name} • {placement?.company?.state}, {placement?.company?.country}
                      </div>
                      <p className="text-xs">{placement?.description}</p>
                      <div className="flex gap-2">
                        {placement?.tags?.map((tag) => (
                          <span key={tag} className="px-3 py-1 border rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant='outline' className="bg-[#4F3EED] hover:bg-[#4232c8] text-white-500 hover:text-white-500" size='sm'>
                        <Link to={`/placements/${placement?.id}`}>
                          View
                        </Link>
                      </Button>
                      
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>
      {totalPages > 1 && (
        <Pagination className="mb-4">
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

export default FindPlacement

