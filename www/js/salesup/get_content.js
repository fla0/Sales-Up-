function get_content() {
	ajaxObj = {  
			type: "GET",
			url: "http://194.177.22.217:8080/salesup/api/v1/content/?uuid=14565715370111234&company=bank", 
			contentType:"application/json",
			response:'text',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			
			success: function(json) { 	
				console.log(json);
				
//UPDATING PROFILE INFORMATION	

			var name = json.profile.name;
			var surname = json.profile.surname;
			var rank_top = json.profile.rank_top;
			var rank_region = json.profile.rank_region;
			var message = json.profile.message;
				document.getElementById("name_surname").innerHTML = name + " " + surname;
				document.getElementById("message").innerHTML = message;
				document.getElementById("rank_region").innerHTML = "#" + rank_region;
				document.getElementById("rank_top").innerHTML = "#" + rank_top;	
					
//COMPLETED
					
//UPDATING PERFORMANCE
//
//COMPLETED

//UPDATING CHALLENGES		
//					var len = json.challenges.length;
//					var newchallenges = "";
//					var oldchallenges = document.getElementById("challenges").innerHTML;
//						if (len != 0) 
//						{	
//							for (var i = 0; i < len; i++) 
//								{
//								  newchallenges += '<li class="list-item highlighted" data-ix="list-item"><a class="w-clearfix w-inline-block tooltip" href="#" title="ACTIVATE" id="newchallenge"><div class="icon-list "><div class="icon ion-ios-information-empty"></div></div><div style="font-size: 12px; padding-top: 3%">'+json.challenges[i].description+'</div></a></li>';
//								}
//						}
//				document.getElementById("challenges").innerHTML = newchallenges + oldchallenges ;
//COMPLETED

				var len = json.challenges.length;
				var newchallenges = "";
				var acceptedchallenges = "";
				var completedchallenges = "";
				if (len != 0) 
					{	
						for (var i = 0; i < len; i++) 
							{
								if (json.challenges[i].status == "completed") 
								{
									completedchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted_completed" style="font-size: 24px"><div class="icon ion-ios-flag" id='+json.challenges[i].challenge_code+'></div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div class="highlighted" style="font-size: 12px; padding-top: 3%" >'+json.challenges[i].description+'</div></div></div>';
								} else if (json.challenges[i].status == "accepted") 
								{
									acceptedchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted"><div class="icon ion-ios-checkmark-empty" id='+json.challenges[i].challenge_code+'></div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div style="font-size: 12px; padding-top: 3%" >'+json.challenges[i].description+'</div></div></div>';
								} else if (json.challenges[i].status == "new")
								{
									newchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted"><div class="icon ion-ios-information-empty" onclick="activate('+"'"+json.challenges[i].challenge_code+"'"+'); return false;" id='+json.challenges[i].challenge_code+'></div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div style="font-size: 12px; padding-top: 3%" >'+json.challenges[i].description+'</div></div></div>';
								}
								
							}
					}
				document.getElementById("challenges").innerHTML = newchallenges + acceptedchallenges + completedchallenges;

//UPDATING ACHIEVEMENTS	
				
				var len = json.achievements.length;
					var newachievements = "";
					var oldachievements = document.getElementById("achievements").innerHTML;
						if (len != 0) 
						{	
							for (var i = 0; i < len; i++) 
								{
								  newachievements += '<div class="w-col w-col-3 w-col-small-3 w-col-tiny-3"><img src="'+ json.achievements[i].icon+'" style="width:auto; height:auto; padding-top: 10%; padding-left: 10px; padding-right: 10px"></div>';
								}
						}
				document.getElementById("achievements").innerHTML = newachievements + oldachievements ;
					
//COMPLETED

//UPDATING GRAPH
           update_chart_days();
//COMPLETED
			},
			
			error: function(json) { 	
				console.log(json);
					document.getElementById("message").innerHTML = "Please check your internet connection";
					document.getElementById("rank_region").innerHTML = "#–";
					document.getElementById("rank_top").innerHTML = "#–";
			},
			
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}




function activate(challenge)
{
	document.getElementById(challenge).className = "icon ion-ios-checkmark-empty";
	accept_challenge(challenge);
}




function update_chart_days(){
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
					  var len = json.performance.day.quantity.length;
					  var lenamt = json.performance.day.amount.length;
					  if (len != 0) 
						{	
							for (var i = 0; i < len; i++) 
								{
									qty = qty + json.performance.day.quantity[i].y;
								}
						}
					 document.getElementById("qty").innerHTML = "QTY: "+ qty;
					 
					 if (lenamt != 0) 
						{	
							for (var i = 0; i < lenamt; i++) 
								{
									amt = amt + json.performance.day.amount[i].y;
								}
						}
					 document.getElementById("amt").innerHTML = "AMT: "+ amt+"$";
						
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
					document.getElementById("message").innerHTML = "Please check your internet connection";
					document.getElementById("rank_region").innerHTML = "#–";
					document.getElementById("rank_top").innerHTML = "#–";
			},
			
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}



function accept_challenge(challenge) {
		
	ajaxObj = {  
			type: "POST",
			url: "http://194.177.22.217:8080/salesup/api/v1/challenges/update", 
			contentType:"application/json",
			response:'text',
			data: "{\"uuid\":\"14565715370111234\",\"company\":\"bank\",\"status\":\"accepted\",\"challenge\":\""+challenge+"\"}",
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			
			success: function(json) { 
				
				console.log(json);
				var enroll = jQuery(json).attr('result');
			 // alert(data);
				
			},
			
			complete: function(XMLHttpRequest) {
				//console.log( XMLHttpRequest.getAllResponseHeaders() );
			}, 
			dataType: "json" //request JSON
		};
		
	return $.ajax(ajaxObj);
}