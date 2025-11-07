import { cn } from "@/shared/lib/cn";
import SkeletonRow from "./SkeletonRow";
import { LeaderRowEx } from "./types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal"],
});

const montserratTableData = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

const COLS = "grid-cols-[1.4fr_1.2fr_1fr_1fr_1fr_1fr]";

export default function BaseTable({
  rows,
  pageSize,
  loading,
  error,
}: {
  rows?: LeaderRowEx[];
  pageSize: number;
  loading?: boolean;
  error?: string | null;
}) {
  const data = Array.isArray(rows) ? rows : [];
  const visible = data.slice(0, pageSize);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-white/80 bg-[#141A2E]">
        <thead className="text-left">
          <tr>
            <th colSpan={6} className="px-2">
              <div
                className={cn(montserrat.className,
                  "grid items-center px-4 py-3 text-white/60",
                  "tracking-wide text-[12px]",
                  COLS
                )}
              >
                <span>Game</span>
                <span>User</span>
                <span>Date</span>
                <span>Bet amount</span>
                <span>Multiplier</span>
                <span>Payout</span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {loading &&
            Array.from({ length: Math.max(5, Math.ceil(pageSize / 2)) }).map((_, i) => (
              <tr key={`sk-${i}`}>
                <td colSpan={6} className="px-2 py-1">
                  <SkeletonRow colsClass={COLS} />
                </td>
              </tr>
            ))}

          {!loading &&
            visible.map((r, idx) => (
              <tr key={idx} className="transition-all">
                <td colSpan={6} className="px-2 py-1">
                  <div
                    className={cn(montserratTableData.className,
                      "grid items-center px-4 py-3 text-sm text-white/80 transition-all",
                      COLS,
                      idx % 2 === 0 ? "bg-[#1E253C] rounded-lg" : ""
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {r.gameIcon && (
                        <img src={r.gameIcon} alt="" className="h-4 w-4 object-contain icon-active-tab" />
                      )}
                      <span className="text-white">{r.game}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {r.userAvatar && (
                        <img src={r.userAvatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                      )}
                      <span className="text-white">{r.user}</span>
                    </div>

                    <span className="whitespace-nowrap text-white/60">{r.timeAgo}</span>
                    <span className="text-white">
                      {(() => {
                        const val = r.betAmount ?? "";
                        const match = val.match(/([.,])(.*)/);
                        if (!match) return val;
                        const [sep, rest] = match;
                        const main = val.slice(0, val.indexOf(sep));
                        return (
                          <>
                            {main}
                            <span className="text-white/60">
                              {sep}
                              {rest}
                            </span>
                          </>
                        );
                      })()}
                    </span>
                    <span
                      className="inline-flex items-center justify-center rounded-md text-[#FFBB00] text-[13px] font-semibold"
                      style={{
                        width: "49px",
                        height: "25px",
                        backgroundColor: "#FFBB001A",
                      }}
                    >
                      {r.multiplier}
                    </span>
                    <span>
                      {(() => {
                        const val = (r.payout ?? "").toString().trim();
                        if (!val) return <span className="text-white/60">{val}</span>;
                        const num = parseFloat(val.replace(/[^0-9.,-]/g, "").replace(",", "."));
                        const isZero = isNaN(num) || num === 0;
                        const match = val.match(/([.,])(.*)/);
                        if (isZero) {
                          return <span className="text-white/60">{val}</span>;
                        }
                        if (!match) {
                          return <span className="text-[#85E531]">{val}</span>;
                        }

                        const [sep, rest] = match;
                        const main = val.slice(0, val.indexOf(sep));

                        return (
                          <>
                            <span className="text-[#85E531]">{main}</span>
                            <span className="text-white/60">
                              {sep}
                              {rest}
                            </span>
                          </>
                        );
                      })()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}

          {!loading && !error && visible.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-center text-white/50" colSpan={6}>
                No data
              </td>
            </tr>
          )}

          {error && !loading && (
            <tr>
              <td className="px-4 py-8 text-center text-red-400" colSpan={6}>
                {error}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
