export type ChatMessage = {
  id: string;
  user: { id: string; name: string; avatarUrl?: string };
  text: string;
  ts: number;
  side: "incoming" | "outgoing";
  isAdmin?: boolean;
  time?: string;
  msgAnswerId?: string;
};
