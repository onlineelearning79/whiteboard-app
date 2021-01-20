import React from 'react';
import { TOOL_ELLIPSE } from '../../../Witeboard/tools';
import classes from './Circle.module.css';
import circleImg from './images/circle.jpeg';

const circle = (props) => (
    <div className={classes.Circle} onClick={ () => props.click(TOOL_ELLIPSE)}>
        <img src={circleImg} alt="Circle"></img>
    </div>
)

export default circle;