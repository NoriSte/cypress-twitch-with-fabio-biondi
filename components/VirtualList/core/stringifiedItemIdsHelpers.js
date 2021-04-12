export const idSeparator = "/@@/";

export const getStringifiedItemIds = (items) =>
  placeSeparatorAtEnds(
    items.map((item) => item.item.id.toString()).join(idSeparator)
  );

export const placeSeparatorAtEnds = (stringifiedIds) =>
  `${
    stringifiedIds.startsWith(idSeparator) ? "" : idSeparator
  }${stringifiedIds}${
    stringifiedIds.endsWith(idSeparator) ? "" : idSeparator
  }`.trim();

export const getIdsFromStringifiedIds = (stringifiedIds) =>
  stringifiedIds.split(idSeparator).filter((id) => id !== "");

export const removeSeparators = (id) =>
  id.replace(new RegExp(idSeparator, "g"), "");
