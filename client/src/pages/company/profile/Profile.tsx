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
import { toast } from "@/hooks/use-toast";
import { REACT_APP_API_BASE } from "@/global/constants";
  
const Profile: React.FC = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ companyDetails, setCompanyDetails ] = useState<any>({});
    const pathname = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    const fetchCompanyDetails= async () => {
        try {
          setLoading(true);
          const response = await apiClient.get(`/companies/${pathname.companiesName}`);
          
          const data = response.data;
        
          setCompanyDetails(data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchCompanyDetails()
    }, [])

    

    console.log(companyDetails);

  const checkBookmarkStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await apiClient.get(`${REACT_APP_API_BASE}/bookmarks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userBookmarks = response.data;

    if (companyDetails?.id && userBookmarks.length > 0) {
      const isBookmarked = userBookmarks.some(
        (bookmark: any) => bookmark.companyId === companyDetails.id
      );
      setIsBookmarked(isBookmarked);
    }
  } catch (err) {
    console.error("Error checking bookmark status:", err);
  }
};

const toggleBookmark = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast?.({
      title: "Authentication Error",
      description: "You need to be logged in to bookmark",
      variant: "destructive",
    });
    return;
  }

  if (isBookmarked) {
    toast?.({
      title: "Company already bookmarked",
      description: "You have already bookmarked this company.",
      variant: "destructive",
    });
    return;
  }

  try {
    setBookmarkLoading(true);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const domainToBookmark = companyDetails.domains?.[0]; 

    if (!domainToBookmark || !domainToBookmark.id) {
      toast?.({
        title: "Error",
        description: "Invalid domain data. Please try again.",
        variant: "destructive",
      });
      return;
    }

    console.log("Domain ID (before sending):", domainToBookmark.id, typeof domainToBookmark.id);
    console.log("Domain ID Sent:", domainToBookmark.id, typeof domainToBookmark.id);

    const response = await apiClient.post(
      `${REACT_APP_API_BASE}/bookmarks`,
      { domainId: String(domainToBookmark.id)}, 
      { headers }
    );
    

    console.log("Bookmark Response:", response.data);
    setIsBookmarked(true);
    toast?.({
      title: "Bookmarked",
      description: `Added ${companyDetails.name} to your bookmarks`,
    });

    await checkBookmarkStatus();
  } catch (err: any) {
    console.error("Error:", err.response?.status, err.response?.data);
    toast?.({
      title: "Error",
      description:
        err.response?.status === 401
          ? "Please log in again"
          : err.response?.data?.message || "Failed to update bookmark",
      variant: "destructive",
    });
  } finally {
    setBookmarkLoading(false);
  }
};


useEffect(() => {
  if (companyDetails?.id) {
    checkBookmarkStatus();
  }
}, [companyDetails]);

   

    if (!companyDetails) {
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
                                <BreadcrumbPage className="text-xs">{companyDetails.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex gap-6 my-6">
                        <img src={companyDetails.logo|| "https://picsum.photos/200"} alt="Company logo" className="w-32 h-32" />
                        <div className="flex flex-col gap-y-2">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-4">
                                    <h1 className="text-3xl font-semibold text-midnight_blue-500">{companyDetails.name}</h1>
                                    <p className="text-[10px] border border-purple-500 text-purple-500 py-1 px-2">{companyDetails?.domains?.length || 0} deps</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-xs">Rating: {companyDetails?.avgRating}</p>
                                    <Button size='icon' variant='outline'
                                        onClick={toggleBookmark}
                                        disabled={bookmarkLoading}>
                                      <Bookmark 
                                            size={16} 
                                            fill={isBookmarked ? "#4640DE" : "none"} 
                                            color={isBookmarked ? "#4640DE" : "currentColor"}
                                        />
                                    </Button>
                                </div>
                            </div>
                          
                            <div className="flex gap-6 mt-6">
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <Flame size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Founded</p>
                                        <p className="text-midnight_blue-500 font-semibold">{companyDetails.established}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <UsersRound size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Employees</p>
                                        <p className="text-midnight_blue-500 font-semibold">{companyDetails.companySize}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <MapPin size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Location</p>
                                        <p className="text-midnight_blue-500 font-semibold">{companyDetails.address}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center text-[10px]">
                                    <div className="p-2 bg-white-500 rounded-full">
                                        <Factory size={12} className="text-blue-500"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-500">Industry</p>
                                        <p className="text-midnight_blue-500 font-semibold">{companyDetails?.industryType?.join(', ')}</p>
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
                            {companyDetails.description}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Contact</h2>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs w-max text-purple-500 py-1"><span className="font-semibold text-gray-500">Email:</span> {companyDetails?.email}</p>
                            <p className="text-xs w-max text-purple-500 py-1"><span className="font-semibold text-gray-500">Phone:</span> {companyDetails?.phone}</p>
                            <p className="text-xs w-max text-purple-500 py-1"><span className="font-semibold text-gray-500">Website:</span> <a target="_blank" href={companyDetails?.website}>{companyDetails?.website}</a></p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2 mt-4">Socials</h2>
                        <div className="flex flex-col gap-2">
                            <p className="text-[10px] w-max border border-purple-500 text-purple-500 py-1 px-2 flex gap-1 items-center"><Facebook fill="#4640DE" size={12} className="text-purple-500"/><a target="_blank" href={companyDetails?.website}>{companyDetails?.facebook}</a></p>
                            <p className="text-[10px] w-max border border-purple-500 text-purple-500 py-1 px-2 flex gap-1 items-center"><Twitter fill="#4640DE" size={12} className="text-purple-500"/><a target="_blank" href={companyDetails?.website}>{companyDetails?.x}</a></p>
                            <p className="text-[10px] w-max border border-purple-500 text-purple-500 py-1 px-2 flex gap-1 items-center"><Instagram fill="#4640DE" size={12} className="text-purple-500"/><a target="_blank" href={companyDetails?.website}>{companyDetails?.instagram}</a></p>
                            <p className="text-[10px] w-max border border-purple-500 text-purple-500 py-1 px-2 flex gap-1 items-center"><Linkedin fill="#4640DE" size={12} className="text-purple-500"/><a target="_blank" href={companyDetails?.website}>{companyDetails?.linkedIn}</a></p>
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
                        Learn about the technology and tools that {companyDetails.name} uses. 
                        </p>
                        <div className="flex flex-wrap gap-2 mt-5">
                            {companyDetails?.techStacks?.map((tech: string, index: number) => (
                                <p key={index} className="border text-gray-500 text-xs py-1 px-4">{tech}</p>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Other Office Location</h2>
                        <p className="text-xs text-gray-500">
                            Discover {companyDetails?.name} other office locations to find the best fit for you.
                        </p>
                        <div className="flex flex-col flex-wrap gap-2 mt-5">
                            {Array.isArray(companyDetails?.otherOfficeLocations) &&
                                companyDetails?.otherOfficeLocations.length > 0 ? (
                                    companyDetails?.otherOfficeLocations?.map((office: string, index: number) => (
                                        <p key={index} className="text-xs text-purple-500">{`${office}`}</p>
                                    )
                                )
                            ) : (
                            <p className="text-gray-500">No other office location available.</p>
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl text-midnight_blue-500 font-bold mb-2 mt-4">Perks & Benefits</h2>
                        <p className="text-xs text-gray-500 mb-4">
                            Here are the perks and benefits you'll enjoy working here.
                        </p>
                        {companyDetails?.perks?.map((perk: string, index: number) => (
                            <p key={index} className="mt-2 text-xs text-gray-500">{perk}</p>
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-16 py-10">
                <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Team</h2>
                <div className="flex flex-wrap gap-4 mt-5">
                    {Array.isArray(companyDetails?.team) && companyDetails?.team?.length > 0 ? (
                        companyDetails?.team?.map((member: string, index: number) => {
                            const nameAndRole = member.split(' - ');
                            return (
                                <Card key={index} className="rounded-none w-44 h-44 shadow-none flex flex-col items-center justify-center">
                                    <Avatar>
                                        <AvatarFallback>{member[0]}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-sm text-midnight_blue-500 font-medium mt-3">{nameAndRole[0]}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{nameAndRole[1]}</p>
                                    <div className="flex gap-2 mt-4">
                                        { <Instagram size={12} className="text-gray-500" />}
                                        {  <Linkedin size={12} className="text-gray-500" />}
                                    </div>
                                </Card>
                            )
                        }
                    )
                    ) : (
                    <p className="text-gray-500">Leadership team information not available.</p>
                    )}
                </div>
            </section>

            <section className="px-16 py-10">
                <h2 className="text-xl text-midnight_blue-500 font-bold mb-2">Reviews</h2>
                <p className="text-xs text-gray-500">
                    Read reviews submitted to make informed decision
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
                You'll find all the department/domain {companyDetails?.name} spans that could be your fit
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                {companyDetails?.domains?.map((domain: any, index: number) => (
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