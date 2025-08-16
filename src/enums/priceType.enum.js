// roles.enum.js
export const PriceType = Object.freeze({
  PER_HOUR: 0,
  PER_DAY: 1,
});

export const RoleLabels = Object.freeze({
  [PriceType.PER_DAY]: "Per Day",
  [PriceType.PER_HOUR]: "Per Hour",
});
