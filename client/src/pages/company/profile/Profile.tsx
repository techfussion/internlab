import React from "react";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom";
import { Facebook, Factory, Flame, Instagram, Linkedin, MapPin, Slash, Twitter, UsersRound} from "lucide-react";
import { Card } from "@/components/ui/card";
import pattern from "@/assets/Pattern.png";  
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { categoryColorCode, popularRoles } from "@/global/constants";
import { useCompaniesDescription } from "@/context/use-context"
import { Descriptions } from "@/global/constants"
  
const Profile: React.FC = () => {
    const { companiesName } = useParams()
  const { setSelectedCompanies } = useCompaniesDescription()
//   const [isBookmarked, setIsBookmarked] = useState(false)

  const CompaniesDescriptions = Descriptions.find(
    (company: any) => company.name.replace(/\s+/g, "-").toLowerCase() === companiesName,
  )

  useEffect(() => {
    if (CompaniesDescriptions) {
      setSelectedCompanies(CompaniesDescriptions)
      localStorage.setItem("selectedCompanies", JSON.stringify(CompaniesDescriptions))
    }
  }, [CompaniesDescriptions, setSelectedCompanies])

  if (!CompaniesDescriptions) {
    return <p className="text-center text-red-500">Companies Description not found!</p>
  }

    return (
        <>
            <section className="bg-white-900 pb-10">
                <Nav />
                <div className="flex px-16 flex-col">
                    <Breadcrumb className="mb-8">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/" className="text-xs">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/companies" className="text-xs">Companies</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-xs">{CompaniesDescriptions.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex gap-6 my-6">
                        <img src="https://picsum.photos/200" alt="Company logo" className="w-32 h-32" />
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-semibold text-midnight_blue-500">{CompaniesDescriptions.name}</h1>
                                <p className="text-[10px] border border-purple-500 text-purple-500 py-1 px-2">43 Deps</p>
                            </div>
                            <Link to="" className="text-purple-500 text-xs">
                                https://novalglam.com
                            </Link>
                            <div className="flex gap-6 mt-6">
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <Flame size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Founded</p>
                                        <p className="text-midnight_blue-500 font-semibold">{CompaniesDescriptions.founded}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <UsersRound size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Employees</p>
                                        <p className="text-midnight_blue-500 font-semibold">20+</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <MapPin size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Location</p>
                                        <p className="text-midnight_blue-500 font-semibold">{CompaniesDescriptions.locations.join(' ,')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <Factory size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Industry</p>
                                        <p className="text-midnight_blue-500 font-semibold">{CompaniesDescriptions.industry}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-16 py-10 flex gap-8">
                <div className="flex-1" style={{ flexBasis: '60%' }}>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Company Profile</h2>
                        <p className="text-xs text-gray-500">
                       {CompaniesDescriptions.company_profile}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Contact</h2>
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] w-max border border-purple-500 text-purple-500 py-1 px-2 flex gap-1 items-center"><Twitter fill="#4640DE" size={12} className="text-purple-500"/> {CompaniesDescriptions.contact_information}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                        <img src="https://picsum.photos/400" alt="Company photo" className="h-[450px] w-1/2" />
                        <div className="flex flex-col justify-between w-1/3">
                            <img src="https://picsum.photos/200" alt="Company photo" className="h-[145px]" />
                            <img src="https://picsum.photos/200" alt="Company photo" className="h-[145px]" />
                            <img src="https://picsum.photos/200" alt="Company photo" className="h-[145px]" />
                        </div>
                    </div>
                </div>
                <div className="flex-1" style={{ flexBasis: '35%' }}>
                    <div>
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Technology Stacks</h2>
                        <p className="text-xs text-gray-500">
                        Learn about the technology and tools that Novalglam uses. 
                        </p>
                        <div className="flex flex-wrap gap-2 mt-5">
                            <p className="border text-gray-500 text-xs py-1 px-4">HTML 5</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">CSS 3</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">REACT</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">REDUX</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">JAVA 8</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">SPRING BOOT</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">FRAMER</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">MIXPANEL</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">FIGMA</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">AGILE</p>
                            <p className="border text-gray-500 text-xs py-1 px-4">SCRUM</p>
                        </div>
                    </div>
                   <div className="mt-6">
  <p className="text-xs text-gray-500">
    Discover the office locations to find the best fit for you.
  </p>
  <div className="flex flex-wrap gap-2 mt-5">
    {Array.isArray(CompaniesDescriptions.office_locations) &&
    CompaniesDescriptions.office_locations.length > 0 ? (
      CompaniesDescriptions.office_locations.map((office, index) => (
        <div key={index} className="flex flex-col gap-2">
          <p className="text-xs text-gray-500">{office}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">Office locations not available.</p>
    )}
  </div>
</div>

                </div>
            </section>
<section className="px-16 py-10">
  <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Team</h2>
  <div className="flex flex-wrap gap-4 mt-5">
    {Array.isArray(CompaniesDescriptions.leadership_team) && CompaniesDescriptions.leadership_team.length > 0 ? (
      CompaniesDescriptions.leadership_team.map((member, index) => (
        <Card key={index} className="rounded-none w-44 h-44 shadow-none flex flex-col items-center">
          <img src={member.picture} alt={member.name} className="w-14 h-14 mt-4 rounded-full" />
          <h3 className="text-sm text-midnight_blue-500 font-medium mt-3">{member.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{member.role}</p>
          <div className="flex gap-2 mt-4">
            { <Instagram size={12} className="text-gray-500" />}
            {  <Linkedin size={12} className="text-gray-500" />}
          </div>
        </Card>
      ))
    ) : (
      <p className="text-gray-500">Leadership team information not available.</p>
    )}
  </div>
</section>

            <section className="px-16 py-10">
                <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Perks & Benefits</h2>
                <p className="text-xs text-gray-500">
                This job comes with the following perks and benefits
                </p>
                <div className="flex flex-wrap gap-4 mt-5">

                </div>
            </section>
            <section className="px-16 py-10 relative bg-white-900">
                <img
                    src={pattern}
                    alt="decorative pattern"
                    className="absolute top-0 right-0 w-2/4 h-full"
                />
                <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Departments</h2>
                <p className="text-xs text-gray-500">
                You'll find all the department/domain Novalglam spans that could be your fit
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                {popularRoles.map((role, index) => (
                    <div
                    key={index}
                    className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-0 transition-transform"
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
    )
}

export default Profile;