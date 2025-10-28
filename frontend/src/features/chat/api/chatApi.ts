import { ChatMessage } from "../types";

let messages: ChatMessage[] = [
  {
    id: "m1",
    user: { id: "42", name: "javelin567", avatarUrl: "/icons/users/users.png" },
    text: "hey, what's up",
    ts: Date.now() - 1000 * 60 * 3,
    side: "incoming",
  },
  {
    id: "m2",
    user: { id: "me", name: "You" },
    text: "All good! Just testing the new chat.",
    ts: Date.now() - 1000 * 60 * 2,
    side: "outgoing",
  },
  {
    id: "m3",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m4",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m5",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m6",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m8",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m9",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m10",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m11",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m12",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m13",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m14",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m15",
    user: { id: "11", name: "amazonka" },
    text: "pls keep calm.",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
  },
    {
    id: "m16",
    user: { id: "11", name: "amazonka" },
    text: "test message overflow test message overflow test message overflow test message overflow ",
    ts: Date.now() - 1000 * 60 * 1,
    side: "incoming",
    isAdmin: true,
    time: "12:45",
    msgAnswerId: "m1",
  },
];

type Unsub = () => void;

const listeners = new Set<(m: ChatMessage[]) => void>();
function emit() {
  for (const l of listeners) l([...messages]);
}

export function subscribeMessages(cb: (m: ChatMessage[]) => void): Unsub {
  listeners.add(cb);
  cb([...messages]);
  return () => listeners.delete(cb);
}

export async function sendMessage(text: string, userId = "me", userName = "You", opts?: { replyToId?: string }) {
  const msg: ChatMessage = {
    id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    user: { id: userId, name: userName },
    text,
    ts: Date.now(),
    side: "outgoing",
    msgAnswerId: opts?.replyToId,
  };
  messages = [...messages, msg];
  emit();

  setTimeout(() => {
    messages = [
      ...messages,
      {
        id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
        user: { id: "bot", name: "Support" },
        text: "Got your message ✅",
        ts: Date.now(),
        side: "incoming",
      },
    ];
    emit();
  }, 800);
}

export async function loadMore(beforeTs: number): Promise<ChatMessage[]> {
  const older: ChatMessage[] = Array.from({ length: 5 }).map((_, i) => ({
    id: `old_${beforeTs}_${i}`,
    user: { id: "ghost", name: "player_920" },
    text: `older message #${i + 1}`,
    ts: beforeTs - (i + 1) * 60000,
    side: i % 2 ? "incoming" : "outgoing",
  }));
  messages = [...older, ...messages];
  emit();
  return older;
}
