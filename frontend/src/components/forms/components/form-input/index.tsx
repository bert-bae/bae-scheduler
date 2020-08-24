import React, { useState, FormEventHandler, useEffect } from "react";
import "./bae-input.scss";

const BaeInput = (props: {
  label?: string;
  inputState?: string;
  inputType?: string;
  value?: string;
  onValueChange?: Function;
  placeholderValue?: string;
}) => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const onInputValueChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.stopPropagation();
    const value = e.currentTarget.value;
    setValue(value);
    if (props.onValueChange) {
      await props.onValueChange(value);
    }
  };

  useEffect(() => {
    setValue(props.value || "");
  }, []);

  return (
    <div className="bae-input-container" data-focus={focus}>
      <input
        type={props.inputType || "text"}
        onInput={onInputValueChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={props.placeholderValue || ""}
        value={value}
      />
      {props.label && <span className="bae-label">{props.label}</span>}
    </div>
  );
};

export default BaeInput;
