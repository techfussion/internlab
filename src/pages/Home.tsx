import React from "react";
import SearchBar from "../components/SearchBar";
import Nav from "../layout/Nav";
import Dashes from "../assets/Vector.png";
import vodafone from "../assets/logo/vodafone-2017-logo.svg";
import intel from "../assets/logo/intel-3.svg";
import tesla from "../assets/logo/tesla-9 1.svg";
import amd from "../assets/logo/amd-logo-1.svg";
import talkit from "../assets/logo/talkit 1.svg";
import pattern from "../assets/Pattern.png";
import { category, popularRoles, popularCompanies, categoryColorCode } from "../global/constants";
import { icons } from "../global/imageUtil";
import Button from "../components/Button";
import Footer from "../layout/Footer";


const Home: React.FC = () => {
    return (
        <>
            <div className="bg-customGray1 pb-10">
                <Nav />
                <section className="flex justify-center flex-col px-16 mt-8">
                    <h1 className="text-5xl text-textDarkBlue1 leading-tight font-bold">Discover <br /> more than <br /> <span className="text-textBlue2">5000+ Placements</span></h1>
                    <img src={Dashes} alt="line" className="w-96"/>
                    <p className="opacity-70 text-sm text-textGray3 w-4/12 my-3">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                    <SearchBar />
                    <p className="text-xs text-textBlack1 mt-3 opacity-70">Popular : <a href="#">UI Designer</a>, <a href="#">UX Researcher</a>, <a href="#">Admin</a></p>
                </section>
            </div>
            <section className="px-16 pb-10">
                <div>
                    <p className="my-7 text-xs opacity-50">Some of the companies we connect you with</p>
                    <div className="flex justify-between">
                        <img src={vodafone} alt="logo" className="w-32"/>
                        <img src={intel} alt="logo" className="w-16"/>
                        <img src={tesla} alt="logo" className="w-28"/>
                        <img src={amd} alt="logo" className="w-16"/>
                        <img src={talkit} alt="logo" className="w-16"/>
                    </div>
                </div>
            </section>
            <section className="px-16 mt-8 pb-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl text-textDarkBlue1 font-bold">Explore by <span className="text-textBlue2">category</span></h2>
                    <div className="flex gap-2">
                        <p className="text-xs text-textBlue1 cursor-pointer">Show all</p>
                        <img src={icons.arrowRightBlue} alt="arrow" className="w-2"/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between mt-5">
                    {category.map((item, index) => (
                        <div key={index} className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105">
                            <img src={item.img} alt="icon" className="w-8"/>
                            <h4 className="font-semibold text-base text-textDarkBlue1 mt-3 mb-2">{item.name}</h4>
                            <div className="flex gap-2 items-center">
                                <p className="text-xs opacity-50">Explore category</p>
                                <img src={icons.arrowRight} alt="arrow" className="w-2"/>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="px-16 mt-8 pb-10">
                <div className="bg-customBlue1 flex py-10 h-96 flex items-center justify-evenly">
                    <div className="text-white">
                        <h2 className="text-3xl leading-tight font-bold">Recommend  <br />placements easily</h2>
                        <p className="text-xs my-4 w-6/12 font-normal">Recommend companies that are not availalbe in our database, rate, and leave feedback for others.</p> 
                        <Button text="Recommend" fill="bg-white" color="text-textBlue1" onClick={() => {}}/>
                    </div>
                    <img className="relative right-0" src="https://picsum.photos/200/300" alt="image"/>               
                </div>
            </section>
            <section className="px-16 mt-8 pb-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl text-textDarkBlue1 font-bold">Popular <span className="text-textBlue2">companies</span></h2>
                    <div className="flex gap-2">
                        <p className="text-xs text-textBlue1 cursor-pointer">Show all</p>
                        <img src={icons.arrowRightBlue} alt="arrow" className="w-2"/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between mt-5">
                    {popularCompanies.map((item, index) => (
                        <div key={index} className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] bg-white">
                            <div className="flex flex-col mb-5 gap-3">
                                <img src={item.img} alt="icon" className="w-4"/>
                                <h4 className="font-medium text-sm text-textDarkBlue1">{item.name}</h4>
                            </div>
                            <p className="text-xs opacity-50 mb-5">{item.about.slice(0, 100) + '...'}</p>
                            <div className="flex gap-1">
                                <p className="text-[10px] font-extralight text-textBlue1">Click to view full company detail</p>
                                <img src={icons.arrowRightBlue} alt="arrow" className="w-2"/>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="px-16 mt-8 p-10 bg-customGray1 relative">
                <img src={pattern} alt="pattern" className="absolute top-0 right-0 w-2/4 h-full"/>
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl text-textDarkBlue1 font-bold">Popular <span className="text-textBlue2">roles</span></h2>
                    <div className="flex gap-2">
                        <p className="text-xs text-textBlue1 cursor-pointer z-[1]">Show all</p>
                        <img src={icons.arrowRightBlue} alt="arrow" className="w-2"/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between mt-5">
                    {popularRoles.map((item, index) => (
                        <div key={index} className="flex flex-col my-5 p-4 border w-56 cursor-pointer hover:scale-105 z-[1] bg-white">
                            <div className="flex justify-between mb-5">
                                <h4 className="font-medium text-sm text-textDarkBlue1">{item.name}</h4>
                                <img src={item.img} alt="icon" className="w-4"/>
                            </div>
                            <p className="text-xs opacity-50 mb-5">{item.name} is one of the most sort after roles, click find placement under this role..</p>
                            <div className={`flex gap-2 items-center`}>
                                {item.category.map((cat, index) => (
                                    <p className={`text-[10px] ${categoryColorCode[cat]} font-thin px-2 py-1 rounded-full`} key={index}>{cat}</p>
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

export default Home;