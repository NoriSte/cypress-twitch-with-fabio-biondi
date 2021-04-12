import * as React from "react";
import { useCallback, useMemo } from "react";

import { getUpdatedSelection } from "./core/getUpdatedSelection";
import { RenderItemWrapper } from "./RenderItemWrapper";

export const ItemsRenderer = (props) => {
  const {
    onSelect,
    RenderItem,
    visibleItems,
    selectedItemIds,
    itemsWithPosition,
  } = props;

  // The component updates the selection and the modifiers, but give its consumer all the necessary
  // data to manage the selection itself
  const handleClick = useCallback(
    (params) => {
      const { item, event: modifiers } = params;

      onSelect({
        item,
        modifiers,
        newSelectedIds: getUpdatedSelection({
          items: itemsWithPosition,
          oldSelectedIds: selectedItemIds,
          clickedItemId: item.id,
          modifiers,
        }),
      });
    },
    [itemsWithPosition, onSelect, selectedItemIds]
  );

  const children = useMemo(
    () =>
      visibleItems.map(({ item, y }) => (
        <RenderItemWrapper key={item.id} style={{ top: y }}>
          <RenderItem
            item={item}
            selected={selectedItemIds.includes(item.id)}
            onClick={handleClick}
          />
        </RenderItemWrapper>
      )),
    [visibleItems, selectedItemIds, handleClick]
  );

  return <>{children}</>;
};

ItemsRenderer.displayName = "ItemsRenderer";
