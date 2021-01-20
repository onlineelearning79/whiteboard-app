import React, {useState} from 'react';
import classes from './TextAdder.module.css';
import textImg from './images/text.png';
import {TOOL_TEXT} from '../../../Witeboard/tools';

const TextAdder = (props) => {
    const [Text, setText] = useState("");

    return (
        <div className={classes.TextAdder} >
        <img src={textImg} alt="Text"/>
        <input type="text" placeholder="Please Enter Text!!" onChange={(
            event) => {
                setText(event.target.value);
                props.click(TOOL_TEXT, Text);
            }
            }/>
        <button onClick={ () => props.click(TOOL_TEXT, Text)}>+</button>
    </div>
    );
};

export default TextAdder;