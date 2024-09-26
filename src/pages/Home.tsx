import SearchBar from "../components/SearchBar";
import Nav from "../layout/Nav";
import Dashes from "../assets/Vector.png";

const Home: React.FC = () => {
    return (
        <>
            <div className="bg-customGray1 pb-10">
                <Nav />
                <section className="flex justify-center flex-col px-16 mt-10">
                    <h1 className="text-5xl text-textDarkBlue1 leading-tight">Discover <br /> more than <br /> <span className="text-textBlue2">5000+ Placements</span></h1>
                    <img src={Dashes} alt="line" className="w-96"/>
                    <p className="opacity-70 text-base text-textGray3 w-5/12 my-3">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                    <SearchBar />
                    <p className="text-xs text-textBlack1 mt-3">Popular : <a href="#">UI Designer</a>, <a href="#">UX Researcher</a>, <a href="#">Admin</a></p>
                </section>
            </div>
        </>
    )
}

export default Home;