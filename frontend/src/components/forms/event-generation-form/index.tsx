import React, { useState, FormEvent } from "react";
import BaeInput from "../components/form-input";
import BaeSelect from "../components/form-select";
import "../generic-form.scss";

const EventGenerationForm = () => {
  const [name, setName] = useState("");

  const createInputStateSetter = (setFunction: Function) => (
    e: FormEvent<HTMLInputElement>
  ) => {
    setFunction(e.currentTarget.value);
  };

  return (
    <div className="bae-form-container">
      <h3>Let's get started!</h3>
      <p>
        Tell us more about this special person in your life so we can help
        create meaningful suggestions for you.
      </p>
      <BaeInput
        label="Name"
        inputState={name}
        onInputHandler={createInputStateSetter(setName)}
      />
      <BaeSelect
        placeholderValue="Select interests..."
        label="Interests"
        showDropdownRows={3}
        options={["Bacon", "Love", "Food", "Juice", "Toys"]}
        onOptionChange={(value: string) => console.log(value)}
      />
    </div>
  );
};

export default EventGenerationForm;
