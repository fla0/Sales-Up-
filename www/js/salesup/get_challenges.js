function get_challenges() {
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
									completedchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted_completed" style="font-size: 24px"><div class="icon ion-ios-flag" id='+json.challenges[i].challenge_code+'></div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div class="highlighted" style="font-size: 12px; padding-top: 3%">'+json.challenges[i].description+'</div></div></div>';
								} else if (json.challenges[i].status == "accepted") 
								{
									acceptedchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted"><div style="font-size: 12px">'+json.challenges[i].completion+'%</div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div style="font-size: 12px; padding-top: 3%" >'+json.challenges[i].description+'</div></div></div>';
								} else if (json.challenges[i].status == "new")
								{
									newchallenges += '<div class="w-row"><div class="w-col w-col-2 w-col-small-2 w-col-tiny-2"><div class="icon-list highlighted"><div class="icon ion-ios-information-empty" onclick="activate('+"'"+json.challenges[i].challenge_code+"'"+'); return false;" id='+json.challenges[i].challenge_code+'></div></div></div><div class="w-col w-col-10 w-col-small-10 w-col-tiny-10"><div style="font-size: 12px; padding-top: 3%" >'+json.challenges[i].description+'</div></div></div>';
								}
								
							}
					}
				document.getElementById("newchallenges").innerHTML = newchallenges;
				document.getElementById("activatedchallenges").innerHTML = acceptedchallenges;
				document.getElementById("completedchallenges").innerHTML = completedchallenges;


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