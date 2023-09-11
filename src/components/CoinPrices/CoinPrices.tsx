import { useEffect, useState } from "react";
import { CoinDataItem } from "../BitcoinPrices/BitcoinPrices";
import {
    getDailyPriceBySearch,
    getSummaryStats,
} from "../../services/coin-services";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export interface CoinProperties {
    rank: number;
    symbol: string;
    maxSupply: number;
    marketCapUsd: number;
    priceUsd: number;
}

interface CoinPricesProps {
    searchString: string;
}

const CoinPrices: React.FC<CoinPricesProps> = ({ searchString }) => {
    const [coinData, setCoinData] = useState<CoinDataItem[] | null>(null);
    const [coinSummary, setCoinSummary] = useState<CoinProperties | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            // Retrieve daily prices by Coin
            const response = await getDailyPriceBySearch(searchString);
            setCoinData(response);
            // Retrieve summary stats by Coin
            const coinResponse = await getSummaryStats(searchString);
            setCoinSummary(coinResponse);
        };
        fetchData();
    }, [searchString]);

    console.log(coinData);

    if (!Array.isArray(coinData)) {
        return <div>Loading...</div>;
    }

    const labels = coinData.map((item) =>
        new Date(item.time).toLocaleDateString()
    );
    const dataPoints = coinData.map((item) => item.priceUsd);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Coin Price USD",
                data: dataPoints,
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    return (
        <>
            <h1
                style={{
                    textAlign: "center",
                    color: "rgb(75, 192, 192)",
                    fontSize: "48px",
                }}
            >
                {searchString} daily prices 1Y
            </h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <h3>Coin Summary</h3>
                    <p>Symbol: {coinSummary?.symbol}</p>
                    <p>Rank: {coinSummary?.rank}</p>
                    <p>Market Cap (USD) {coinSummary?.marketCapUsd}</p>
                    <p>Max supply: {coinSummary?.maxSupply}</p>
                </div>

                <div style={{ width: "800px", height: "600px" }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
};
export default CoinPrices;
