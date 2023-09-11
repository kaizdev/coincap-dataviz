import { useState } from "react";
import { getDailyPriceBySearch } from "../../services/coin-services";

interface SearchBarProps {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchInput,
    setSearchInput,
}) => {
    const [localInput, setLocalInput] = useState("");

    const handleChange = (e: any) => {
        setLocalInput(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSearchInput(localInput);
        try {
            const data = await getDailyPriceBySearch(searchInput);
            console.log("Fetched data: ", data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
        setLocalInput("");
    };

    return (
        <>
            <div style={{ textAlign: "center", marginTop: "2em" }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="search for coin"
                        value={localInput}
                        onChange={handleChange}
                    />
                    <button>Search</button>
                </form>
            </div>
        </>
    );
};
export default SearchBar;
