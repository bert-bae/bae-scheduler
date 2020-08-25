import React, { useState, useEffect, useRef } from "react";
import shortId from "shortid";
import {
  sortOptionByPosition,
  getValueArray,
  getDropdownVisibilityHeight,
  findAndRemoveOption,
  handleNonMatchingElementByIdentifier,
  ISelectOption,
} from "../utils/select-option-utils";
import "./bae-multi-select.scss";

const BaeMultiSelect = (props: {
  label?: string;
  showDropdownRows?: number;
  options: string[];
  onOptionChange: Function;
  placeholderValue?: string;
}) => {
  const elementIdentifier = useRef(shortId());
  const [focus, setFocus] = useState(false);
  const [selectValues, setSelectValues] = useState<ISelectOption[]>([]);
  const [options, setOptions] = useState<ISelectOption[]>(
    props.options.map((value, i) => {
      return { value, position: i };
    })
  );
  const dropdownVisiblityHeight = getDropdownVisibilityHeight(
    props.showDropdownRows
  );

  const onOptionDelete = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setOptions((prev) => sortOptionByPosition([...prev, { value, position }]));
    setSelectValues((prev: ISelectOption[]) =>
      findAndRemoveOption(prev, value)
    );
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

  useEffect(() => {
    document.addEventListener("click", (e) =>
      handleNonMatchingElementByIdentifier(e, elementIdentifier.current, () =>
        setFocus(false)
      )
    );
    return () => {
      document.removeEventListener("click", (e) =>
        handleNonMatchingElementByIdentifier(e, elementIdentifier.current, () =>
          setFocus(false)
        )
      );
    };
  }, []);

  const createSelected = selectValues.map((option) => {
    return (
      <a
        className="selected"
        onClick={onOptionDelete}
        data-value={option.value}
        data-position={option.position}
        data-identifier={elementIdentifier.current}
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
        data-identifier={elementIdentifier.current}
        key={option.position}
      >
        {option.value}
      </div>
    );
  });

  return (
    <div
      className="bae-select-container multiselect"
      data-focus={focus}
      data-identifier={elementIdentifier.current}
      onClick={() => setFocus((prev) => !prev)}
    >
      <select multiple />
      {selectValues.length > 0 && (
        <div
          className="selected-options"
          data-identifier={elementIdentifier.current}
        >
          {createSelected}
        </div>
      )}

      {props.placeholderValue && selectValues.length === 0 && (
        <p
          className="disabled option"
          data-identifier={elementIdentifier.current}
        >
          {props.placeholderValue}
        </p>
      )}

      {props.label && <span className="bae-label">{props.label}</span>}
      {options.length > 0 && (
        <div
          className="dropdown-selections"
          data-focus={focus}
          data-identifier={elementIdentifier.current}
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
