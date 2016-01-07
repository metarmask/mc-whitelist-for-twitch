function switchSection(sectionName) {
	var sections = document.querySelectorAll("body > section");
	for(var i = 0;i < sections.length;i++){
		sections[i].hidden = true;
	}
	document.querySelector("body > section[name=" + sectionName + "]").hidden = false;
}

var loadingLogDiv = document.querySelector("#loadingLog");
function loadingLog(toLog) {
	console.log(toLog);
	var logDiv = document.createElement("div");
	logDiv.innerText = toLog;
	loadingLogDiv.appendChild(logDiv);
}
loadingLog("Huvudskriptet laddat.");
loadingLog("Laddar jQuery...");
var jqueryScript = document.createElement("script");
jqueryScript.src = "https://code.jquery.com/jquery.min.js";
jqueryScript.async = true;
jqueryScript.addEventListener("load",function(){
	loadingLog("jQuery laddat");
	loadingLog("Laddar Twitch API:et");
	var twitchScript = document.createElement("script");
	twitchScript.src = "https://ttv-api.s3.amazonaws.com/twitch.min.js";
	jqueryScript.async = true;
	twitchScript.addEventListener("load",function(){
		loadingLog("Twitch API:et laddat.");
		loadingLog("Väntar på Twitch API:et...");
		Twitch.init({clientId: "q198sirkskt5xem95ag20bisvkgmpdw"}, function(error, status) {
			if(status.authenticated){
				loadingLog("Hämtar användarnamn...");
				Twitch.api({method:"/"},function(error, response){
					if(error){
						// TODO
					}else{
						loadingLog("Fick användarnamn: " + response.user_name);
						loadingLog("Kollar prenumeration...");
						Twitch.api({method:"/users/" + response.user_name + "/subscriptions/stamsite"},function(error, response){
							if(error){
								loadingLog("Du är inte prenumerant");
							}else{
								loadingLog("Du är prenumerant!");
								switchSection("username");
							}
						});
					}
				});
			}else{
				switchSection("connect");
			}
		});
	});
	document.body.appendChild(twitchScript);
});
document.body.appendChild(jqueryScript);

connectWithTwitchButton.addEventListener("click",function(){
	Twitch.login({scope:["user_subscriptions"]});
});