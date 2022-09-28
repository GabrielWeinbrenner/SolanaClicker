
export const BUILDINGS = {
  home_kitchen: {
    name: "Home Kitchen",
    icon: "🏚️",
    cost: [{ id: "dishes-served", amount: 10 }],
    onTick: [{ id: "dishes-served", op: "addDish", amount: 0.1 }]
  },
};
