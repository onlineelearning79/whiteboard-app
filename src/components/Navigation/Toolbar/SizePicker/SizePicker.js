import { render } from '@testing-library/react';
import React, { Component } from 'react';
import classes from './SizePicker.module.css';

class SizePicker extends Component {
    state={
        size: 5
    }
    
    updatePicker = (value) => {
        let updatedSize = {
            ...this.state.size
        };
        updatedSize = value;
        this.setState({size: updatedSize});
    }

    render(){
        return(
            <div className={classes.SizePicker}>
                <input type="range" name="sizePicker" min="1" max="15" value={this.state.size} step="1" 
                onChange={(event) => {
                    this.props.size(event.target.value);
                    this.updatePicker(event.target.value);
                }}/>
            </div>
        );
    }
}

export default SizePicker;