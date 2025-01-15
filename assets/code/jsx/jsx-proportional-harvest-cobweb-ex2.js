// Put variables in object to isolate.
cw2 = { n:15, r0:1.8, alpha:0.01 };
cw2.board = JXG.JSXGraph.initBoard(
    'jsxboard-proportional-harvest-cobweb-ex2',
    {
        boundingbox: [-50, 240, 240, -50],
        axis:true, showNavigation:false
    });
cw2.h = cw2.board.create('slider', 
    [[20,200],[120,200],[0,0,2.5]],{name:'h', precision:2});
cw2.x0 = cw2.board.create('slider', 
    [[-50,0],[240,0],[-50,100,240]],{name:'x0', precision:1});
cw2.f = function(x) { 
    return (1+cw2.r0)*x - cw2.alpha*x*x - cw2.h.Value()*x; 
};
cw2.board.create('line', 
    [[0,0], [10,10]], 
    {color:'red',fixed:true}
);
cw2.project = cw2.board.create('functiongraph', 
    [cw2.f], 
    {strokeColor:'blue', strokeWidth:2}
);
// Build the points used for the cobweb.
cw2.x = [];
cw2.x[0] = cw2.board.create('point', 
    [ function() {return cw2.x0.Value();}, 0], 
    {name:"p0", visible:false}
);
for (var i=1; i<=cw2.n; i++) {
    cw2.x[i] = cw2.board.create('point',
        [ function() {
            var j=this.name.slice(1,); 
            return cw2.f(cw2.x[j-1].X());
            }, 0 ], 
        {name:"p"+i, visible:false}
    );
}
cw2.y = [];
for (var i=0; i<=cw2.n; i++) {
    cw2.y[i] = cw2.board.create('transform', 
        [ 0, "X(p"+i+")"],
        {name:"t"+i, type:'translate'}
    );
}
// Now construct the actual cobweb diagram.
for (var i=0; i<cw2.n; i++) {
    var a = cw2.board.create('point', 
        [cw2.x[i], cw2.y[i]], {visible:false});
    var b = cw2.board.create('point', 
        [cw2.x[i], cw2.y[i+1]], {visible:false});
    var c = cw2.board.create('point', 
        [cw2.x[i+1], cw2.y[i+1]], {visible:false});
    cw2.board.create('segment',
        [a, b], {color:'black',fixed:true});
    cw2.board.create('segment',
        [b, c], {color:'black',fixed:true});
}