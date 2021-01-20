import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { 
  Pencil, TOOL_PENCIL, 
  Line, TOOL_LINE, 
  Ellipse, TOOL_ELLIPSE, 
  Rectangle, TOOL_RECTANGLE, 
  Text, TOOL_TEXT,
  ZoomIn, TOOL_ZOOMIN,
  ZoomOut, TOOL_ZOOMOUT,
  TOOL_CLEAR
} from './tools';


export const toolsMap = {
    [TOOL_PENCIL]: Pencil,
    [TOOL_LINE]: Line,
    [TOOL_RECTANGLE]: Rectangle,
    [TOOL_ELLIPSE]: Ellipse,
    [TOOL_TEXT]: Text,
    [TOOL_ZOOMIN]: ZoomIn,
    [TOOL_ZOOMOUT]: ZoomOut,
  };

class Whiteboard extends Component {
    tool = null;
    interval = null;
    textarea = null;
  
    static propTypes = {
      width: PropTypes.number,
      height: PropTypes.number,
      items: PropTypes.array.isRequired,
      animate: PropTypes.bool,
      canvasClassName: PropTypes.string,
      color: PropTypes.string,
      fillColor: PropTypes.string,
      fillText: PropTypes.string,
      size: PropTypes.number,
      scale: PropTypes.number,
      tool: PropTypes.string,
      toolsMap: PropTypes.object,
      onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
      onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
      onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
      onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
      debounceTime: PropTypes.number,
    };
  
    static defaultProps = {
      width: 650,
      height: 650,
      color: '#000',
      size: 5,
      fillColor: '',
      canvasClassName: 'canvas',
      debounceTime: 1000,
      animate: true,
      tool: TOOL_PENCIL,
      toolsMap,
      fillText: "",
      scale: 1
    };
  
    constructor(props) {
      super(props);
      this.initTool = this.initTool.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onDebouncedMove = this.onDebouncedMove.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
    }
  
    componentDidMount() {
      this.canvas = findDOMNode(this.canvasRef);
      this.ctx = this.canvas.getContext('2d');
      this.initTool(this.props.tool);
    }

    mouseDownOnTextarea = (e) => {
      var x = this.textarea.offsetLeft - e.clientX,
          y = this.textarea.offsetTop - e.clientY;
      function drag(e) {
        this.textarea.style.left = e.clientX + x + 'px';
        this.textarea.style.top = e.clientY + y + 'px';
      }
      function stopDrag() {
          document.removeEventListener('mousemove', drag);
          document.removeEventListener('mouseup', stopDrag);
      }
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
  }
  
    componentWillReceiveProps({tool, items}) {
      console.log(items);
      if(tool == "clear"){
        this.ctx.save();
        this.ctx.clearRect(0,0, this.props.width, this.props.height);
        tool = "pencil";
        this.initTool(tool);
        this.ctx.restore();
      // }else if(tool == "text"){
      //   console.log("text");
      //   console.log(this.canvas);
      //   this.canvas.addEventListener('click', function(e){
      //     if (this.textarea == null) {
      //       this.textarea = document.createElement('textarea');
      //       this.textarea.className = 'info';
      //       this.textarea.addEventListener('mousedown', this.mouseDownOnTextarea);
      //       this.canvas.appendChild(this.textarea);
      //     }
      //     // var x = e.clientX - this.canvas.offsetLeft,
      //     //     y = e.clientY - this.canvas.offsetTop;
      //     //     this.textarea.value = "x: " + x + " y: " + y;
      //     //     this.textarea.style.top = e.clientY + 'px';
      //     //     this.textarea.style.left = e.clientX + 'px';
      //   }, false);

      //   console.log(this.getCursorPosition());
      //   this.tool.draw(items[0], this.props.animate);
      }else if(tool == "zoomin"){
        console.log(tool);
        console.log(this.canvas.clientX +" " + this.canvas.clientY);
        console.log(this.canvas.getBoundingClientRect());
        this.ctx.scale(this.canvas.getBoundingClientRect().x, this.canvas.getBoundingClientRect().y);
      }
      else{
        console.log("in else block");
        console.log(items);
      items
        .filter(item => this.props.items.indexOf(item) === -1)
        .forEach(item => {
          this.initTool(item.tool);
          console.log("tool");
          console.log(this.tool);
          this.tool.draw(item, this.props.animate);
        });
      this.initTool(tool);
      }
    }

    // addTextArea = (e) => {
    //   // console.log(this.props.tool);
    //   // if(this.props.tool != "text"){
    //   //   console.log("not  text");
    //   //   return;
    //   // }

    //   // this.canvas.addEventListener('click', function(e){
    //   //   if (this.textarea == null) {
    //   //     this.textarea = document.createElement('textarea');
    //   //     this.textarea.className = 'info';
    //   //     this.textarea.addEventListener('mousedown', this.mouseDownOnTextarea);
    //   //     this.canvas.appendChild(this.textarea);
    //   //   }
    //   //   var x = e.clientX - this.canvas.offsetLeft,
    //   //       y = e.clientY - this.canvas.offsetTop;
    //   //       this.textarea.value = "x: " + x + " y: " + y;
    //   //       this.textarea.style.top = e.clientY + 'px';
    //   //       this.textarea.style.left = e.clientX + 'px';
    //   // }, false);

    //   var input = document.createElement('input');

    //     input.type = 'text';
    //     input.style.position = 'fixed';
    //     input.style.left = (e.clientX - 4) + 'px';
    //     input.style.top = (e.clientY - 4) + 'px';

    //     input.onkeydown = this.handleEnter;

    //     document.body.appendChild(input);

    //     input.focus();

    //     // hasInput = true;


    //   console.log("hai text");
    // }

    // handleEnter = (e) => {
    //     var keyCode = e.keyCode;
    //     if (keyCode === 13) {
    //         this.drawText(e, this.value);
    //         this.canvas.removeChild(this.canvas.lastChild.nodeType);
            
    //         // hasInput = false;
    //     }
    // }
    // drawText(e, txt) {
    //     // this.ctx.textBaseline = 'top';
    //     // this.ctx.textAlign = 'left';
    //     // this.ctx.font = font;
    //     this.ctx.fillText(txt, e.clientY, e.clientY - 4);
        
    // }
  
    initTool(tool) {
      this.tool = this.props.toolsMap[tool](this.ctx);
    }
  
    onMouseDown(e) {
      const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor, this.props.fillText, this.props.scale, this.canvas);
      data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
      if (this.props.onDebouncedItemChange) {
        this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
      }
    }
  
    onDebouncedMove() {
      if (typeof this.tool.onDebouncedMouseMove == 'function' && this.props.onDebouncedItemChange) {
        this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
      }
    }
  
    onMouseMove(e) {
      const data = this.tool.onMouseMove(...this.getCursorPosition(e));
      data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
    }
  
    onMouseUp(e) {
      const data = this.tool.onMouseUp(...this.getCursorPosition(e));
      data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
      if (this.props.onDebouncedItemChange) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  
    getCursorPosition(e) {
      const {top, left} = this.canvas.getBoundingClientRect();
      return [
        e.clientX - left,
        e.clientY - top
      ];
    }
  
    render() {
      const {width, height, canvasClassName} = this.props;
      return (
        <canvas style={{
          border:"1px solid black",
          boxShadow: "10px 5px grey",
          borderRadius: "5px"
      }}
          id="myCanvas"
          ref={(canvas) => { this.canvasRef = canvas; }}
          className={canvasClassName}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseOut={this.onMouseUp}
          onMouseUp={this.onMouseUp}
          // onClick = {this.addTextArea}
          width={width}
          height={height}
        />
      )
    }
    
}

export default Whiteboard;