import React from "react";
import BaeButton from "../../buttons"
import BaeInput from "../components/form-input";
import BaeMultiSelect from "../components/form-multi-select";
import BaeSingleSelect from "../components/form-single-select";
import { relationOptions, interestOptions } from "../../../constants/form-options"
import "../generic-form.scss";

const EventGenerationForm = () => {
  return (
    <div className="bae-form-container">
      <h3>Let's get started!</h3>
      <p>
        Tell us more about this special person in your life so we can help
        create meaningful suggestions for you.
      </p>
      <div className="form-subsection">
        <BaeInput
          label="Name"
          onValueChange={(value: string) => console.log(value)}
        />
        <BaeMultiSelect
          placeholderValue="Select interests..."
          label="Interests"
          showDropdownRows={3}
          options={interestOptions}
          onOptionChange={(value: string) => console.log(value)}
        />
        <BaeSingleSelect
          placeholderValue="Relationship to person..."
          label="Relation"
          showDropdownRows={3}
          options={relationOptions}
          onValueChange={(value: string) => console.log(value)}
        />
        <div className="flex center-ver center-hor">
          <BaeButton buttonStyle="primary" handleClick={() => console.log('hello')}>Generate!</BaeButton>
        </div>
      </div>
    </div>
  );
};

export default EventGenerationForm;
