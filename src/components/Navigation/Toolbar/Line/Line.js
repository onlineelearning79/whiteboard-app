import React from 'react';
import classes from './Line.module.css';
import lineImg from './images/line.png';
import {TOOL_LINE} from '../../../Witeboard/tools';

const line = (props) => (
    <div className={classes.Line} onClick={ () => props.click(TOOL_LINE)}>
        <img src={lineImg} alt="Line"></img>
    </div>
)

export default line;