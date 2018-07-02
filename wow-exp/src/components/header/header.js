import React from 'react';
import './header.css'

export default function Header (props) {
    return (
        <h1 className="header"> {props.headerName} </h1> 
    )
}