import { v4 } from 'uuid';

export const TOOL_ZOOMIN = 'zoomin';

export default (context) => {
  let line = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fillColor, fillText, scale) => {
    line = {
      id: v4(),
      tool: TOOL_ZOOMIN,
      color,
      size,
      scale,
      start: { x, y },
      end: null
    };
    drawLine(line, x, y);
    // imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [line];
  };

  const drawLine = (item, x, y) => {
    // context.save();
    // context.translate(x,y);
    
    // context.lineJoin = 'round';
    // context.lineCap = 'round';
    // context.beginPath();
    // context.lineWidth = item.size;
    console.log(item.scale);
    context.scale(2, 2);
    // context.strokeStyle = item.color;
    // context.globalCompositeOperation = 'source-over';
    // context.moveTo(item.start.x, item.start.y);
    // context.lineTo(x, y);
    // context.closePath();
    // context.stroke();
    // context.restore();
  };

  const onMouseMove = (x, y) => {
    // if (!line) return;
    // context.putImageData(imageData, 0, 0);
    // drawLine(line, x, y);
  };

  const onMouseUp = (x, y) => {
    if (!line) return;
    onMouseMove(x, y);
    const item = line;
    imageData = null;
    line = null;
    item.end = { x, y };
    return [item];
  };

  const draw = item => drawLine(item, item.end.x, item.end.y, item.scale);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw,
  };
};
