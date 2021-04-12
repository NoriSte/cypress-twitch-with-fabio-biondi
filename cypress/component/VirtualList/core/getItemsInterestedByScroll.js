import { getScrollIntersectionType } from "./getScrollIntersectionType";

export const getItemsInterestedByScroll = (params) => {
  const { itemsWithPosition, buffer, listHeight, itemsTotalHeight } = params;
  let { scrollY } = params;

  const minScroll = 0;
  const maxScroll =
    listHeight > itemsTotalHeight ? 0 : itemsTotalHeight - listHeight;
  scrollY =
    scrollY < minScroll ? minScroll : scrollY > maxScroll ? maxScroll : scrollY;

  const precedingItems = [];
  const visibleItems = [];
  const followingItems = [];

  itemsLoop: for (const item of itemsWithPosition) {
    const scrollIntersectionType = getScrollIntersectionType({
      y: item.y,
      height: item.height,
      scrollY,
      scrollHeight: listHeight,
    });

    switch (scrollIntersectionType) {
      case "hidden-at-top":
        precedingItems.push(item);
        if (precedingItems.length > buffer) {
          precedingItems.shift();
        }
        break;

      case "fully-visible":
      case "partially-visible":
      case "partially-visible-at-top":
      case "partially-visible-at-bottom":
        visibleItems.push(item);
        break;

      case "hidden-at-bottom":
        if (followingItems.length >= buffer) {
          break itemsLoop;
        }
        followingItems.push(item);
        break;
    }
  }

  return [...precedingItems, ...visibleItems, ...followingItems];
};
