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
    // drawLine(stroke, x, y, "Santosh");
    const newPoint = { x, y };
    const start = stroke.points.slice(-1)[0];
    const {top, left} = context.canvas.getBoundingClientRect();
    

    context.canvas.addEventListener('click', function(e){
        const canvasCoords = offset(left, top);
        console.log(offset(left, top));
        console.log("canvasCoords:"+canvasCoords.top);
        // console.log("canvasleft:"+canvasleft);

        if (textarea == null) {
          textarea = document.createElement('input');
          textarea.className = 'info';
          textarea.id = "canvasTextInput";

          
          
        //   textarea.addEventListener('mousedown', mouseDownOnTextarea);
          console.log(context.canvas.getBoundingClientRect().left);
          console.log(context.canvas.getBoundingClientRect().top);
          
        }

        textarea.addEventListener('keydown', (e) => {
            let strok = {
                fillText: e.target.value
            };
            var keyCode = e.keyCode;
            console.log(keyCode);
            console.log(strok);
            console.log(context);
            const {x, y} = context.canvas.getBoundingClientRect();
            console.log(y);
            if (keyCode === 13) {
                drawLine(strok, { x, y });
                // context.canvas.removeChild(document.getElementById("canvasTextInput"));
                document.body.removeChild(document.getElementById('canvasTextInput'));
                
                // document.getElementById('canvasTextInput').parentNode.removeChild(document.getElementById('canvasTextInput'));
            }
        });
        console.log(context.canvas.getBoundingClientRect().left);
        var x1 = canvasCoords.left + x,
            y1 = canvasCoords.top + y;
        textarea.type = 'text';
        textarea.value = "x: " + x1 + " y: " + y1;
        textarea.style.top = y1 + 'px';
        textarea.style.left = x1 + 'px';
        textarea.style.position = "fixed";
        textarea.focus();
        document.body.appendChild(textarea);
        // document.body.appendChild(textarea);
        console.log(textarea.style.left);
        console.log(textarea.style.top);
      }, false);

      context.closePath();
    context.stroke();

    
    //drawLine(stroke, start, newPoint);
    // let newCanvas = document.createElement("input");
    // newCanvas.id = "sketcher";
    // newCanvas.class = "ChemDoodleWebComponent";
    // document.getElementById("myCanvas").appendChild(newCanvas);
    return [stroke];
  };

  

  
  const drawLine = (item, { x, y }) => {
      console.log(x);
      console.log(y);
    context.save();
    context.beginPath();
    context.font = "25px Arial";
    // context.fillStyle=item.color;
    context.fillText(item.fillText, x, y);
    context.closePath();
    context.stroke();
  };

  const mouseDownOnTextarea = (e) => {
    var x = textarea.offsetLeft - e.clientX,
        y = textarea.offsetTop - e.clientY;
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
