import React, { useState, useEffect, useRef } from "react";
import "./bae-select.scss";

interface ISelectOption {
  value: string;
  position: number;
}

const defaultVisibleRows = 5;
const heightPerRow = 31;

const sortOptionByPosition = (options: ISelectOption[]): ISelectOption[] => {
  return options.sort((a, b) => {
    if (a.position > b.position) {
      return 1;
    } else {
      return -1;
    }
  });
};

const getValueArray = (selectedValues: ISelectOption[]): string[] => {
  return selectedValues.map((x) => x.value);
};

const BaeSelect = (props: {
  label?: string;
  showDropdownRows?: number;
  options: string[];
  onOptionChange: Function;
  placeholderValue?: string;
}) => {
  const [focus, setFocus] = useState(false);
  const [selectValues, setSelectValues] = useState<ISelectOption[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>(
    props.options.map((value, i) => {
      return { value, position: i };
    })
  );
  const dropdownVisiblityHeight = props.showDropdownRows
    ? props.showDropdownRows * heightPerRow
    : defaultVisibleRows * heightPerRow;

  const onOptionDelete = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setOptions((prev) => sortOptionByPosition([...prev, { value, position }]));
    setSelectValues((prev) => {
      const copySet = [...prev];
      copySet.splice(
        copySet.findIndex((option) => option.value === value),
        1
      );
      return copySet;
    });
  };

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setSelectValues((prev) => [...prev, { value, position }]);
    setOptions((prev) => {
      const copySet = [...prev];
      copySet.splice(
        copySet.findIndex((option) => option.value === value),
        1
      );
      return copySet;
    });
  };

  useEffect(() => {
    props.onOptionChange(getValueArray(selectValues));
  }, [selectValues]);

  const createSelected = selectValues.map((option) => {
    return (
      <a
        className="selected"
        onClick={onOptionDelete}
        data-value={option.value}
        data-position={option.position}
        key={option.position}
      >
        {option.value} <span className="close-indicator">x</span>
      </a>
    );
  });

  const createOptions = options.map((option) => {
    return (
      <div
        className="option active"
        onClick={onOptionSelect}
        data-value={option.value}
        data-position={option.position}
        key={option.position}
      >
        {option.value}
      </div>
    );
  });

  return (
    <div
      className="bae-select-container"
      data-focus={focus}
      onClick={() => setFocus((prev) => !prev)}
    >
      <select multiple />
      {selectValues.length > 0 && (
        <div className="selected-options">{createSelected}</div>
      )}

      {props.placeholderValue && selectValues.length === 0 && (
        <p className="disabled option">{props.placeholderValue}</p>
      )}

      {props.label && <span className="bae-label">{props.label}</span>}
      {options.length > 0 && (
        <div
          className="dropdown-selections"
          data-focus={focus}
          style={{
            maxHeight: `${dropdownVisiblityHeight}px`,
          }}
        >
          {createOptions}
        </div>
      )}
    </div>
  );
};

export default BaeSelect;
