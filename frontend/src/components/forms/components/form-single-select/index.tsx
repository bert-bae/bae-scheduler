import React, { useState, useEffect, useRef } from "react";
import shortId from "shortid";
import {
  sortOptionByPosition,
  getDropdownVisibilityHeight,
  findAndRemoveOption,
  handleNonMatchingElementByIdentifier,
  ISelectOption,
} from "../utils/select-option-utils";
import "./bae-single-select.scss";

const defaultValue = { value: "", position: -1 };

const BaeSingleSelect = (props: {
  label?: string;
  showDropdownRows?: number;
  options: string[];
  onValueChange: Function;
  placeholderValue?: string;
}) => {
  const elementIdentifier = useRef(shortId());
  const [focus, setFocus] = useState(false);
  const [selectValue, setSelctValue] = useState<ISelectOption>(defaultValue);
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
    setSelctValue(defaultValue);
  };

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setOptions((prev: ISelectOption[]) => {
      let result = [...prev];
      if (selectValue.value) {
        result = sortOptionByPosition([...result, selectValue]);
      }
      return findAndRemoveOption(result, value);
    });
    setSelctValue({ value, position });
  };

  useEffect(() => {
    props.onValueChange(selectValue.value);
  }, [selectValue]);

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
      className="bae-select-container singleselect"
      data-focus={focus}
      data-identifier={elementIdentifier.current}
      onClick={() => setFocus((prev) => !prev)}
    >
      <select multiple />
      {selectValue.value && (
        <div className="selected-options">
          <a
            className="selected"
            onClick={onOptionDelete}
            data-value={selectValue.value}
            data-position={selectValue.position}
            data-identifier={elementIdentifier.current}
            key={selectValue.position}
          >
            {selectValue.value} <span className="close-indicator">x</span>
          </a>
        </div>
      )}

      {props.placeholderValue && !selectValue.value && (
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

export default BaeSingleSelect;
