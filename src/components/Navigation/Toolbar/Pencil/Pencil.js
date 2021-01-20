import React from 'react';
import classes from './Pencil.module.css';
import pencilImg from './images/pencil.png';
import {Pencil, TOOL_PENCIL} from '../../../Witeboard/tools';

const pencil = (props) => (
    <div className={classes.Pencil} onClick={ () => props.click(TOOL_PENCIL)}>
        <img src={pencilImg} alt="Pencil"></img>
    </div>
)

export default pencil;