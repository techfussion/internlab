import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Signup from "@/components/layout/Signup";
import Login from "@/components/layout/Login";

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
                <p className="mr-10"><Link to="/">internlab</Link></p>
                <ul className="flex gap-4 text-xs items-center">
                    <Link to="/placements" className={`${style('/placement')} hover:text-purple-500`}>Find Placement</Link>
                    <Link to="/companies" className={`${style('/companies')}  hover:text-purple-500`}>Browse Companies</Link>
                </ul>
            </div>
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="link" className="text-purple-500 text-xs hover:text-purple-300">Login</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white-500">
                        <DialogTitle >
                            Login
                        </DialogTitle>
                        <Login />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>
                        <Button className="rounded-none text-xs bg-purple-500 hover:bg-purple-300">Sign Up</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white-500">
                        <DialogTitle>
                            Sign Up
                        </DialogTitle>
                        <Signup />
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    )
}

export default Nav;