// Put variables in object to isolate.
cw4 = { n:10 };
cw4.board = JXG.JSXGraph.initBoard('jsxboard-cobweb-linear-ex4', {boundingbox: [-0.25, 1.5, 2, -0.25], axis:true, showNavigation:false});
cw4.a = cw4.board.create('slider', 
    [[0.1,1.4],[1,1.4],[-1.5,0.75,1.5]],{name:'a', precision:2});
cw4.x0 = cw4.board.create('slider', 
    [[0,0],[2,0],[0,0.25,2]],{name:'x0', precision:2});
cw4.f = function(x) { return 1 + cw4.a.Value()*(x-1); };
cw4.board.create('line', [[0,0], [1,1]], {color:'red',fixed:true});
cw4.project = cw4.board.create('functiongraph', 
    [cw4.f], {strokeColor:'blue', strokeWidth:2});
// Build the points used for the cobweb.
cw4.x = [];
cw4.x[0] = cw4.board.create('point', [ function() {return cw4.x0.Value();}, 0], {name:"p0", visible:false});
for (var i=1; i<=cw4.n; i++) {
    cw4.x[i] = cw4.board.create('point',
        [ function() {var j=this.name.slice(1,); return cw4.f(cw4.x[j-1].X());}, 0 ], 
        {name:"p"+i, visible:false}
    );
}
cw4.y = [];
for (var i=0; i<=cw4.n; i++) {
    cw4.y[i] = cw4.board.create('transform', 
        [ 0, "X(p"+i+")"],
        {name:"t"+i, type:'translate'}
    );
}
// Now construct the actual cobweb diagram.
for (var i=0; i<cw4.n; i++) {
    var a = cw4.board.create('point', 
        [cw4.x[i], cw4.y[i]], {visible:false});
    var b = cw4.board.create('point', 
        [cw4.x[i], cw4.y[i+1]], {visible:false});
    var c = cw4.board.create('point', 
        [cw4.x[i+1], cw4.y[i+1]], {visible:false});
    cw4.board.create('segment',
        [a, b], {color:'black',fixed:true});
    cw4.board.create('segment',
        [b, c], {color:'black',fixed:true});
}