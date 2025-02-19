"use client"

import { useState } from "react"
import Nav from "@/components/layout/Nav"
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
import { popularCompaniesJobs } from "@/global/constants"
import Footer from "@/components/layout/Footer"
import Filters from "@/pages/helpers/Filters"
import { Button } from "@/components/ui/button"
 import  {CompanyModal}  from "@/pages/domain/find-placement/CompanyModal"

type Jobs = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  logo: string;
};

function FindPlacement() {
 const [selectedCompany, setSelectedCompany] = useState<Jobs | null>(null);


  return (
    <>
      <section className="bg-white-900 pb-10">
        <Nav />
        <div className="flex items-center justify-center flex-col mt-8">
          <h1 className="text-5xl text-midnight_blue-500 font-bold">
            Find your <span className="text-blue-500">dream company</span>
          </h1>
          <p className="opacity-70 text-sm my-6 mt-4">Find the dream company you would like to work.</p>
          <div className="mt-3">
            <SearchBar className="w-full" buttonText="Search" stretch />
            <PopularSearchTerms />
          </div>
        </div>
      </section>

      <section className="px-16 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Filters />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div>
              <h2 className="text-xl text-midnight_blue-500 font-bold mb-1">Recommended Companies</h2>
              <p className="text-[10px] text-gray-500 mb-6">Peoples popular choices</p>

              <div className="space-y-4">
                {popularCompaniesJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg p-6 flex items-center gap-6 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src={job.logo || "/placeholder.svg"} alt={job.company} width={32} height={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{job.title}</h3>
                      <div className="text-sm text-gray-600 mb-2">
                        {job.company} • {job.location}
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-sm rounded-full">{job.type}</span>
                        {job.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 border rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <Button className="bg-[#4F3EED] hover:bg-[#4232c8]" onClick={() => setSelectedCompany(job)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious to='' />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink  to=''>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext to=''  />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </section>

      <Footer />

    <CompanyModal isOpen={!!selectedCompany} onClose={() => setSelectedCompany(null)} company={selectedCompany} />
    </>
  )
}

export default FindPlacement

