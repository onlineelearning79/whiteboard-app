import React from 'react';
import classes from './Toolbar.module.css';

import PencilTool from './Pencil/Pencil';
import RectangleTool from './Rectangle/Rectangle';
import LineTool from './Line/Line';
import CircleTool from './Circle/Circle';
import ColorPicker from './ColorPicker/ColorPicker';
import SizePicker from './SizePicker/SizePicker';
import TextAdder from './TextAdder/TextAdder';
import ZoomIn from './ZoomCanvas/ZoomIn';
import ZoomOut from './ZoomCanvas/ZoomOut';
import Aux from './../../../hoc/Aux';
import ClearCanvas from './ClearCanvasTool/ClearCanvas';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <PencilTool click={props.click}/>
        <RectangleTool click={props.click}/>
        <LineTool click={props.click}/>
        <CircleTool click={props.click}/>
        <TextAdder click={props.textInput}/>
        <ColorPicker pickColor={props.color}/>
        <SizePicker size={props.brushSize}/>
        <ZoomIn click={props.zoom}/>
        <ZoomOut click={props.zoom}/>
        <ClearCanvas click={props.click}/>
    </header>
)


export default toolbar;