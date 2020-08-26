export interface ISelectOption {
  value: string;
  position: number;
}

const defaultVisibleRows = 5;
const heightPerRow = 31;

export const sortOptionByPosition = (
  options: ISelectOption[]
): ISelectOption[] => {
  return options.sort((a, b) => {
    if (a.position > b.position) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getValueArray = (selectedValues: ISelectOption[]): string[] => {
  return selectedValues.map((x) => x.value);
};

export const getDropdownVisibilityHeight = (rowsToShow: number | undefined) => {
  return rowsToShow
    ? rowsToShow * heightPerRow
    : defaultVisibleRows * heightPerRow;
};

export const findAndRemoveOption = (
  options: ISelectOption[],
  value: string
): ISelectOption[] => {
  const copySet = [...options];
  copySet.splice(
    copySet.findIndex((option) => option.value === value),
    1
  );
  return copySet;
};

export const handleNonMatchingElementByIdentifier = (
  e: MouseEvent,
  identifier: string,
  callback: Function
): void => {
  e.preventDefault();
  const node = e.target;
  if (
    node instanceof Element &&
    node.getAttribute("data-identifier") !== identifier
  ) {
    callback(false);
  }
};
