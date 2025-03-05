(function() {
    // There are two graph panes
    ctlb = JXG.JSXGraph.initBoard('jsx-pc-controls', 
        {
            boundingbox: [0, 1, 2, 0],
            axis:false,
            showNavigation:false,
            showCopyright: false
        }
    );
    ppb = JXG.JSXGraph.initBoard('jsx-pc-pplane', 
        {
            boundingbox: [-0.25, 1.65, 1.65, -0.25],
            axis:true,
            showNavigation:false
        }
    );
    solnb = JXG.JSXGraph.initBoard('jsx-pc-solutions', 
        {
            boundingbox: [-3, 2, 30.5, -0.5],
            axis:true,
            showNavigation:false
        }
    );

    // Put a slider on the t-axis of the X graph plane
    s_alpha = ctlb.create('slider', [
            [0.05,0.5], [0.65,0.5],
            [0, 0.2, 1]
        ], {name: 'alpha'}
    );
    s_beta = ctlb.create('slider', [
            [1.05,0.5], [1.65,0.5],
            [0, 0.1, 1]
        ], {name: 'beta'}
    );


    f1 = (a, z) => a*(1-a)-a*z;
    f2 = (a, z) => (-s_alpha.Value() + s_beta.Value() * a)*z;
    f = (t, x) => [f1(x[0],x[1]), f2(x[0],x[1])];

    g1 = function(a, z) {
        u = f1(a,z);
        v = f2(a,z);
        return u / Math.sqrt(u*u+v*v);
    }
    g2 = function(a, z) {
        u = f1(a,z);
        v = f2(a,z);
        return v / Math.sqrt(u*u+v*v);
    }

    vf = ppb.create('vectorfield', [
        [g1, g2],
        [0, 25, 1.6],
        [0, 25, 1.6]
    ], {scale: 0.05, color: 'black', arrowhead: {size:3}});
    p0 = ppb.create('point', [1, 1], 
        { name:'(a0, z0)', color: 'blue' }
    );

    data = { t: [], a: [], z: [] };
    traj = ppb.create('curve', [[0], [0]], 
        {strokeColor: 'black', strokeWidth:2}
    )
    traj.updateDataArray = function() {
        mySoln = JXG.Math.Numerics.rungeKutta('rk4',
            [p0.X(), p0.Y()],
            [0, 30], 100, f);
        data.t = [];
        data.a = [];
        data.z = [];
        for (i=0; i<mySoln.length; i++) {
            data.t[i] = 0.3*i;
            data.a[i] = mySoln[i][0];
            data.z[i] = mySoln[i][1];
        }
        this.dataX = data.a;
        this.dataY = data.z;
    }

    a_soln = solnb.create('curve', [[0],[0]],
        { strokeColor: 'blue', strokeWidth: 2}
    );
    a_soln.updateDataArray = function() {
        this.dataX = data.t;
        this.dataY = data.a;
    };

    z_soln = solnb.create('curve', [[0],[0]],
        { strokeColor: 'orange', strokeWidth: 2}
    );
    z_soln.updateDataArray = function() {
        this.dataX = data.t;
        this.dataY = data.z;
    };

    az_legend = solnb.create('legend',
        [22.5,-0.2],
        { labels: ['a','z'], colors: ['blue','orange'], strokeWidth: 2, rowHeight: 12 }
    )

    // Y graph plane and XY plane depend on the glider in X graph plane
    ctlb.addChild(ppb);
    ctlb.addChild(solnb);
    ppb.addChild(solnb);
})();