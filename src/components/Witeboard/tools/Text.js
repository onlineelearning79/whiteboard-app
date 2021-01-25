import { v4 } from 'uuid';

export const TOOL_TEXT = 'text';

export default (context) => {
  let stroke = null;
  let points = [];
  let textarea = null;

  const offset = (marginleft, margintop) => {
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log("scrollLeft:"+scrollLeft);
        console.log("scrolltop:"+scrollTop);
        console.log("marginleft:"+marginleft);
        console.log("margintop:"+margintop);
        return { top: margintop + scrollTop, left: marginleft + scrollLeft }
    }

    const handleEnter = (e) => {
        console.log("handler hit");
          var keyCode = e.keyCode;
          console.log(keyCode);
          console.log(stroke);
          if (keyCode === 13) {
              this.drawLine(stroke, stroke.points[0], stroke.points[1]);
              this.canvas.removeChild(this.canvas.lastChild.nodeType);
              
              // hasInput = false;
          }
      }

  const onMouseDown = (x, y, color, size, fillColor, fillText, scale, canvas) => {
    stroke = {
      id: v4(),
      tool: TOOL_TEXT,
      color,
      size,
      fillText,
      points: [{ x, y }]
    };
    console.log("color:" + color);
    // drawLine(stroke, x, y, "Santosh");
    const newPoint = { x, y };
    const start = stroke.points.slice(-1)[0];
    const {top, left, bottom, right} = context.canvas.getBoundingClientRect();
    

    context.canvas.addEventListener('click', function(e){
        const canvasCoords = offset(left, top);

        if (textarea == null) {
          textarea = document.createElement('input');
          textarea.className = 'info';
          textarea.id = "canvasTextInput";
        }

        let x1 = canvasCoords.left + x, y1 = canvasCoords.top + y;
        let clickX = x, clickY = y;

        let textreaWidth = "100";
        let textreaHeight = "40";
        textarea.style.width = "100px";
        textarea.style.height = "40px";
        if((parseInt(x) + parseInt(canvasCoords.left) + parseInt(textreaWidth)) > right){
            console.log("exceeded canvas right");
            x1 = (parseInt(x) + parseInt(canvasCoords.left) - parseInt(textreaWidth));
        }

        if((parseInt(y) + parseInt(canvasCoords.top) + parseInt(textreaHeight)) > bottom){
            console.log("exceeded canvas right");
            y1 = (parseInt(y) + parseInt(canvasCoords.top) - parseInt(textreaHeight));
        }

        textarea.addEventListener('keydown', (e) => {
            let strok = {
                fillText: e.target.value,
                fillColor: e.target.style.color, 
                points: [{x1, y1}],
                canvasOrigin: [{left, top}],
                textareaDimensions: [{textreaWidth, textreaHeight}]
            };
        
            var keyCode = e.keyCode;
            const {x, y} = context.canvas.getBoundingClientRect();
            if (keyCode === 13) {
                console.log("e.target.style.color: "+ e.target.style.color.value);
                drawLine(strok, { x1, y1 });
                // context.canvas.removeChild(document.getElementById("canvasTextInput"));
                document.body.removeChild(document.getElementById('canvasTextInput'));
                // document.getElementById("myCanvasDraw").removeChild(document.getElementById('canvasTextInput'));
                
                // document.getElementById('canvasTextInput').parentNode.removeChild(document.getElementById('canvasTextInput'));
            }
        });
        textarea.addEventListener('mousedown', mouseDownOnTextarea);

        textarea.type = 'text';
        textarea.style.top = y1 + 'px';
        textarea.style.left = x1 + 'px';
        textarea.style.position = "fixed";
        textarea.style.color = color;
        textarea.placeholder = "Type here!!";
        // textarea.addEventListener('mousedown', function(){
        //     mouseDownOnTextarea(textarea, x, y, canvasCoords, textreaHeight, textreaWidth);
        // }, false);
        textarea.focus();
        document.body.appendChild(textarea);
        // document.body.appendChild(textarea);
      }, false);

    return [stroke];
  };

  const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
   }

  

  
  const drawLine = (item, { x, y }) => {
    context.save();
    context.beginPath();
    context.font = "25px Arial";
    context.strokeStyle = item.fillColor;
    context.fillText(item.fillText,  item.points[0].x1 - item.canvasOrigin[0].left, 
        item.points[0].y1 - item.canvasOrigin[0].top);
    context.closePath();
    context.stroke();
  };

  const mouseDownOnTextarea = (e) => {
    const {top, left, bottom, right} = context.canvas.getBoundingClientRect();
    const canvasCoords = offset(left, top);
    // let {x, y} = 
    // let x1 = left;
    console.log("mousedowntextarea");
    var x = textarea.offsetLeft - e.clientX,
        y = textarea.offsetTop - e.clientY;

    console.log("x: "+x);
    console.log("y: "+y);
    if(textarea.offsetLeft - e.clientX >= left && textarea.offsetLeft - e.clientX<= right){
        x = textarea.offsetLeft - e.clientX;
    }else{
        if(textarea.offsetLeft - e.clientX < left){
            x = left;
        }else if(textarea.offsetLeft - e.clientX> right){
            x = right;
        }
    }

    if(textarea.offsetTop - e.clientY >= top && textarea.offsetTop - e.clientY<= bottom){
        y = textarea.offsetTop - e.clientY;
    }else{
        if(textarea.offsetTop - e.clientY < top){
            y = top;
        }else if(textarea.offsetTop - e.clientY> bottom){
            y = bottom;
        }
    }


    let x1 = 0, y1=0;
    let textreaWidth = "100";
    let textreaHeight = "40";
    console.log("top: "+top);
    console.log("left: "+left);
    console.log("textarea.offsetLeft: "+textarea.offsetLeft);
    console.log("textarea.offsetTop: "+textarea.offsetTop);
    console.log("e.clientX: "+e.clientX);
    console.log("e.clientY: "+e.clientY);
    

    if((parseInt(x) + parseInt(canvasCoords.left) + parseInt(textreaWidth)) > right){
        console.log("exceeded canvas right");
        x1 = (parseInt(x) + parseInt(canvasCoords.left) - parseInt(textreaWidth));
    }

    if((parseInt(y) + parseInt(canvasCoords.top) + parseInt(textreaHeight)) > bottom){
        console.log("exceeded canvas right");
        y1 = (parseInt(y) + parseInt(canvasCoords.top) - parseInt(textreaHeight));
    }
    
    function drag(e) {
      textarea.style.left = e.clientX + x + 'px';
      textarea.style.top = e.clientY + y + 'px';
    }
    function stopDrag() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

  const onMouseMove = (x, y) => {
    // if (!stroke) return [];
    // const newPoint = { x, y };
    // const start = stroke.points.slice(-1)[0];
    // drawLine(stroke, start, newPoint, stroke.fillText);
    // stroke.points.push(newPoint);
    // points.push(newPoint);

    // return [stroke];
  };

  const onDebouncedMouseMove = () => {
    const debouncedPoints = points;
    points = [];
    return [stroke, debouncedPoints];
  };

  const onMouseUp = (x, y) => {
    if (!stroke) return;
    onMouseMove(x, y);
    points = [];
    const item = stroke;
    stroke = null;
    return [item];
  };

  const draw = (item, animate) => {
    let time = 0;
    let i = 0;
    console.log(item);
    console.log("inside text");
    const j = item.points.length;
    for (i, j; i < j; i++) {
      if (!item.points[i - 1]) continue;
      if (animate) {
        setTimeout(drawLine.bind(null, item, item.points[i - 1], item.points[i], item.fillText), time);
        time += 10;
      } else {
        drawLine(item, item.points[i - 1], item.points[i]);
      }
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onDebouncedMouseMove,
    onMouseUp,
    draw,
  };
};
