import React, { useState, useEffect, useRef } from "react";
import "./bae-select.scss";

interface ISelectOptions {
  value: string;
  position: number;
}

const BaeSelect = (props: {
  label?: string;
  options: string[];
  onOptionSelect: Function;
  placeholderValue?: string;
}) => {
  const [focus, setFocus] = useState(false);
  const [selectValues, setSelectValues] = useState<ISelectOptions[]>([]);
  const [options, setOptions] = useState<ISelectOptions[]>(
    props.options.map((value, i) => {
      return { value, position: i };
    })
  );
  // const optionRef = useRef<ISelectOptions[]>(
  // props.options.map((value, i) => {
  //   return { value, position: i };
  // });
  // );

  // useEffect(() => {
  //   window.addEventListener('click', (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  //     event.stopPropagation()
  //     if (event.currentTarget.className !== 'option') {
  //       setFocus(false)
  //     }
  //   })
  // }, []);

  const onOptionDelete = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setOptions((prev) => [...prev, { value, position }]);
    setSelectValues((prev) => {
      const copy = [...prev];
      copy.splice(
        copy.findIndex((option) => option.value === value),
        1
      );
      return copy;
    });
  };

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    const value = String(e.currentTarget.getAttribute("data-value"));
    const position = Number(e.currentTarget.getAttribute("data-position"));

    setSelectValues((prev) => [...prev, { value, position }]);
    setOptions((prev) => {
      const copy = [...prev];
      copy.splice(
        copy.findIndex((option) => option.value === value),
        1
      );
      return copy;
    });
  };

  const createSelected = selectValues.map((option) => {
    return (
      <span
        className="selected"
        onClick={onOptionDelete}
        data-value={option.value}
        data-position={option.position}
        key={option.position}
      >
        {option.value}
      </span>
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
      <div className="dropdown-selections" data-focus={focus}>
        {createOptions}
      </div>
    </div>
  );
};

export default BaeSelect;
