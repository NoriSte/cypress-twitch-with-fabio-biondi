import * as React from "react";
import ReactScrollbar from "react-smooth-scrollbar";
import { useCallback, useMemo, useRef, useState } from "react";

import usePreviousValue from "../hooks/usePreviousValue";
import useDidUpdate from "../hooks/useDidUpdate";

import { getItemsHeights } from "./core/getItemsHeights";
import { getItemsInterestedByScroll } from "./core/getItemsInterestedByScroll";
import { getItemsTotalHeight } from "./core/getItemsTotalHeight";
import { getItemsWithPosition } from "./core/getItemsWithPosition";
import { getNewScrollValue } from "./core/getNewScrollValue";
import { getStringifiedItemIds } from "./core/stringifiedItemIdsHelpers";
import { ItemsRenderer } from "./ItemsRenderer";

const noop = () => {};

export const VirtualList = (props) => {
  const {
    items,
    getItemHeights,
    RenderItem,
    listHeight,
    buffer = 0,
    updateScrollModeOnDataChange = "none",
    selectedItemIds = [],
    onSelect,
  } = props;

  const smoothScrollbarRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  // To avoid unnecessary calculations in case of a high number of items, an array of items with
  // their position is stored and used from now on
  const [itemsWithPosition, itemsTotalHeight] = useMemo(() => {
    const calculatedItemsHeights = getItemsHeights({ items, getItemHeights });
    return [
      getItemsWithPosition({
        items,
        itemsHeights: calculatedItemsHeights,
      }),
      getItemsTotalHeight({
        itemsHeights: calculatedItemsHeights,
      }),
    ];
  }, [items, getItemHeights]);

  // The items to be rendered (both the visible ones and the buffered ones) are stored
  const visibleItems = useMemo(
    () =>
      getItemsInterestedByScroll({
        itemsWithPosition,
        scrollY,
        listHeight,
        itemsTotalHeight,
        buffer,
      }),

    [itemsWithPosition, listHeight, itemsTotalHeight, buffer, scrollY]
  );

  // When the items update, the list tries to update the scroll position to maintain the old visible
  // items in the same position. To avoid to refer the old items array (which could be huge) a
  // string representation is used
  const oldStringifiedIds = usePreviousValue(
    getStringifiedItemIds(itemsWithPosition)
  );
  const oldVisibleItems = usePreviousValue(visibleItems);
  useDidUpdate(() => {
    if (oldVisibleItems && oldStringifiedIds) {
      smoothScrollbarRef.current?.scrollTo(
        0,
        getNewScrollValue({
          newItems: itemsWithPosition,
          actualScroll: scrollY,
          scrollHeight: listHeight,
          oldStringifiedIds,
          oldVisibleItems,
          updateScrollModeOnDataChange,
        })
      );
    }
  }, [items]);

  // Children and refs
  const handleOnScroll = useCallback(({ offset: { y } }) => setScrollY(y), []);
  const setRef = useCallback(
    (params) => (smoothScrollbarRef.current = params?.scrollbar ?? undefined),
    []
  );

  return (
    <ReactScrollbar
      style={{ height: listHeight, width: "100%" }}
      onScroll={handleOnScroll}
      ref={setRef}
      alwaysShowTracks={true}
      data-testid="VirtualList"
    >
      <div
        style={{
          height: itemsTotalHeight,
        }}
      >
        <ItemsRenderer
          selectedItemIds={selectedItemIds}
          onSelect={onSelect || noop}
          visibleItems={visibleItems}
          itemsWithPosition={itemsWithPosition}
          RenderItem={RenderItem}
        />
      </div>
    </ReactScrollbar>
  );
};

VirtualList.displayName = "VirtualList";
