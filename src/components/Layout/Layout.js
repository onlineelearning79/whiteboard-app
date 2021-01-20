
import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar click={props.click} color={props.color} brushSize={props.brushSize} zoom={props.zoom} textInput={props.textInput}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;
