// Put things in an object to protect.
var jsx2 = {};
jsx2.board = JXG.JSXGraph.initBoard('jsxboard-projection-function-example', {boundingbox: [-2, 300, 30, -50], axis:true});
jsx2.x0 = jsx2.board.create('slider', [[0,-40],[0,280],[-40,10,280]],{name:'x0'});

jsx2.pt = [];
jsx2.pt[0] = jsx2.board.create('point', [0, function() { return jsx2.x0.Value(); }], {withLabel:false});
jsx2.projFcn = function(x) { return x+0.2*x*(1-0.005*x); };
for (var i=1; i<30; i++) {
    jsx2.pt[i] = jsx2.board.create('point', [i, function() {
        return jsx2.projFcn(jsx2.pt[this.name-1].Y());
    }], {name:i, withLabel:false});
}
jsx2.board.create('line', [[0,0], [1,0]], {dash:2,color:'red',fixed:true});
jsx2.board.create('line', [[0,200], [1,200]], {dash:2,color:'blue',fixed:true});