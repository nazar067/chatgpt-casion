// /data/home.ts
export type GameItem = {
  id: string;
  title: string;
  image: string;
};

export type LeaderRow = {
  game: string;
  user: string;
  timeAgo: string;
  betAmount: string;
  multiplier: string;
  payout: string;
};

export const welcomeBanner = {
  image: "/main-page/banners/welcome.png",
  alt: "Welcome Offer",
};

export const promoBanner = {
  image: "/main-page/banners/casino.png",
  alt: "Casino Promo",
};

export const games: GameItem[] = [
  { id: "g1", title: "mines", image: "/originals/mines.png" },
  { id: "g2", title: "blackjack", image: "/originals/blackjack.png" },
  { id: "g3", title: "keno", image: "/originals/keno.png" },
  { id: "g4", title: "dice", image: "/originals/dice.png" },
  { id: "g5", title: "battle", image: "/originals/battle.png" },
  { id: "g6", title: "crossy-road", image: "/originals/crossy-road.png" },
  { id: "g7", title: "avia-master", image: "/originals/avia-master.png" },
  { id: "g8", title: "ride-the-bus", image: "/originals/ride-the-bus.png" },
];

export const leaderboard: LeaderRow[] = [
  { game: "Gates of Olympus", user: "player_920", timeAgo: "12 sec ago", betAmount: "$556.00", multiplier: "22.7x", payout: "$556.00" },
  { game: "Mines",            user: "amazonka",   timeAgo: "24 sec ago", betAmount: "89",       multiplier: "2.2x",  payout: "$0.00"   },
  { game: "Gates of Olympus", user: "player_920", timeAgo: "12 sec ago", betAmount: "$556.00", multiplier: "22.7x", payout: "$556.00" },
  { game: "Mines",            user: "amazonka",   timeAgo: "24 sec ago", betAmount: "89",       multiplier: "2.2x",  payout: "$0.00"   },
  { game: "Gates of Olympus", user: "player_920", timeAgo: "12 sec ago", betAmount: "$556.00", multiplier: "22.7x", payout: "$556.00" },
  { game: "Mines",            user: "amazonka",   timeAgo: "24 sec ago", betAmount: "89",       multiplier: "2.2x",  payout: "$0.00"   },
  { game: "Gates of Olympus", user: "player_920", timeAgo: "12 sec ago", betAmount: "$556.00", multiplier: "22.7x", payout: "$556.00" },
  { game: "Gates of Olympus", user: "amazonka",   timeAgo: "24 sec ago", betAmount: "89",       multiplier: "2.2x",  payout: "$0.00"   },
];
