//js for 009-highlightjs-redux

var sliced = require('sliced');
var marked = require('marked'); //markdown
var hljs = require('highlight-redux'); //syntax highlighting
hljs.registerLanguage('javascript', require('highlight-redux/lib/languages/javascript'));
hljs.registerLanguage('css', require('highlight-redux/lib/languages/css'));
var dom = require('domquery');

//convenience libs for various calculations
var size = require('element-size'); //for calculating width/height
var style = require('dom-style'); //for dynamic styling of elements
var elCalcum = require('element-calcum'); //show widths


var wbo = require('../../index.js'); // require('wbo') typically

var loadDemo = function(name){
  var clone = document.querySelector('.demos .'+name).cloneNode(true);
  dom('.current-demo').add(clone)
  document.querySelector('.current-demo').attributes['data-demo'] = name;


}

window.addEventListener('load', function(){

  //Conveniences
  //load the first demo
  loadDemo('demo-larger-child');
  dom('nav.demo-switcher').on('click', 'a', function(e){

    e.preventDefault();

    //clear out previous demo of example
    dom('.current-demo>*').remove();

    //clone the requested demo
    var name = e.target.attributes['data-demo'].value;
    console.log(name)
    loadDemo(name);


  });

  elCalcum({
    selector: '.current-demo [class*="box"]',
    label: 'width', //data-width
    units: 'px',
    labelVisible: 1,
    callback: function(el){
      return size(el)[0];
    }
  });

  dom('button.what-broke-out').on('click','button',  function(){
    var name = document.querySelector('.current-demo').attributes['data-demo'];

    switch(name){
      case 'demo-larger-child':
        var bo = wbo( {
          ancestor: document.querySelector('.current-demo>div')
        } );

      break;
    }


  })


  //syntax highlighting by highlightjs
  sliced( document.querySelectorAll('pre.hljs') ).forEach(function( block, i){
    hljs.highlightBlock( block );
  });

  //markdown rendering by marked
  sliced( document.querySelectorAll('.marked') ).forEach(function( el, i ){
    el.outerHTML = '<p class="marked">' + marked(el.textContent) + '</p>';
  });




  //actual examples

  //


}); //on load
