export type CryptoKey = "BTC" | "ETH" | "USDT";

const ID_MAP: Record<CryptoKey, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
};

type PriceResp = Record<string, { usd: number }>;

export async function getUsdPerCoinMap(): Promise<Record<CryptoKey, number>> {
  const ids = Object.values(ID_MAP).join(",");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to load rates");
  const data = (await res.json()) as PriceResp;

  return {
    BTC: data[ID_MAP.BTC].usd,
    ETH: data[ID_MAP.ETH].usd,
    USDT: data[ID_MAP.USDT].usd,
  };
}

export async function getCryptoPerUsd(symbol: CryptoKey): Promise<number> {
  const map = await getUsdPerCoinMap();
  const usdPerCoin = map[symbol];
  return 1 / usdPerCoin; 
}
