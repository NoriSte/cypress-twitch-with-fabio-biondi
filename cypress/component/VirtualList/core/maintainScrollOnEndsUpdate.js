import {
  getStringifiedItemIds,
  placeSeparatorAtEnds,
  getIdsFromStringifiedIds,
} from "./stringifiedItemIdsHelpers";
import {
  getVisibleAtTopItemsOnly,
  getFirstVisibleAtTopItem,
} from "./visibleItemsHelpers";

export const maintainScrollOnEndsUpdate = (params) => {
  const {
    newItems,
    actualScroll,
    scrollHeight,
    oldVisibleItems,
    oldStringifiedIds,
    endsUpdateOptions: {
      addedAtTop = false,
      removedFromTop = false,
      addedAtBottom = false,
      removedFromBottom = false,
    },
  } = params;

  // input check
  if (!oldStringifiedIds || !newItems.length) {
    return { success: false };
  }

  // if no possible cases are enabled, no calculations are needed
  if (!addedAtTop && !removedFromTop && !addedAtBottom && !removedFromBottom) {
    return { success: false };
  }

  // if the changes are only at the ends, a common item must exist. It will be used as the pivot to
  // break the list and analyze the "top" and the "bottom" of the list itself
  const oldItemIds = getIdsFromStringifiedIds(oldStringifiedIds);
  let firstCommonItemId;
  for (
    let i = 0, n = oldItemIds.length;
    i < n && firstCommonItemId === undefined;
    i++
  ) {
    const firstCommonItem = newItems.find(
      ({ item }) => item.id.toString() === oldItemIds[i]
    );
    if (firstCommonItem) {
      firstCommonItemId = firstCommonItem.item.id.toString();
    }
  }
  if (firstCommonItemId === undefined) {
    return {
      success: false,
    };
  }

  const newStringifiedIds = getStringifiedItemIds(newItems);

  let oldItemsBeforeCommonItemId = "";
  let newItemsBeforeCommonItemId = "";
  let oldsItemAfterCommonItemId = "";
  let newItemsAfterCommonItemId = "";

  const itemsHaveBeen = {
    removedFromTop: false,
    addedAtTop: false,
    removedFromBottom: false,
    addedAtBottom: false,
  };

  // If there are no changes the previously visible item should remain at the same position.
  // ATTENTION: the component heights could have been changed!
  if (!oldStringifiedIds || newStringifiedIds === oldStringifiedIds) {
    const firstCommonItem = getFirstVisibleAtTopItem({
      items: oldVisibleItems,
      scrollY: actualScroll,
      scrollHeight,
    });
    if (firstCommonItem) {
      return {
        success: true,
        itemToMaintainVisible: firstCommonItem,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  // The `itemsHaveBeen` boolean are set here
  firstCommonItemId = placeSeparatorAtEnds(firstCommonItemId);
  if (!oldStringifiedIds.startsWith(firstCommonItemId)) {
    oldItemsBeforeCommonItemId = placeSeparatorAtEnds(
      oldStringifiedIds.split(firstCommonItemId)[0]
    );
  }
  if (!oldStringifiedIds.endsWith(firstCommonItemId)) {
    oldsItemAfterCommonItemId = placeSeparatorAtEnds(
      oldStringifiedIds.split(firstCommonItemId)[1]
    );
  }
  if (!newStringifiedIds.startsWith(firstCommonItemId)) {
    newItemsBeforeCommonItemId = placeSeparatorAtEnds(
      newStringifiedIds.split(firstCommonItemId)[0]
    );
  }
  if (!newStringifiedIds.endsWith(firstCommonItemId)) {
    newItemsAfterCommonItemId = placeSeparatorAtEnds(
      newStringifiedIds.split(firstCommonItemId)[1]
    );
  }
  if (oldItemsBeforeCommonItemId !== newItemsBeforeCommonItemId) {
    itemsHaveBeen.removedFromTop = oldItemsBeforeCommonItemId.endsWith(
      newItemsBeforeCommonItemId
    );
    itemsHaveBeen.addedAtTop = newItemsBeforeCommonItemId.endsWith(
      oldItemsBeforeCommonItemId
    );
  }
  if (oldsItemAfterCommonItemId !== newItemsAfterCommonItemId) {
    itemsHaveBeen.addedAtBottom = newItemsAfterCommonItemId.startsWith(
      oldsItemAfterCommonItemId
    );
    itemsHaveBeen.removedFromBottom = oldsItemAfterCommonItemId.startsWith(
      newItemsAfterCommonItemId
    );
  }

  const success =
    (addedAtTop && itemsHaveBeen.addedAtTop) ||
    (removedFromTop && itemsHaveBeen.removedFromTop) ||
    (addedAtBottom && itemsHaveBeen.addedAtBottom) ||
    (removedFromBottom && itemsHaveBeen.removedFromBottom);

  if (success) {
    // ATTENTION: oldVisibleItems contains even the buffered items, oldUserVisibleItems is going to
    // only the visible by the user ones
    const oldUserVisibleItems = getVisibleAtTopItemsOnly({
      items: oldVisibleItems,
      scrollY: actualScroll,
      scrollHeight,
    });

    let firstUserVisibleItem;
    for (
      let i = 0, n = oldUserVisibleItems.length;
      i < n && !firstUserVisibleItem;
      i++
    ) {
      const item = oldUserVisibleItems[i];
      if (
        newStringifiedIds.includes(
          placeSeparatorAtEnds(item.item.id.toString())
        )
      ) {
        firstUserVisibleItem = item;
      }
    }

    let itemToMaintainVisible;
    // The first item visible by the user could have been removed. This happens when it was in the
    // top (or the bottom) part of the list and some items, including the first visible one, has been removed
    // from the top(or the bottom)
    if (!firstUserVisibleItem) {
      itemToMaintainVisible =
        itemsHaveBeen.removedFromTop && removedFromTop
          ? newItems[0]
          : itemsHaveBeen.removedFromBottom && removedFromBottom
          ? (itemToMaintainVisible = newItems[newItems.length - 1])
          : undefined;
    } else if (firstUserVisibleItem) {
      itemToMaintainVisible = firstUserVisibleItem;
    }

    if (itemToMaintainVisible) {
      return {
        success: true,
        itemToMaintainVisible,
      };
    }
  }

  return {
    success: false,
  };
};
