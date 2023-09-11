export interface CoinDataItem {
    time: number;
    priceUsd: string;
    date: string;
}

export interface CoinProperties {
    rank: number;
    symbol: string;
    maxSupply: number;
    marketCapUsd: number;
    priceUsd: number;
}

export interface CoinPricesProps {
    searchString: string;
}
