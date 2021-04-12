export const getItemsHeights = ({ items, getItemHeights }) =>
  items.map((...params) => getItemHeights(...params));
