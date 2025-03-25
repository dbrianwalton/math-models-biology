(function() {
    // There are two graph panes
    ctlb = JXG.JSXGraph.initBoard('jsx-bif-pp-controls', 
        {
            boundingbox: [0, 1, 2, 0],
            axis:false,
            showNavigation:false,
            showCopyright: false
        }
    );
    ppb = JXG.JSXGraph.initBoard('jsx-bif-pp-pplane', 
        {
            boundingbox: [-0.25, 2.65, 2.65, -0.25],
            axis:true,
            showNavigation:false
        }
    );
    solnb = JXG.JSXGraph.initBoard('jsx-bif-pp-solutions', 
        {
            boundingbox: [-3, 3, 50.5, -0.5],
            axis:true,
            showNavigation:false
        }
    );

    // Put a slider on the t-axis of the X graph plane
    s_lambda = ctlb.create('slider', [
            [0.05,0.5], [0.65,0.5],
            [0, 0.2, 1.5]
        ], {name: '𝝀 / r_F'}
    );
    s_mu = ctlb.create('slider', [
        [1.05,0.5], [1.65,0.5],
        [0, 0.2, 1.5]
    ], {name: '𝝁 / r_S'}
);

    rs = .5;
    Cf = 1;
    Cs = 1;

    f1 = (F, S) => F*(1-S/Cs-s_lambda.Value());
    f2 = (F, S) => rs*S*(-1+F/Cf-s_mu.Value());
    f = (t, x) => [f1(x[0],x[1]), f2(x[0],x[1])];

    g1 = function(F, S) {
        u = f1(F,S);
        v = f2(F,S);
        return u / Math.sqrt(u*u+v*v);
    }
    g2 = function(F, S) {
        u = f1(F,S);
        v = f2(F,S);
        return v / Math.sqrt(u*u+v*v);
    }

    vf = ppb.create('vectorfield', [
        [g1, g2],
        [0, 31, 2.6],
        [0, 31, 2.6]
    ], {scale: 0.05, color: 'black', arrowhead: {size:3}});
    p0 = ppb.create('point', [0.4, 0.4], 
        { name:'(F0, S0)', color: 'blue' }
    );
    // F Nullclines
    ncf1 = ppb.create('line',
        [[0,0], [0,1]],
        { strokeColor:'blue', strokeWidth:2, dash:3}
    )
    ncf2 = ppb.create('line',
        [
            [0,function(){return Cs*(1-s_lambda.Value())}], 
            [1,function(){return Cs*(1-s_lambda.Value())}]
        ],
        { strokeColor:'blue', strokeWidth:2, dash:3}
    )
    // S Nullclines
    ncs1 = ppb.create('line',
        [[0,0], [1,0]],
        { strokeColor:'orange', strokeWidth:2, dash:3}
    )
    ncs2 = ppb.create('line', 
        [
            [function(){return Cf*(1+s_mu.Value())}, 0],
            [function(){return Cf*(1+s_mu.Value())}, 1]
        ],
        { strokeColor:'orange', strokeWidth:2, dash:3}
    )

    data = { t: [], F: [], S: [] };
    traj = ppb.create('curve', [[0], [0]], 
        {strokeColor: 'black', strokeWidth:2}
    )
    traj.updateDataArray = function() {
        mySoln = JXG.Math.Numerics.rungeKutta('rk4',
            [p0.X(), p0.Y()],
            [0, 50], 200, f);
        data.t = [];
        data.F = [];
        data.S = [];
        for (i=0; i<mySoln.length; i++) {
            data.t[i] = 0.3*i;
            data.F[i] = mySoln[i][0];
            data.S[i] = mySoln[i][1];
        }
        this.dataX = data.F;
        this.dataY = data.S;
    }

    F_soln = solnb.create('curve', [[0],[0]],
        { strokeColor: 'blue', strokeWidth: 2}
    );
    F_soln.updateDataArray = function() {
        this.dataX = data.t;
        this.dataY = data.F;
    };

    S_soln = solnb.create('curve', [[0],[0]],
        { strokeColor: 'orange', strokeWidth: 2}
    );
    S_soln.updateDataArray = function() {
        this.dataX = data.t;
        this.dataY = data.S;
    };

    FS_legend = solnb.create('legend',
        [22.5,-0.2],
        { labels: ['F','S'], colors: ['blue','orange'], strokeWidth: 2, rowHeight: 12 }
    )

    // Y graph plane and XY plane depend on the glider in X graph plane
    ctlb.addChild(ppb);
    ctlb.addChild(solnb);
    ppb.addChild(solnb);
})();