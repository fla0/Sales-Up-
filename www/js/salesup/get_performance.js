function update_chart_days_performance(){
		ajaxObj = {  
			type: "GET",
			url: "http://194.177.22.217:8080/salesup/api/v1/performance/?uuid=14565715370111234&company=bank", 
			contentType:"application/json",
			response:'text',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			
			success: function(json) { 	
				console.log(json);
				//UPDATING GRAPH
					  var qty = 0;
					  var amt = 0;

			           keyValue = JSON.stringify(json.performance.day.quantity);
			           data_string = '[{ key: "Performance", values: '  + keyValue + ', "area": true }]';
			           var myobj = eval("("+data_string+")");
			           data = myobj;
			           chart.xAxis
			           		.tickValues([1, 2, 3, 4, 5, 6, 7])
					   		.tickFormat(function(d, i) {
					   			return ['', '9', '11', '13', '15', '17', '19', '21'][d];
			        	});
					   d3.select('.widget-4-chart svg').datum(data).transition().duration(500).call(chart);
					   chart.update();
			//COMPLETED
			},
			
			error: function(json) { 	
				console.log(json);

			},
			
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}