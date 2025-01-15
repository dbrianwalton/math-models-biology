// Put variables in object to isolate.
cw2 = { x0:0.25, n:10 };
cw2.f = function(x) { return x + 1.5*x*(1-x); };
cw2.buildSeq = function(x, n) {
    var seq = [x];
    for (var i=1; i<=n; i++) {
        x = cw2.f(x);
        seq[i] = x;
    }
    return seq;
};
cw2.board = JXG.JSXGraph.initBoard('jsxboard-cobweb-discrete-logistic-ex2', {boundingbox: [-0.25, 1.5, 2, -0.25], axis:true, showNavigation:false});
cw2.board.create('line', [[0,0], [1,1]], {color:'red',fixed:true});
cw2.project = cw2.board.create('functiongraph', 
    [cw2.f], {strokeColor:'blue', strokeWidth:2});
cw2.step = cw2.board.create('slider', 
    [[0.1,1.4],[1,1.4],[1,1,10]],{name:'step', snapWidth:1, precision:0});

cw2.seq = cw2.buildSeq(cw2.x0, cw2.n);
cw2.project = [];
cw2.update = [];
for (var i=0; i<cw2.n; i++) {
    cw2.project[i] = cw2.board.create('segment', [ [cw2.seq[i], cw2.seq[i]], [cw2.seq[i], cw2.seq[i+1]]], { name:i, color:'black',fixed:true });
    cw2.update[i] = cw2.board.create('segment', [ [cw2.seq[i], cw2.seq[i+1]], [cw2.seq[i+1], cw2.seq[i+1]]], { name:i, color:'black',fixed:true });
}
cw2.a = cw2.board.create('point', [function() { var i = cw2.step.Value(); return cw2.seq[i-1]; }, function() { var i = cw2.step.Value(); return cw2.seq[i-1]} ], {visible:false, withLabel:false});
cw2.b = cw2.board.create('point', [function() { var i = cw2.step.Value(); return cw2.seq[i-1]; }, function() { var i = cw2.step.Value(); return cw2.seq[i]} ], {visible:false, withLabel:false});
cw2.c = cw2.board.create('point', [function() { var i = cw2.step.Value(); return cw2.seq[i]; }, function() { var i = cw2.step.Value(); return cw2.seq[i]} ], {visible:false, withLabel:false});
cw2.board.create('segment', [cw2.a, cw2.b], {color:'red', withLabel:false, strokeWidth:4});
cw2.board.create('segment', [cw2.b, cw2.c], {color:'red', withLabel:false, strokeWidth:4});