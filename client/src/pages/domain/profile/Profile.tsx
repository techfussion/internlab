import React, { useState } from "react";
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
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Bookmark, Facebook, Factory, Flame, Instagram, Linkedin, MapPin, Phone, Slash, Star, Twitter, UsersRound} from "lucide-react";
import { Card } from "@/components/ui/card";
import pattern from "@/assets/Pattern.png";  
import { useEffect } from "react"
import { categoryColorCode } from "@/global/constants";
import apiClient from "@/interceptor/axios.interceptor";
import { icons } from "@/global/imageUtil";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SectionHeader } from "@/pages/helpers";
  
const Profile: React.FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ domainDetails, setDomainDetails ] = useState<any>({});
    const pathname = useParams();
    //   const [isBookmarked, setIsBookmarked] = useState(false)

    const fetchCompanyDetails= async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/domains/${pathname.domainName}`);
          
          const data = response.data;
        
          setDomainDetails(data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchCompanyDetails()
    }, [])

    console.log(domainDetails);

    if (!domainDetails) {
        return <p className="text-center text-red-500">Domain Description not found!</p>
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
                                    <Link to="/placements" className="text-xs">Placements</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={`/companies/${domainDetails?.companyId}`} replace className="text-xs">{domainDetails?.company?.name}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-xs">{domainDetails?.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Card className="flex justify-between py-4 px-6 border-none shadow-none gap-6 my-6 rounded-none items-center">
                        <div className="flex gap-x-8">
                            <img src={domainDetails?.company?.logo|| "https://picsum.photos/200"} alt="logo" className="w-16 h-16" />
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold text-midnight_blue-500">{domainDetails?.name}</h1>
                                <div className="text-xs text-gray-600 mb-3">
                                    {domainDetails?.company?.name} • {domainDetails?.company?.state}, {domainDetails?.company?.country}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button size='icon' variant='outline'>
                                <Bookmark size={16}/>
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
            <section className="px-16 py-10 flex gap-8">
                <div className="flex-1" style={{ flexBasis: '60%' }}>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Description</h2>
                        <p className="text-xs text-gray-500">
                            {domainDetails?.description}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Responsibilities</h2>
                        {domainDetails?.responsibilities?.map((responsibility: string, index: number) => (
                            <p key={index} className="border text-gray-500 text-xs py-1 px-4">✅{responsibility}</p>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Who You Are</h2>
                        {domainDetails?.whoYouAre?.map((you: string, index: number) => (
                            <p key={index} className="border text-gray-500 text-xs py-1 px-4">✅{you}</p>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Nice-To-Have</h2>
                        {domainDetails?.niceToHave?.map((niceToHave: string, index: number) => (
                            <p key={index} className="border text-gray-500 text-xs py-1 px-4">✅{niceToHave}</p>
                        ))}
                    </div>
                </div>
                <div className="flex-1" style={{ flexBasis: '35%' }}>
                    <div>
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Technology Stacks</h2>
                        <p className="text-xs text-gray-500">
                        Learn about the technology and tools that {domainDetails?.compnay?.name} uses. 
                        </p>
                        <div className="flex flex-wrap gap-2 mt-5">
                            {domainDetails?.company?.techStacks?.map((tech: string, index: number) => (
                                <p key={index} className="border text-gray-500 text-xs py-1 px-4">{tech}</p>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2 mt-4">Perks & Benefits</h2>
                        <p className="text-xs text-gray-500 mb-4">
                            Here are the perks and benefits you'll enjoy working here.
                        </p>
                        {domainDetails?.perks?.map((perk: string, index: number) => (
                            <p key={index} className="mt-2 text-xs text-gray-500">{perk}</p>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2 mt-4">Required Skills</h2>
                        <p className="text-xs text-gray-500 mb-4">
                            {domainDetails?.requirements}
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-16 py-10 relative bg-white-900">
                <img
                    src={pattern}
                    alt="decorative pattern"
                    className="absolute top-0 right-0 w-2/4 h-full -z-0"
                />
                <SectionHeader title="Similar" highlightedWord="" showAll route="/placements" />
                <div className="flex flex-wrap gap-2 mt-5">
                    {domainDetails?.domains?.map((domain: any, index: number) => (
                        <Link to={`/placements/${domain.id}`}
                            key={index}
                            className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-0 transition-transform"
                        >
                            <div className="flex justify-between mb-5">
                                <h4 className="font-medium text-sm text-midnight_blue-500">
                                    {domain.name}
                                </h4>
                                <img src={icons.design} alt='icon'className="w-4" />
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
                        </Link>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Profile;