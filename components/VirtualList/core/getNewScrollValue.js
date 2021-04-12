import { maintainScrollOnEndsUpdate } from "./maintainScrollOnEndsUpdate";

export const getNewScrollValue = (params) => {
  const { updateScrollModeOnDataChange } = params;

  if (
    updateScrollModeOnDataChange === "none" ||
    (!updateScrollModeOnDataChange.addedAtTop &&
      !updateScrollModeOnDataChange.removedFromTop &&
      !updateScrollModeOnDataChange.addedAtBottom &&
      !updateScrollModeOnDataChange.removedFromBottom)
  ) {
    return 0;
  }

  const result = maintainScrollOnEndsUpdate({
    ...params,
    endsUpdateOptions: updateScrollModeOnDataChange,
  });
  if (!result.success) {
    return 0;
  }

  const { itemToMaintainVisible } = result;
  const itemToMaintainVisibleUpdated = params.newItems.find(
    ({ item }) => item.id === itemToMaintainVisible.item.id
  );
  if (!itemToMaintainVisibleUpdated) {
    return 0;
  }

  const { actualScroll } = params;
  const topOffset = actualScroll - itemToMaintainVisible.y;
  return itemToMaintainVisibleUpdated.y + topOffset;
};
