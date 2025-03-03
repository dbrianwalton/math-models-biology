(function() {
    x_graph_b = JXG.JSXGraph.initBoard('jsx-circle-ppf-graph_X', 
        {
            boundingbox: [-0.5, 1.25, 3.1*Math.PI, -1.25],
            axis:true,
            showNavigation:false
        }
    );
    y_graph_b = JXG.JSXGraph.initBoard('jsx-circle-ppf-graph_Y', 
        {
            boundingbox: [-0.5, 1.25, 3.1*Math.PI, -1.25],
            axis:true,
            showNavigation:false
        }
    );
    pp_graph_b = JXG.JSXGraph.initBoard('jsx-circle-phase-plane-field', 
        {
            boundingbox: [-2.25, 2.25, 2.25, -2.25],
            axis:true,
            showNavigation:false
        }
    );
    eps = 0.15;
    pp_vecfield = pp_graph_b.create('vectorfield', [
            [(x,y) => -eps*y, (x,y) => eps*x],
            [-2.25, 17, 2.25],
            [-2.25, 17, 2.25]
        ],
        {strokeWidth: 1}
    );
    pp_initial_point = pp_graph_b.create('point', [1,0],
        {name: '(x0,y0)'}
    );
    pp_solution_circle = pp_graph_b.create('circle', [[0,0], pp_initial_point]);

    t_axis = x_graph_b.create('line', [[0,0], [1,0]], {visible:false});
    t_glider = x_graph_b.create('glider', [0, 0, t_axis], 
        { name:'t', color: 'black' }
    );

    x_a_pt = x_graph_b.create('point',
        [0, function(){ return pp_initial_point.X(); }],
        {size: 1, color:'blue', name: 'a'}
    );
    x_curve = x_graph_b.create('functiongraph', 
        [
            function(t) {
                a = pp_initial_point.X();
                b = pp_initial_point.Y();
                radius = Math.sqrt(a*a+b*b);
                if (a > 0) {
                    phase = Math.atan(b/a);
                } else if (a < 0) {
                    phase = Math.atan(b/a) + Math.PI;
                } else if (b > 0) {
                    phase = Math.PI/2;
                } else if (b < 0) {
                    phase = -Math.PI/2;
                } else {
                    phase = 0;
                }
                return radius * Math.cos(t + phase);
            }, 
            -1, 3*Math.PI+1
        ], {strokeWidth:2}
    );
    x_t_line = x_graph_b.create('line', 
        [t_glider, [function(){return t_glider.X();}, 1]],
        { strokeWidth: 1, color: 'black' }
    );
    xt_point = x_graph_b.create('intersection', [x_curve, x_t_line],
        {color:'blue', name: '', size: 1}
    );
    x_tan_pt = x_graph_b.create('point',
        [
            function() { 
                var t = xt_point.X();
                return (t + 1);
            },
            function() { 
                var t = xt_point.X();
                a = pp_initial_point.X();
                b = pp_initial_point.Y();
                radius = Math.sqrt(a*a+b*b);
                if (a > 0) {
                    phase = Math.atan(b/a);
                } else if (a < 0) {
                    phase = Math.atan(b/a) + Math.PI;
                } else if (b > 0) {
                    phase = Math.PI/2;
                } else if (b < 0) {
                    phase = -Math.PI/2;
                } else {
                    phase = 0;
                }
                return (xt_point.Y() - radius * Math.sin(t+phase));
            }
        ],
        {name: '', color: 'blue', size: 1}
    );
    xt_tangent = x_graph_b.create('line', [xt_point, x_tan_pt],
        {strokeColor: 'black', dash: 1, strokeWidth: 1}
    );

    y_b_pt = y_graph_b.create('point',
        [0, function(){ return pp_initial_point.Y(); }],
        {size: 1, color:'orange', name: 'b'}
    );
    y_curve = y_graph_b.create('functiongraph', 
        [
            function(t) {
                a = pp_initial_point.X();
                b = pp_initial_point.Y();
                radius = Math.sqrt(a*a+b*b);
                if (a > 0) {
                    phase = Math.atan(b/a);
                } else if (a < 0) {
                    phase = Math.atan(b/a) + Math.PI;
                } else if (b > 0) {
                    phase = Math.PI/2;
                } else if (b < 0) {
                    phase = -Math.PI/2;
                } else {
                    phase = 0;
                }
                return radius * Math.sin(t + phase);
            }, 
            -1, 3*Math.PI+1
        ], {strokeColor: 'orange', strokeWidth:2}
    );
    y_t_line = y_graph_b.create('line', 
        [[function(){return t_glider.X();}, 0], [function(){return t_glider.X();}, 1]],
        { strokeWidth: 1, color: 'black' }
    );
    yt_point = y_graph_b.create('intersection', [y_curve, y_t_line],
        {color:'orange', name: '', size: 1}
    );
    y_tan_pt = y_graph_b.create('point',
        [
            function() { 
                var t = yt_point.X();
                return (t + 1);
            },
            function() { 
                var t = yt_point.X();
                a = pp_initial_point.X();
                b = pp_initial_point.Y();
                radius = Math.sqrt(a*a+b*b);
                if (a > 0) {
                    phase = Math.atan(b/a);
                } else if (a < 0) {
                    phase = Math.atan(b/a) + Math.PI;
                } else if (b > 0) {
                    phase = Math.PI/2;
                } else if (b < 0) {
                    phase = -Math.PI/2;
                } else {
                    phase = 0;
                }
                return (yt_point.Y() + radius * Math.cos(t+phase));
            }
        ],
        {name: '', color: 'orange', size: 1}
    );
    yt_tangent = y_graph_b.create('line', [yt_point, y_tan_pt],
        {strokeColor: 'black', dash: 1, strokeWidth: 1}
    );

    pp_xy = pp_graph_b.create('point', 
        [function() {return xt_point.Y();}, function() {return yt_point.Y();}],
        {color: 'black', name: '(X(t),Y(t))', size: 1}
    );
    pp_xyt = pp_graph_b.create('point', 
        [function() {return x_tan_pt.Y();}, function() {return y_tan_pt.Y();}],
        {color: 'black', name: '', size: 1}
    );
    pp_tangent = pp_graph_b.create('arrow', [pp_xy, pp_xyt]);

    pp_graph_b.addChild(x_graph_b);
    pp_graph_b.addChild(y_graph_b);
    x_graph_b.addChild(y_graph_b);
    x_graph_b.addChild(pp_graph_b);

})();