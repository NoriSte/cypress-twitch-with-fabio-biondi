export const getItemsTotalHeight = ({ itemsHeights }) =>
  itemsHeights.reduce((totalHeight, height) => totalHeight + height, 0);
