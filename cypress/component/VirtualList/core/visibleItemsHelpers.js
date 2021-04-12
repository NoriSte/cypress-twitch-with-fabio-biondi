import { getScrollIntersectionType } from "./getScrollIntersectionType";
export const getFirstVisibleAtTopItem = (params) => {
  const { items, scrollY, scrollHeight } = params;

  return items.find((item) => {
    const scrollIntersectionType = getScrollIntersectionType({
      y: item.y,
      height: item.height,
      scrollY,
      scrollHeight,
    });

    return (
      scrollIntersectionType === "fully-visible" ||
      scrollIntersectionType === "partially-visible-at-top"
    );
  });
};

export const getVisibleAtTopItemsOnly = (params) => {
  const { items, scrollY, scrollHeight } = params;

  return items.filter((item) => {
    const scrollIntersectionType = getScrollIntersectionType({
      y: item.y,
      height: item.height,
      scrollY,
      scrollHeight,
    });

    return (
      scrollIntersectionType === "fully-visible" ||
      scrollIntersectionType === "partially-visible-at-top"
    );
  });
};
