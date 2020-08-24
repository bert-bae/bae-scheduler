import React, { useState, useEffect } from "react";
import { sortOptionByPosition, getValueArray, getDropdownVisibilityHeight, findAndRemoveOption, ISelectOption } from "../utils/select-option-utils"
import "./bae-multi-select.scss";

const BaeMultiSelect = (props: {
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
  const dropdownVisiblityHeight = getDropdownVisibilityHeight(props.showDropdownRows)

  const onOptionDelete = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setOptions((prev) => sortOptionByPosition([...prev, { value, position }]));
    setSelectValues((prev: ISelectOption[]) => findAndRemoveOption(prev, value));
  };

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setSelectValues((prev) => [...prev, { value, position }]);
    setOptions((prev: ISelectOption[]) => findAndRemoveOption(prev, value));
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

export default BaeMultiSelect;
