import Button from "../components/Button";

const Nav: React.FC = () => {
    return (
        <nav className="flex justify-between py-3 px-16">
            <div className="flex items-center">
                <p className="mr-10"><a href="#">InternLab</a></p>
                <ul className="flex gap-4 text-xs items-center">
                    <li><a href="#">Find Placement</a></li>
                    <li><a href="#">Browse Companies</a></li>
                </ul>
            </div>
            <div>
                <Button text="Login" clear onClick={() => {}} />
                <Button text="Sign Up" onClick={() => {}}/>
            </div>
        </nav>
    )
}

export default Nav;