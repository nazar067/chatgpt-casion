import BaseTable from "./BaseTable";
import { LeaderRowEx } from "./types";

export default function LuckyDropsTable({
  rows,
  pageSize,
}: {
  rows: LeaderRowEx[];
  pageSize: number;
}) {
  return <BaseTable rows={rows} pageSize={pageSize} />;
}
