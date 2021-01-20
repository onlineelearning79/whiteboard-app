import React from 'react';
import classes from './Rectangle.module.css';
import rectangleImg from './images/rectangle.png';
import {TOOL_RECTANGLE} from '../../../Witeboard/tools';

const rectangle = (props) => (
    <div className={classes.Rectangle} onClick={()=>props.click(TOOL_RECTANGLE)}>
        <img src={rectangleImg} alt="Pencil"></img>
    </div>
)

export default rectangle;