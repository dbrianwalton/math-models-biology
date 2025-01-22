// Put variables in object to isolate.
cw3 = { n:10 };
cw3.board = JXG.JSXGraph.initBoard('jsxboard-cobweb-discrete-logistic-ex3', {boundingbox: [-0.25, 1.5, 2, -0.25], axis:true, showNavigation:false});
cw3.r = cw3.board.create('slider', 
    [[0.1,1.4],[1,1.4],[0,0.75,3]],{name:'r0', precision:2});
cw3.x0 = cw3.board.create('slider', 
    [[0,0],[2,0],[0,0.25,2]],{name:'x0', precision:2});
cw3.f = function(x) { return x + cw3.r.Value()*x*(1-x); };
cw3.board.create('line', [[0,0], [1,1]], {color:'red',fixed:true});
cw3.project = cw3.board.create('functiongraph', 
    [cw3.f], {strokeColor:'blue', strokeWidth:2});
// Build the points used for the cobweb.
cw3.x = [];
cw3.x[0] = cw3.board.create('point', [ function() {return cw3.x0.Value();}, 0], {name:"p0", visible:false});
for (var i=1; i<=cw3.n; i++) {
    cw3.x[i] = cw3.board.create('point',
        [ function() {
            var j=this.name.slice(1,);
            return cw3.f(cw3.x[j-1].X());
        }, 0 ], 
        {name:"p"+i, visible:false}
    );
}
cw3.y = [];
for (var i=0; i<=cw3.n; i++) {
    cw3.y[i] = cw3.board.create('transform', 
        [ 0, "X(p"+i+")"],
        {name:"t"+i, type:'translate'}
    );
}
// Now construct the actual cobweb diagram.
for (var i=0; i<cw3.n; i++) {
    var a = cw3.board.create('point', 
        [cw3.x[i], cw3.y[i]], {visible:false});
    var b = cw3.board.create('point', 
        [cw3.x[i], cw3.y[i+1]], {visible:false});
    var c = cw3.board.create('point', 
        [cw3.x[i+1], cw3.y[i+1]], {visible:false});
    cw3.board.create('segment',
        [a, b], {color:'black',fixed:true});
    cw3.board.create('segment',
        [b, c], {color:'black',fixed:true});
}