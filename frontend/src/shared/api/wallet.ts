type StartCryptoDepositReq = {
  userId: string;
  currency: "BTC" | "ETH" | "USDT";
  network: "BITCOIN" | "ERC20" | "TRC20";
  address: string;
  amount?: number;
};

export type DepositStatus = "pending" | "ok" | "fail";

type Listener = (s: DepositStatus) => void;

const listeners = new Map<string, Set<Listener>>();

export async function startCryptoDeposit(req: StartCryptoDepositReq): Promise<{ txId: string }> {
  const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  setTimeout(() => {
    const status: DepositStatus = Math.random() < 0.5 ? "ok" : "fail";
    emitStatus(txId, status);
  }, 3000);

  return { txId };
}

export function subscribeDepositStatus(
  txId: string,
  cb: Listener
): () => void {
  if (!listeners.has(txId)) listeners.set(txId, new Set());
  listeners.get(txId)!.add(cb);
  return () => {
    listeners.get(txId)?.delete(cb);
  };
}

export function emitStatus(txId: string, status: DepositStatus) {
  const set = listeners.get(txId);
  if (!set) return;
  set.forEach((fn) => fn(status));
}
