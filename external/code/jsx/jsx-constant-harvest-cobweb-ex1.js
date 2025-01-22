// Put variables in object to isolate.
cw1 = { n:15, r0:1.8, alpha:0.01 };
cw1.board = JXG.JSXGraph.initBoard(
    'jsxboard-constant-harvest-cobweb-ex1',
    {
        boundingbox: [-20, 240, 240, -20],
        axis:true, showNavigation:false
    });
cw1.H = cw1.board.create('slider', 
    [[20,225],[120,225],[0,0,100]],{name:'H', precision:1});
cw1.x0 = cw1.board.create('slider', 
    [[0,0],[240,0],[0,100,240]],{name:'x0', precision:1});
cw1.f = function(x) { 
    return (1+cw1.r0)*x - cw1.alpha*x*x - cw1.H.Value(); 
};
cw1.board.create('line', 
    [[0,0], [10,10]], 
    {color:'red',fixed:true}
);
cw1.project = cw1.board.create('functiongraph', 
    [cw1.f], 
    {strokeColor:'blue', strokeWidth:2}
);
// Build the points used for the cobweb.
cw1.x = [];
cw1.x[0] = cw1.board.create('point', 
    [ function() {return cw1.x0.Value();}, 0], 
    {name:"p0", visible:false}
);
for (var i=1; i<=cw1.n; i++) {
    cw1.x[i] = cw1.board.create('point',
        [ function() {
            var j=this.name.slice(1,); 
            return cw1.f(cw1.x[j-1].X());
            }, 0 ], 
        {name:"p"+i, visible:false}
    );
}
cw1.y = [];
for (var i=0; i<=cw1.n; i++) {
    cw1.y[i] = cw1.board.create('transform', 
        [ 0, "X(p"+i+")"],
        {name:"t"+i, type:'translate'}
    );
}
// Now construct the actual cobweb diagram.
for (var i=0; i<cw1.n; i++) {
    var a = cw1.board.create('point', 
        [cw1.x[i], cw1.y[i]], {visible:false});
    var b = cw1.board.create('point', 
        [cw1.x[i], cw1.y[i+1]], {visible:false});
    var c = cw1.board.create('point', 
        [cw1.x[i+1], cw1.y[i+1]], {visible:false});
    cw1.board.create('segment',
        [a, b], {color:'black',fixed:true});
    cw1.board.create('segment',
        [b, c], {color:'black',fixed:true});
}