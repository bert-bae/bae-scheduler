import React, { useState, FormEventHandler } from 'react'
import './bae-input.scss'

const BaeInput = (props: {
  onInputHandler: FormEventHandler,
  label?: string,
  inputState?: string,
  inputType?: string,
  placeholderValue?: string,
}) => {
  const [focus, setFocus] = useState(false)

  return <div className="bae-input-container" data-focus={focus}>
    <input
      type={props.inputType || 'text'}
      onInput={props.onInputHandler}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholder={props.placeholderValue || ''}
      value={props.inputState}
    />
    {props.label && <span className="bae-label">{props.label}</span>}
  </div>
}

export default BaeInput