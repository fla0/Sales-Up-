function report_registrations() {
          var data_string = '[{ key: "Registrations per last 7 days", values: '  + '[{"x": 1430150400000,"y": 1},{"x": 1430236800000,"y": 8},{"x": 1430323200000,"y": 10},{"x": 1430409600000,"y": 18},{"x": 1430496000000,"y": 25},{"x": 1430582400000,"y": 28},{"x": 1430668800000,"y": 31}]' + ', "area": true }]';
           var myobj = eval("("+data_string+")");
           ticks = [];
           var len = json.length;
				for (var i = 0; i < len;) {
				    ticks.push(json[i].x);
				    i = i + 2;
				}
           chart.xAxis
           		.tickValues(ticks)
		   		.tickFormat(function(d) {
					return d3.time.format('%a')(new Date(d))
            	});
		   d3.select('.widget-4-chart svg').datum(myobj).transition().duration(500).call(chart);
		   chart.update();
}