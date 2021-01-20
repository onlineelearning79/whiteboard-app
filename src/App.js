import logo from './logo.svg';
import './App.css';
import Whiteboard from './components/Witeboard/Whiteboard';
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE } from './components/Witeboard/tools';
import Select from 'react-select';
import Layout from './components/Layout/Layout';
import { Component } from 'react';

class App extends Component{
  state={
    tool: [TOOL_PENCIL],
    color: "#000",
    items: [{tool: TOOL_PENCIL}],
    size: 5,
    scale: 0,
    text: ""
  }

  toolOptionHandler = (tool) => {
    const updatedTool = {
      ...this.state
    };

    updatedTool.tool = tool;
    updatedTool.items[0].tool = tool;
    this.setState(updatedTool);
  }

  changeColorHandler = (colorValue) => {
    const updatedTool = {
      ...this.state
    };

    updatedTool.color = colorValue;
    this.setState(updatedTool);
  }

  sizeHandler = (sizeValue) => {
    const updatedTool = {
      ...this.state
    };

    updatedTool.size = sizeValue;
    this.setState(updatedTool);
  }

  zoomScaleHandler = (tool, scaleVal) => {
    const newState = {
      ...this.state
    };

    newState.tool = tool;
    newState.items[0].tool = tool;
    newState.scale = scaleVal;
    this.setState(newState);
  }

  textInputHandler = (tool, text) =>{
    this.toolOptionHandler(tool);
    this.setState({text: text});
  }

  render(){
    return (
      <div className="App">
        <Layout click={this.toolOptionHandler} color={this.changeColorHandler} brushSize={this.sizeHandler} zoom={this.zoomScaleHandler} textInput={this.textInputHandler}>
          <Whiteboard tool={this.state.tool} items={this.state.items} color={this.state.color} size={this.state.size} scale={this.state.scale} fillText={this.state.text}/>
        </Layout>
      </div>
    );
  };
  
}

export default App;
