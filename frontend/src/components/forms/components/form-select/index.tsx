import React, { useState, useRef } from 'react'
import './bae-select.scss'

const BaeSelect = (props: {
  label?: string,
  options: string[],
  onOptionSelect: Function,
  placeholderValue?: string,
}) => {
  const [focus, setFocus] = useState(false)
  const [selectValue, setSelectValue] = useState('')

  // useEffect(() => {
  //   window.addEventListener('click', (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  //     event.stopPropagation()
  //     if (event.currentTarget.className !== 'option') {
  //       setFocus(false)
  //     }
  //   })
  // }, [])

  const onOptionDelete = (e: React.MouseEvent<HTMLDivElement>): void => {

  }

  const onOptionSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    const value = String(e.currentTarget.getAttribute('data-value'))
    setSelectValue((prev: string) => {
      if (prev) {
        return `${prev}, ${value}`
      } else {
        return value
      }
    })
  }

  const createOptions = props.options.map((option, key) => {
    return <div className="option active" onClick={onOptionSelect} data-value={option} key={key}>{option}</div>
  })

  return <div className="bae-select-container" data-focus={focus} onClick={() => setFocus(prev => !prev)}>
    <select multiple />
    {
      selectValue &&
      <div className="selected-options">
        {selectValue}
      </div>
    }
    {
      props.placeholderValue && !selectValue &&
      <p className="disabled option">{props.placeholderValue}</p>
    }
    {props.label && <span className="bae-label">{props.label}</span>}
    <div className="dropdown-selections" data-focus={focus}>
      {createOptions}
    </div>
  </div>
}

export default BaeSelect