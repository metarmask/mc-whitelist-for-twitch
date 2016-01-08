function loadingLoad() {
	console.log(toLog);
	var logDiv = document.createElement("div");
	logDiv.innerText = toLog;
	document.body.appendChild(logDiv);
}

generateButton.addEventListener("click",function(){
	this.disabled = true;
});