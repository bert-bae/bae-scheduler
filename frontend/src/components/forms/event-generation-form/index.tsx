import React, { useState, FormEvent } from 'react'
import BaeInput from '../components/form-input'
import '../generic-form.scss'

const EventGenerationForm = () => {
  const [name, setName] = useState('')

  const createInputStateSetter = (setFunction: Function) => (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    setFunction(e.currentTarget.value)
  }

  return (
    <div className="bae-form-container">
      <h3>Let's get started!</h3>
      <p>Tell us more about this special person in your life so we can help create meaningful suggestions for you.</p>
      <BaeInput label="Name" inputState={name} onInputHandler={createInputStateSetter(setName)} />
      <BaeInput label="Name" inputState={name} onInputHandler={createInputStateSetter(setName)} />

    </div>
  )
}

export default EventGenerationForm