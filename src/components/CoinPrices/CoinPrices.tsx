import { useEffect, useState } from "react";
import { CoinDataItem } from "../BitcoinPrices/BitcoinPrices";
import { getDailyPriceBySearch } from "../../services/coin-services";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CoinPrices = ({ searchString }) => {
    const [coinData, setCoinData] = useState<CoinDataItem[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDailyPriceBySearch(searchString);
            setCoinData(response);
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
            <h1>{searchString} daily prices 1Y</h1>
            <div style={{ width: "800px", height: "600px" }}>
                <Line data={data} options={options} />
            </div>
        </>
    );
};
export default CoinPrices;
