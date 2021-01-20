import React from 'react';
import { TOOL_CLEAR } from '../../../Witeboard/tools/ClearCanvas';
import classes from './ClearCanvas.module.css';

const clearCanvas = (props) => (
    <div className={classes.ClearCanvas}>
        <button onClick={() => props.click(TOOL_CLEAR)}>Clear</button>
    </div>
);

export default clearCanvas;