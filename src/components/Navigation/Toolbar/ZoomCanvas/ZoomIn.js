import React from 'react';
import classes from './ZoomIn.module.css';
import zoomInImg from './images/zoom-in.png';
import {TOOL_ZOOMIN} from '../../../Witeboard/tools';

const zoomIn = (props) => (
    <div className={classes.ZoomIn} onClick={() => props.click(TOOL_ZOOMIN, 1)}>
        <img src={zoomInImg}/>
    </div>
);

export default zoomIn;