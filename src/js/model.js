const { default: Konva } = require(['konva']);

import Konva from '../';

const stage = new Konva.Stage({
  height : 500,
  width : 500,
  container : 'konva-holder',
});

const layer = new Konva.Layer();
stage.add(layer);

stage.on('mousedown'  , function() {
  console.log('hi');
});

stage.on('mousemove'  , function() {
  console.log('move');
});

stage.on('mouseup'  , function() {
  console.log('bye');
});
