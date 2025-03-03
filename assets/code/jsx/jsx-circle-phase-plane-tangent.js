(function() {
    x_graph_b = JXG.JSXGraph.initBoard('jsx-circle-ppt-graph_X', 
        {
            boundingbox: [-0.5, 1.25, 3.1*Math.PI, -1.25],
            axis:true,
            showNavigation:false
        }
    );
    y_graph_b = JXG.JSXGraph.initBoard('jsx-circle-ppt-graph_Y', 
        {
            boundingbox: [-0.5, 1.25, 3.1*Math.PI, -1.25],
            axis:true,
            showNavigation:false
        }
    );
    pp_graph_b = JXG.JSXGraph.initBoard('jsx-circle-phase-plane-tangent', 
        {
            boundingbox: [-2.25, 2.25, 2.25, -2.25],
            axis:true,
            showNavigation:false
        }
    );
    eps = 1;

    t_axis = x_graph_b.create('line', [[0,0], [1,0]], {visible:false});
    t_glider = x_graph_b.create('glider', [0, 0, t_axis], 
        { name:'t', color: 'black' }
    );

    x_curve = x_graph_b.create('functiongraph', 
        [function(t){ return Math.cos(t); }, -1, 3*Math.PI+1], {strokeWidth:2}
    );
    x_t_line = x_graph_b.create('line', 
        [t_glider, [function(){return t_glider.X();}, 1]],
        { strokeWidth: 1, color: 'black' }
    );
    xt_point = x_graph_b.create('intersection', [x_curve, x_t_line],
        {color:'blue', name: ''}
    );
    x_tan_pt = x_graph_b.create('point',
        [
            function() { 
                var t = xt_point.X();
                return (t + eps);
            },
            function() { 
                var t = xt_point.X();
                return (xt_point.Y() - eps * Math.sin(t));
            }
        ],
        {name: '', color: 'blue', size: 1}
    );
    xt_tangent = x_graph_b.create('line', [xt_point, x_tan_pt],
        {strokeColor: 'black', dash: 1, strokeWidth: 1}
    );
    x_point = x_graph_b.create('point', [0, function(){ return xt_point.Y(); }],
        {color:'blue', name: 'X'}
    );
    x_graph_b.create('line', [xt_point, x_point],
        {color: 'blue', dash: 2, strokeWidth: 1}
    );

    y_curve = y_graph_b.create('functiongraph', 
        [function(t){ return Math.sin(t); }, -1, 3*Math.PI+1],
        { strokeColor: 'orange', strokeWidth: 2 }
    );
    y_t_line = y_graph_b.create('line', 
        [[function(){return t_glider.X();}, 0], [function(){return t_glider.X();}, 1]],
        { strokeWidth: 1, color: 'black' }
    );
    yt_point = y_graph_b.create('intersection', [y_curve, y_t_line],
        {color:'orange', name: ''}
    );
    y_tan_pt = y_graph_b.create('point',
        [
            function() { 
                var t = yt_point.X();
                return (t + eps);
            },
            function() { 
                var t = yt_point.X();
                return (yt_point.Y() + eps * Math.cos(t));
            }
        ],
        {name: '', color: 'orange', size: 1}
    );
    yt_tangent = y_graph_b.create('line', [yt_point, y_tan_pt],
        {strokeColor: 'black', dash: 1, strokeWidth: 1}
    );
    y_point = y_graph_b.create('point', [0, function(){ return yt_point.Y(); }],
        {color:'orange', name: ''}
    );
    y_graph_b.create('line', [yt_point, y_point],
        {color: 'orange', dash: 2, strokeWidth: 1}
    );

    pp_unitcircle = pp_graph_b.create('circle', [[0,0], 1],
        { dash: 1, strokeColor: 'black', fixed: true }
    );
    pp_x = pp_graph_b.create('point', [function() {return x_point.Y();}, 0],
        {color: 'blue', name: '', size: 2}
    );
    pp_y = pp_graph_b.create('point', [0, function() {return y_point.Y();}],
        {color: 'orange', name: '', size: 2}
    );
    pp_xy = pp_graph_b.create('point', 
        [function() {return x_point.Y();}, function() {return y_point.Y();}],
        {color: 'black', name: '(X(t),Y(t))'}
    );
    pp_xyt = pp_graph_b.create('point', 
        [function() {return x_tan_pt.Y();}, function() {return y_tan_pt.Y();}],
        {color: 'black', name: '', size: 1}
    );
    pp_tangent = pp_graph_b.create('arrow', [pp_xy, pp_xyt]);


    x_graph_b.addChild(y_graph_b);
    x_graph_b.addChild(pp_graph_b);

    })();