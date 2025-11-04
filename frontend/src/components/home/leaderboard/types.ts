export type TabKey = "wins" | "lucky" | "bets";

/** Как бэк может отдавать данные (пример) */
export type LeaderRowDTO = {
  game: string;
  user: string;
  time_ago: string;
  bet_amount_cents: number; // или число/строка — подправь под свой бэк
  multiplier_x: number;
  payout_cents: number;
  game_icon?: string;
  user_avatar?: string;
};

export type LeaderRowEx = {
  game: string;
  user: string;
  timeAgo: string;
  betAmount: string;
  multiplier: string;
  payout: string;
  gameIcon?: string;
  userAvatar?: string;
};
