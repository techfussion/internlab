import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { LogOut, UserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Signup from "@/components/layout/Signup";
import Login from "@/components/layout/Login";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <UserRound className="text-xs h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-max">
            <div className="flex flex-col items-center gap-1">
              <Button variant="link" size="sm" className="text-xs" asChild>
                <Link to="/profile">Profile</Link>
              </Button>
              <Button variant="link" size="sm" className="text-xs" asChild>
                <Link to="/submissions">My Submission</Link>
              </Button>
              <Button variant="link" size="sm" className="text-xs" asChild>
                <Link to="/reviews">My Reviews</Link>
              </Button>
              <Button variant="link" size="sm" className="text-xs" asChild>
                <Link to="/bookmarks">Bookmarks</Link>
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-xs text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
        <Dialog>
            <DialogTrigger>
                <Button variant="link" className="text-purple-500 text-xs hover:text-purple-300">Login</Button>
            </DialogTrigger>
            <DialogContent className="bg-white-500">
                <DialogTitle className="text-blue-500 text-xs">
                    / Login
                </DialogTitle>
                <Login />
            </DialogContent>
        </Dialog>
        <Dialog>
            <DialogTrigger>
                <Button className="rounded-none text-xs bg-purple-500 hover:bg-purple-300">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="bg-white-500">
                <DialogTitle className="text-blue-500 text-xs">
                    / Sign Up
                </DialogTitle>
                <Signup />
            </DialogContent>
        </Dialog>
    </div>
  );
};

export default Profile;