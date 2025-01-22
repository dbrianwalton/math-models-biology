// Store in object
var jsx1 = {};
jsx1.board = JXG.JSXGraph.initBoard('jsxboard-shifted-geometric-sequence', {boundingbox: [0, 5, 10, -5], axis:true});
jsx1.alpha = jsx1.board.create('slider', [[1,4],[6,4],[-2,0.7,2]],{name:'a'});
jsx1.x0 = jsx1.board.create('slider', [[1,3.5],[6,3.5],[0,0.25,2]],{name:'x0'});
jsx1.xStar = jsx1.board.create('slider', [[1,3],[6,3],[-3,1,3]],{name:'x*'});

jsx1.pt = [];
jsx1.pt[0] = jsx1.board.create('point', [0, function() { return jsx1.x0.Value(); }], {withLabel:false});
for (var i=1; i<10; i++) {
    jsx1.pt[i] = jsx1.board.create('point', [i, function() {
        return jsx1.xStar.Value()+(jsx1.pt[this.name-1].Y() - jsx1.xStar.Value())*jsx1.alpha.Value();
    }], {name:i, withLabel:false});
}
jsx1.fp = jsx1.board.create('point', [0, function(){ return jsx1.xStar.Value(); }], {visible:false});
jsx1.fpShift = jsx1.board.create('point', [1, function(){ return jsx1.xStar.Value(); }], {visible:false});
jsx1.board.create('line', [jsx1.fp, jsx1.fpShift], {dash:2,fixed:true});