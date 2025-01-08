import { icons } from "../global/imageUtil";
import { Button } from "./ui/button";

interface SearchBarProps {
    className?: string;
    buttonText?: string;
    stretch?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({className, buttonText, stretch}) => {
    return(
        <form className={`flex justify-center gap-3 bg-white-500 p-2 ${stretch ? 'w-[100%]' : 'w-max'} text-xs ${className}`}>
            <div className="flex gap-3">
                <img src={icons.search} alt="search" className="ml-2 w-3"/>
                <input type="text" name="searchString" placeholder="Company, title or keyword" className={`${stretch ? 'w-[350px]' : 'w-[200px]'} border-b outline-0 px-1 text-midnight_blue-500`}/>
            </div>
            <div className={`flex ${stretch ? 'w-[350px]' : 'w-[200px]'} gap-3`}>
                <img src={icons.location} alt="location" className="w-3"/>
                <select className="border-b text-midnight_blue-500 opacity-90 outline-0 w-[90%]">
                    <option>Lokoja, Kogi</option>
                    <option>Ikoyi, Lagos</option>
                    <option>Maitama, Abuja</option>
                </select>
            </div>
            <Button className="rounded-none bg-purple-500 hover:bg-purple-300 text-xs">{buttonText || 'Search for placement'}</Button>
        </form>
    )
}

export default SearchBar;