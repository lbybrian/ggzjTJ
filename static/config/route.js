const RouteConfig = {
    admin: [{
            component: "main/basic",
            path: "/",
            children: [{
                component: "modules/about/introduce",
                path: "/",
            }, {
                component: "app/example",
                path: "/example",
            }, {
                component: "common/map3d",
                path: "/map3dItem",
            }]
        },
        {
            component: "main/about",
            path: "/about",
            children: [{
                    component: "modules/about/introduce",
                    path: "/about",
                }, {
                    component: "modules/about/dataTable",
                    path: "/about/dataTable",
                }, {
                    component: "modules/about/relationship",
                    path: "/about/relationship",
                }, {
                    component: "modules/about/formInfo",
                    path: "/about/formInfo",
                }, {
                    component: "modules/about/menuItem",
                    path: "/about/menuItem",
                }, {
                    component: "modules/about/gallery",
                    path: "/about/gallery",
                }, {
                    component: "modules/about/chart/barChart",
                    path: "/about/barChart",
                }, {
                    component: "modules/about/chart/lineChart",
                    path: "/about/lineChart",
                }, {
                    component: "modules/about/chart/custormChart",
                    path: "/about/customChart",
                }, {
                    component: "modules/about/chart/scatterChart",
                    path: "/about/scatterChart",
                }, {
                    component: "modules/about/chart/pieChart",
                    path: "/about/pieChart",
                }, {
                    component: "modules/about/chart/gaugeChart",
                    path: "/about/gaugeChart",
                }, {
                    component: "modules/about/chart/radarChart",
                    path: "/about/radarChart",
                }, {
                    component: "modules/about/chart/funnelChart",
                    path: "/about/funnelChart",
                }, {
                    component: "modules/about/chart/radarChart",
                    path: "/about/radarChart",
                }, {
                    component: "modules/about/chart/treeChart",
                    path: "/about/treeChart",
                }, {
                    component: "modules/about/flowChart",
                    path: "/about/flowChart",
                }, {
                    component: "modules/about/arcChart",
                    path: "/about/arcChart",
                }, {
                    component: "modules/about/wordCloud",
                    path: "/about/wordCloud",
                }, {
                    component: "modules/about/mapBox",
                    path: "/about/mapBox",
                }, {
                    component: "modules/about/tree",
                    path: "/about/tree",
                }, {
                    component: "modules/about/sanKey",
                    path: "/about/sanKey",
                },
                {
                    component: "modules/about/olGisMap",
                    path: "/about/olGisMap",
                }, {
                    component: "common/tree",
                    path: "/tree",
                }, {
                    component: "modules/about/timeLine",
                    path: "/about/timeLine",
                }, {
                    component: "app/example",
                    path: "/about/example",
                }, {
                    component: "modules/about/heatMap",
                    path: "/about/heatMap",
                }, {
                    component: "modules/about/calendarHeatMap",
                    path: "/about/calendarHeatMap",
                }, {
                    component: "modules/about/sunburst",
                    path: "/about/sunburst",
                }, {
                    component: "modules/about/boxPlot",
                    path: "/about/boxPlot",
                },
                {
                    component: "modules/about/parallel",
                    path: "/about/parallel",
                },
                {
                    component: "modules/about/chart/mixChart",
                    path: "/about/mixChart",
                },
                {
                    component: "modules/about/scatterPlot",
                    path: "/about/scatterPlot",
                },
                
            ]
        },
        {
            component: "main/index",
            path: "/app",
            children: [{
                component: "app/example",
                path: "/app/example",
            }]
        }
    ]
}