import React from 'react';
import './filterButton.css';

const filterButton = (props) => {
    return (
        <div>{console.log("button props",props)}
        <button  className={props.className}  onClick={() => {props.action(props.input)}}> {props.buttonName} </button>
        </div>
    )
}

export default filterButton;