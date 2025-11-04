"use client";

import WelcomeBanner from "./WelcomeBanner";
import PromoBanner from "./PromoBanner";
import GameCarousel from "./GameCarousel";
import Leaderboard from "./Leaderboard";
import { games, leaderboard, welcomeBanner, promoBanner } from "@/data/home";
import LiveDrops from "./LiveDrops";

export default function HomePage() {
  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto">
      <div className="py-5 space-y-5">
        <WelcomeBanner src={welcomeBanner.image} alt={welcomeBanner.alt} />
        {/* <PromoBanner src={promoBanner.image} alt={promoBanner.alt} /> */}
        <LiveDrops />
        <GameCarousel items={games} />
        <Leaderboard />
      </div>
    </div>
  );
}
