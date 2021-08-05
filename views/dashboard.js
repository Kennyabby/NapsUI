
var logSection=document.getElementById("welcome");
var profile = document.getElementById("profile");
var notifications = document.getElementById("notifications");
var events = document.getElementById("events");
var tasks = document.getElementById("tasks");
var settings = document.getElementById("settings");
var dashSection = document.getElementById("dashSection");
var alluminiSection = document.getElementById("alluminiSection");
var votingSection = document.getElementById("profile");
var discussionSection = document.getElementById("profile");
var adminSection = document.getElementById("profile");

async function loadDashboard(){
	try{

		console.log("loading dashboard");
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		const response= await fetch("/NapsDetails", opts);
		const User = await response.json();
		const Napsite = await User.details;
		console.log("got user details");
		
		await console.log(Napsite);

		var spanTag = document.createElement("span");
		// spanTag.appendChild(document.createTextNode(`${Napsite.LastName} ${Napsite.FirstName} ${Napsite.MiddleName}`));
		spanTag.appendChild(document.createTextNode(`${Napsite.UserName}`));
		spanTag.style.fontWeight="bold";
		logSection.appendChild(spanTag);
	}catch(TypeError){

	}
	
}
loadDashboard();