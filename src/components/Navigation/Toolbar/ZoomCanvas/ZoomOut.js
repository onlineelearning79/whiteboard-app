import React from 'react';
import classes from './ZoomOut.module.css';
import zoomOutImg from './images/zoom-out.png';
import { TOOL_ZOOMOUT } from '../../../Witeboard/tools';

const zoomOut = (props) => (
    <div className={classes.ZoomOut} onClick={() => props.click(TOOL_ZOOMOUT, -1)}>
        <img src={zoomOutImg}/>
    </div>
);

export default zoomOut;