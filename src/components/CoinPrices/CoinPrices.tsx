import { useEffect, useState } from "react";
import {
    getDailyPriceBySearch,
    getHourlyPriceBySearch,
    getSummaryStats,
} from "../../services/coin-services";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
    CoinDataItem,
    CoinPricesProps,
    CoinProperties,
} from "../../types/coinTypes";
Chart.register(...registerables);

const CoinPrices: React.FC<CoinPricesProps> = ({ searchString }) => {
    const [coinData, setCoinData] = useState<CoinDataItem[] | null>(null);
    const [coinDataHourly, setCoinDataHourly] = useState<CoinDataItem[] | null>(
        null
    );
    const [coinSummary, setCoinSummary] = useState<CoinProperties | null>(null);
    const [timeFrame, setTimeFrame] = useState("Daily");

    useEffect(() => {
        const fetchData = async () => {
            // Retrieve daily prices by Coin
            const response = await getDailyPriceBySearch(searchString);
            setCoinData(response);

            // Retrieve hourly prices by Coin
            const responseHourly = await getHourlyPriceBySearch(searchString);
            setCoinDataHourly(responseHourly);
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

    const labels =
        timeFrame === "Daily"
            ? coinData.map((item) => new Date(item.time).toLocaleDateString())
            : coinDataHourly?.map((item) =>
                  new Date(item.time).toLocaleDateString()
              );
    const dataPoints =
        timeFrame === "Daily"
            ? coinData.map((item) => item.priceUsd)
            : coinDataHourly?.map((item) => item.priceUsd);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${timeFrame} prices`,
            },
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Coin Price USD",
                data: dataPoints,
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
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
                {searchString} summary and prices
            </h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                    <h3>Coin Summary</h3>
                    <p>Symbol: {coinSummary?.symbol}</p>
                    <p>Rank: {coinSummary?.rank}</p>
                    <p>
                        Market Cap (USD) $
                        {Number(coinSummary?.marketCapUsd).toFixed(0)}
                    </p>
                    <p>
                        Max supply: {Number(coinSummary?.maxSupply).toFixed(0)}
                    </p>
                </div>

                <div style={{ width: "800px", height: "600px" }}>
                    <Line data={data} options={options} />
                    <button onClick={() => setTimeFrame("Daily")}>
                        Daily Prices
                    </button>
                    <button onClick={() => setTimeFrame("Hourly")}>
                        Hourly Prices
                    </button>
                    <p>
                        Daily prices go back last calendar year, while hourly
                        prices go back to last month
                    </p>
                </div>
            </div>
        </>
    );
};
export default CoinPrices;
