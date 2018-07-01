import React from 'react';
import './button.css';

const Button = (props) => {
    return (
        <div>{console.log("button props",props)}
        <button onClick={() => {props.action(props.input)}}> {props.buttonName} </button>
        </div>
    )
}

export default Button;