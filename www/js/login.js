function access() {

	ajaxObj = ({  
			type: "GET",
			url: "http://binaryworkscloud.cloudapp.net:8080/smarthome/api/v1/temperature/?sensor=outside",  
			contentType:"application/json",
			response:'text',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
		    
			success: function(json) { 
				console.log(json);
				var temperature = jQuery(json.outside).attr('temperature');
				var tdate = jQuery(json.outside).attr('date');
				var utcDate = new Date(parseFloat(tdate *1000));
				var responseDate = moment(utcDate).format('LLL');
				document.getElementById("status-field").innerHTML = temperature + " " + '\u2103';
				document.getElementById("date-field").innerHTML = responseDate;
				
			},
			
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		});
		
	return $.ajax(ajaxObj);
}