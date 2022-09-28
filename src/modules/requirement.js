
export const checkRequirements = (store, requirements) => {
  for (const requirement of requirements) {
    if (!checkRequirement(store, requirement)) return false;
  }
  return true;
};

export const checkRequirement = (store, req) => {
  // if the requirement is an array, evaluate
  // all the requirements in it with an OR boolean operation
  if (Array.isArray(req)) {
    let result = false;
    req.forEach(r => (result = result || checkRequirement(store, r)));
    return result;
  } else if (typeof req === "object" && req != null) {
    if (req.id in store.resources) {
      const target = store.resources[req.id];
      switch (req.case) {
        case "amount":
          return target.amount >= req.amount;
        case "total":
          return target.total >= req.amount;
        case "have":
          return target.amount > 0;
        case "rate":
          return target.amount - target._prevTickAmount >= req.amount;
        default:
          return false;
      }
    }
    if (req.id in store.buildings) {
      const target = store.buildings[req.id];
      switch (req.case) {
        case "amount":
          return target.amount >= req.amount;
        case "total":
          return target.total >= req.amount;
        case "have":
          return target.amount > 0;
        default:
          return false;
      }
    }
    if (req.id in store.clickers) {
      const id = store.clickers[req.id];
      return id[req.target] >= req.amount;
    }
    if (req.id in store.upgrades) {
      const target = store.upgrades[req.id];
      switch (req.case) {
        case "have":
          return target === true;
        default:
          return false;
      }
    }
    if (req.case === "chance") {
      const chance = Math.random();
      return chance <= parseFloat(req.amount) / 100;
    }
  }
  return false;
};
