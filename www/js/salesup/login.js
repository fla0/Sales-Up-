function login(){
	
		var username = document.getElementById("phone").value.replace(/[()-\s+]/g, '');
		var phone = document.getElementById("phone").value;
		var password = document.getElementById("password").value;
		
		if (username == "9037446376" && password == "1")
		{
			//sessvars.username = document.getElementById("phone").value;
			createCookie('username',phone);
			window.location = 'business_6-4.html';
		}
		else {
			document.getElementById("password").value = "";
			document.getElementById("password").style.borderColor = "#FF0000";
			//document.getElementById("password").placeholder = "Неверный пароль";
			return false;
		}
}
