export const getLimitValue = (value, options = {}) => {
  const { min, max } = options;

  let limitValue = value;

  if (min !== undefined) {
    limitValue = Math.max(limitValue, min);
  }

  if (max !== undefined) {
    limitValue = Math.min(limitValue, max);
  }

  return limitValue;
};
