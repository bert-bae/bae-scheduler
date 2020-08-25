import React from 'react';
import './buttons.scss';

const BaeButton = (props: {
  children: React.ReactNode;
  buttonStyle: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className="custom-button"
      onClick={props.handleClick}
      data-type={props.buttonStyle}
    >
      {props.children}
    </button>
  );
};

export default BaeButton;
