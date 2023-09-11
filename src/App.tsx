import { useState } from "react";
import BitcoinPrices from "./components/BitcoinPrices/BitcoinPrices";
import SearchBar from "./components/SearchBar/SearchBar";
import CoinPrices from "./components/CoinPrices/CoinPrices";

function App() {
    const [searchInput, setSearchInput] = useState("");

    return (
        <>
            <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />
            <CoinPrices searchString={searchInput} />
        </>
    );
}

export default App;
