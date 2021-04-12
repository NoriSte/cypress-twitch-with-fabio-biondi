export type ItemId = string | number

export type Item = {
  id: ItemId
}

export type ItemWithPosition<T extends Item> = {
  item: T
  y: number
  height: number
}

export type OnClickHandlerParams<T extends Item> = {
  item: T
  event: ModifierKeys
}

export type RenderItemProps<T extends Item> = {
  item: T
  selected: boolean
  onClick: (params: OnClickHandlerParams<T>) => void
}

export type ModifierKeys = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type OnSelectCallbackParams<T extends Item> = {
  item: T
  modifiers: ModifierKeys
  newSelectedIds: ItemId[]
}

export type OnSelectCallback<T extends Item> = (params: OnSelectCallbackParams<T>) => void

export type Props<T extends Item> = {
  /**
   * The items list to be rendered, the VirtualList will render a `RenderItem` component for every item of this list.
   */
  items: T[]
  /**
   * The component that received every single item and renders it.
   */
  RenderItem: React.ComponentType<RenderItemProps<T>>
  /**
   * A function that must return the height of every item.
   */
  getItemHeights: ItemsHeightsGetter<T>
  /**
   * The height of the container list.
   */
  listHeight: number
  /**
   * The amount of items to be rendered before and after the visible ones. It prevents the user from seeing an empty area in case of fast scrolling or poor render performance.
   */
  buffer?: number
  /**
   * How the list behaves when the items change. It can try to keep the actual visible items when the ends of the items update.
   * @default 'none'
   * @see #MaintainScrollOption
   */
  updateScrollModeOnDataChange?: MaintainScrollOption
  /**
   * The ids of the selected items
   */
  selectedItemIds?: ItemId[] | never
  /**
   * The callback invoked at every selection update. It will receive the selection resulted from the item click (upporting keyboard modifiers) applied to the `selectedItems` arraylogger.log(
   * The external consumer can manually manage the selection because the callback receives the clicked item and the modifiers too.
   */
  onSelect?: OnSelectCallback<T>
}

export type ItemsHeightsGetter<T extends Item> = (item: T, index: number, items: T[]) => number

export type ItemScrollData<T extends Item> = ItemWithPosition<T>

export type MaintainScrollOption = 'none' | EndsUpdateOptions
export type EndsUpdateOptions = {
  addedAtTop?: boolean
  removedFromTop?: boolean
  addedAtBottom?: boolean
  removedFromBottom?: boolean
}
