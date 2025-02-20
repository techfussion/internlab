import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Profile from "../Profile";

interface NavProps {
    className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
    const location = useLocation();

    const style = (path: string) => {
        return location.pathname === path ? 'text-purple-500 border-b-2 border-purple-500' : 'text-black';
    }

    return (
        <nav className={`flex justify-between py-3 px-16 ${className}`}>
            <div className="flex items-center">
                <p className="mr-10"><Link to="/">InternLab</Link></p>
                <ul className="flex gap-4 text-xs items-center">
                    <Link to="/placements" className={`${style('/placements')} hover:text-purple-500`}>Find Placement</Link>
                    <Link to="/companies" className={`${style('/companies')}  hover:text-purple-500`}>Browse Companies</Link>
                </ul>
            </div>
            <Profile />
        </nav>
    )
}

export default Nav;