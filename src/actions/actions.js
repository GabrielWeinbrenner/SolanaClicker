export const actions = {
  PROCESS_EFFECT: "processEffect",
  UNLOCK_OBJECT: "unlockObjecy",
  PURCHASE_OBJECT: "purchaseObject",
}

export const purchaseObject = (id) => ({
  type: actions.PURCHASE_OBJECT,
  id,
})
export const processEffect = (effect, delta = 1) => {
    console.log(effect)
    console.log(delta)
    return {
        type: actions.PROCESS_EFFECT,
        ...effect,
        delta,
    }
}
export const unlockObject = (id) => ({
  type: actions.UNLOCK_OBJECT,
  id,
})
