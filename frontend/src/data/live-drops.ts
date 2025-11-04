export type LiveDrop = {
  id: string;
  amount: number;
  currency: string;
  user: {
    name: string;
    avatar: string;
  };
};

export const initialLiveDrops: LiveDrop[] = [
  {
    id: "ld_1",
    amount: 556,
    currency: "$",
    user: { name: "dave1", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_2",
    amount: 556,
    currency: "$",
    user: { name: "dave2", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_3",
    amount: 556,
    currency: "$",
    user: { name: "dave3", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_4",
    amount: 556,
    currency: "$",
    user: { name: "dave4", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_5",
    amount: 556,
    currency: "$",
    user: { name: "dave5", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_6",
    amount: 556,
    currency: "$",
    user: { name: "dave6", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_7",
    amount: 556,
    currency: "$",
    user: { name: "dave7", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_8",
    amount: 556,
    currency: "$",
    user: { name: "dave8", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_9",
    amount: 556,
    currency: "$",
    user: { name: "dave9", avatar: "/icons/users/test-user-avatar.png" },
  },
  {
    id: "ld_10",
    amount: 556,
    currency: "$",
    user: { name: "dave10", avatar: "/icons/users/test-user-avatar.png" },
  },
];

export function makeMockDrop(i: number): LiveDrop {
  const n = (i % 8) + 1;
  return {
    id: `mock_${Date.now()}_${i}`,
    amount: 556,
    currency: "$",
    user: { name: "dave9304", avatar: `/icons/users/test-user-avatar.png` },
  };
}
