function get_bonuses() {
	ajaxObj = {  
			type: "GET",
			url: "http://194.177.22.217:8080/salesup/api/v1/bonuses/?uuid=14565715370111234&company=bank", 
			contentType:"application/json",
			response:'text',
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			},
			
			success: function(json) { 	
				console.log(json);

				var len = json.bonuses.length;
				var total = 0;
				var challenge = 0;
				var regular = 0;

				if (len != 0) 
					{	
						challenge = json.bonuses.challenge;
						regular = json.bonuses.regular;
						total = challenge + regular;

				document.getElementById("totalbonus").innerHTML = '<div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px">Total</div></div></div><div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px" align="left">' + total+'$</div></div></div>';
				
				document.getElementById("regularbonus").innerHTML = '<div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px">Regular</div></div></div><div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px" align="left">'+regular+'$</div></div></div>';
				
				
				document.getElementById("challengebonus").innerHTML = '<div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px">Challenge</div></div></div><div class="w-col w-col-6 w-col-small-6 w-col-tiny-6"><div class="icon-list highlighted"><div style="font-size: 20px" align="left">'+challenge+'$</div></div></div>';
					}

					var blen = json.benefits.length;
					var benefit = "";
					var cost = 0;
					var count = 0;
					
					if (blen != 0) 
					{
						for (var i = 0; i < blen; i++)
						{
							cost = parseInt(json.benefits[i].cost);
							count = parseInt(json.benefits[i].count);
							
								if (json.benefits[i].status == "new") 
								{
									if ((cost - count) <= 0)
										{
											document.getElementById("benefits").innerHTML += '<div class="w-row"><div class="w-col w-col-3 w-col-small-3 w-col-tiny-3"><h2 class="grey-heading-title" align="center">'+json.benefits[i].cost+'  x  <img src="'+json.benefits[i].icon+'" style="width: 40%"></h2><a class="category-link-small" href="#">You have '+json.benefits[i].count+'</a></div><div class="w-col w-col-1 w-col-small-1 w-col-tiny-1"><h2 class="grey-heading-title" align="center">=</h2></div><div class="w-col w-col-5 w-col-small-5 w-col-tiny-5"><h2 class="grey-heading-title" align="center">'+json.benefits[i].description+'</h2></div><div class="w-col w-col-3 w-col-small-3 w-col-tiny-3" style="padding-left: 5%"><a class="category-link-highlighted" href="#">ACTIVATE</a></div></div>';
										} else
										{
											document.getElementById("benefits").innerHTML += '<div class="w-row"><div class="w-col w-col-3 w-col-small-3 w-col-tiny-3"><h2 class="grey-heading-title" align="center">'+json.benefits[i].cost+'  x  <img src="'+json.benefits[i].icon+'" style="width: 40%"></h2><a class="category-link-small" href="#">You have '+json.benefits[i].count+'</a></div><div class="w-col w-col-1 w-col-small-1 w-col-tiny-1"><h2 class="grey-heading-title" align="center">=</h2></div><div class="w-col w-col-5 w-col-small-5 w-col-tiny-5"><h2 class="grey-heading-title" align="center">'+json.benefits[i].description+'</h2></div><div class="w-col w-col-3 w-col-small-3 w-col-tiny-3" style="padding-left: 5%"><a class="category-link" href="#">Soon</a></div></div>';
										}
										

							}
						
						}
					}
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