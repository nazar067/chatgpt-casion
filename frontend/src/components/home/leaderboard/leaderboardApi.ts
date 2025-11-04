import { LeaderRowDTO, LeaderRowEx, TabKey } from "./types";

const USE_MOCK = true;

export function mapDtoToRow(d: LeaderRowDTO): LeaderRowEx {
  const fmtMoney = (cents: number) =>
    `$${(Math.round(cents) / 100).toFixed(2)}`;

  return {
    game: d.game,
    user: d.user,
    timeAgo: d.time_ago,
    betAmount: fmtMoney(d.bet_amount_cents),
    multiplier: `${d.multiplier_x}x`,
    payout: fmtMoney(d.payout_cents),
    gameIcon: d.game_icon,
    userAvatar: d.user_avatar,
  };
}

function mockRows(limit: number): LeaderRowEx[] {
  const games = [
    { name: "Mines", icon: "/icons/other/bomb.png" },
    { name: "Gates of Olympus", icon: "/icons/casino/chip.png" },
  ];
  return Array.from({ length: limit }).map((_, i) => {
    const g = games[i % games.length];
    return {
      game: g.name,
      user: i % 2 ? "amaz0nka" : "player_920",
      timeAgo: i % 2 ? "24 sec ago" : "12 sec ago",
      betAmount: i % 2 ? "89" : "$556.00",
      multiplier: i % 2 ? "2.2x" : "22.7x",
      payout: i % 2 ? "$0.00" : "$556.00",
      gameIcon: g.icon,
      userAvatar: i % 2 ? "/icons/users/test-user-avatar.png" : "/icons/users/test-user-avatar.png", 
    };
  });
}

export async function fetchLeaderboard(
  tab: TabKey,
  limit: number,
  signal?: AbortSignal
): Promise<LeaderRowEx[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));
    return mockRows(limit);
  }

  const res = await fetch(`/api/leaderboard?tab=${tab}&limit=${limit}`, {
    method: "GET",
    signal,
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json: LeaderRowDTO[] = await res.json();
  return json.map(mapDtoToRow);
}
