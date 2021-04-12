export const getItemsWithPosition = (params) => {
  const { items, itemsHeights } = params;
  const itemsWithPosition = [];

  let scrollY = 0;
  for (let i = 0, n = items.length; i < n; i++) {
    const itemWithPosition = {
      item: items[i],
      y: scrollY,
      height: itemsHeights[i],
    };
    itemsWithPosition.push(itemWithPosition);

    scrollY += itemWithPosition.height;
  }

  return itemsWithPosition;
};
