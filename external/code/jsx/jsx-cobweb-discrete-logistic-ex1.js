// Put variables in object to isolate.
cw1 = { x0:0.25, n:10 };
cw1.f = function(x) { return x + .75*x*(1-x); };
cw1.buildSeq = function(x, n) {
    var seq = [x];
    for (var i=1; i<=n; i++) {
        x = cw1.f(x);
        seq[i] = x;
    }
    return seq;
};
cw1.board = JXG.JSXGraph.initBoard('jsxboard-cobweb-discrete-logistic-ex1', {boundingbox: [-0.25, 1.5, 2, -0.25], axis:true, showNavigation:false});
cw1.board.create('line', [[0,0], [1,1]], {color:'red',fixed:true});
cw1.project = cw1.board.create('functiongraph', 
    [cw1.f], {strokeColor:'blue', strokeWidth:2});
cw1.step = cw1.board.create('slider', 
    [[0.1,1.4],[1,1.4],[1,1,10]],{name:'step', snapWidth:1, precision:0});

cw1.seq = cw1.buildSeq(cw1.x0, cw1.n);
cw1.project = [];
cw1.update = [];
for (var i=0; i<cw1.n; i++) {
    cw1.project[i] = cw1.board.create('segment', [ [cw1.seq[i], cw1.seq[i]], [cw1.seq[i], cw1.seq[i+1]]], { name:i, color:'black',fixed:true });
    cw1.update[i] = cw1.board.create('segment', [ [cw1.seq[i], cw1.seq[i+1]], [cw1.seq[i+1], cw1.seq[i+1]]], { name:i, color:'black',fixed:true });
}
cw1.a = cw1.board.create('point', [function() { var i = cw1.step.Value(); return cw1.seq[i-1]; }, function() { var i = cw1.step.Value(); return cw1.seq[i-1]} ], {visible:false, withLabel:false});
cw1.b = cw1.board.create('point', [function() { var i = cw1.step.Value(); return cw1.seq[i-1]; }, function() { var i = cw1.step.Value(); return cw1.seq[i]} ], {visible:false, withLabel:false});
cw1.c = cw1.board.create('point', [function() { var i = cw1.step.Value(); return cw1.seq[i]; }, function() { var i = cw1.step.Value(); return cw1.seq[i]} ], {visible:false, withLabel:false});
cw1.board.create('segment', [cw1.a, cw1.b], {color:'red', withLabel:false, strokeWidth:4});
cw1.board.create('segment', [cw1.b, cw1.c], {color:'red', withLabel:false, strokeWidth:4});