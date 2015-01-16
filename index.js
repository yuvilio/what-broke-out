var sliced = require('sliced');
var size = require('element-size'); //for calculating width/height
var style = require('dom-style');

module.exports = function(opts){

  //default options
  var options = {};

  //assume it's the sum total of everything
  options.ancestor = opts.ancestor || document.querySelector('body') ;
  //
  var maxWidth = size(options.ancestor)[0];

  console.log('maxWidth', maxWidth, 'px')


  var walker,
    filter = {
    //filter for wider than ancestor elements
    acceptNode: function(node) {
      return  ( size(node)[0] > maxWidth );
    }
  };


  try {
    walker = document.createTreeWalker(options.ancestor, NodeFilter.SHOW_ELEMENT, filter, false); //get element nodes, filtered
  }  catch(e) {
    console.log('document.createTreeWalker exception', e);
  }

  var node;
  while (node = walker.nextNode()) {
    style(node, {
      border: '2px dashed salmon'
    })
    console.log('wider node found: ', node, 'width', size(node)[0], 'px');
  }



}
