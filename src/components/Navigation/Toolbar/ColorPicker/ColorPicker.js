import React, { Component } from 'react';
import classes from './ColorPicker.module.css';

class Colorpicker extends Component {
    state = {
        color: "#000"
    };

    updateColorPicker = (newColor) => {
        let updatedColor = {
            ...this.state.color
        };
        updatedColor = newColor;
        this.setState({color: updatedColor});
    }

    render(){
        return (
            <div className={classes.ColorPicker}>
                <input type="color" id="favcolor" name="favcolor" value={this.state.value} 
                onChange={(event) => {
                    this.props.pickColor(event.target.value);
                    this.updateColorPicker(event.target.value);
                }}/>
            </div>
        );
    }
}

export default Colorpicker;