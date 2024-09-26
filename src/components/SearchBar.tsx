import Button from "./Button";

const SearchBar: React.FC = () => {
    return(
        <form className="flex gap-3 bg-white p-2 w-max text-xs">
            <input type="text" name="searchString" placeholder="Company, title or keyword" className="border-b outline-0 px-1 text-textDarkBlue1"/>
            <select className="border-b text-textDarkBlue1 opacity-90">
                <option>Lokoja, Kogi</option>
                <option>Ikoyi, Lagos</option>
                <option>Maitama, Abuja</option>
            </select>
            <Button text="Search for placement" onClick={() => {}}/>
        </form>
    )
}

export default SearchBar;