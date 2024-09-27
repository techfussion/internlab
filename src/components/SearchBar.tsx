import { icons } from "../global/imageUtil";
import Button from "./Button";

const SearchBar: React.FC = () => {
    return(
        <form className="flex gap-3 bg-white p-2 w-max text-xs">
            <div className="flex gap-1">
                <img src={icons.search} alt="search" className="w-3"/>
                <input type="text" name="searchString" placeholder="Company, title or keyword" className="border-b outline-0 px-1 text-textDarkBlue1"/>
            </div>
            <div className="flex gap-1">
                <img src={icons.location} alt="location" className="w-3"/>
                <select className="border-b text-textDarkBlue1 opacity-90">
                    <option>Lokoja, Kogi</option>
                    <option>Ikoyi, Lagos</option>
                    <option>Maitama, Abuja</option>
                </select>
            </div>
            <Button text="Search for placement" onClick={() => {}}/>
        </form>
    )
}

export default SearchBar;