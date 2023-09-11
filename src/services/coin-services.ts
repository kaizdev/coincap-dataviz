export const getDailyPriceData = async () => {
    const response = await fetch(
        "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    const data = await response.json();
    return data;
};

export const getDailyPriceBySearch = async (searchString: string) => {
    const response = await fetch(
        `https://api.coincap.io/v2/assets/${searchString}/history?interval=d1`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch price data");
    }
    const data = await response.json();
    if (data.data.length === 0) {
        throw new Error("No price data found for " + searchString);
    }
    return data.data;
};

export const getSummaryStats = async (searchString: string) => {
    const response = await fetch(
        `https://api.coincap.io/v2/assets/${searchString}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch coin data");
    }

    const data = await response.json();
    if (data.data.length === 0) {
        throw new Error("No coin data found for " + searchString);
    }
    return data.data;
};
