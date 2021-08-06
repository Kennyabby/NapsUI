
var logSection=document.getElementById("welcome");
var logImg= document.getElementById("log-img")
var profImg= document.getElementById("prof-img")
var profile = document.getElementById("profile");
var notifications = document.getElementById("notifications");
var events = document.getElementById("events");
var tasks = document.getElementById("tasks");
var settings = document.getElementById("settings");
var dashSection = document.getElementById("dashSection");
var alluminiSection = document.getElementById("alluminiSection");
var votingSection = document.getElementById("votingSection");
var discussionSection = document.getElementById("discussionSection");
var adminSection = document.getElementById("adminSection");
var sideList= [profile,notifications,events,tasks,settings];
var topList= [dashSection,alluminiSection,votingSection,discussionSection,adminSection];

async function loadDashboard(){
	try{
		const opts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response= await fetch("/NapsDetails", opts);
		const User = await response.json();
		const Napsite = await User.details;

		if (Napsite.Gender==="Male") {

			logImg.src="male-profile.png";

		}else if(Napsite.Gender==="Female") {

			logImg.src="female-profile.jpg";

		}else{

			logImg.src="male-profile.png";

		}

		profImg.src="profile-img.png"
		var spanTag = document.createElement("p");
		// spanTag.appendChild(document.createTextNode(`${Napsite.LastName} ${Napsite.FirstName} ${Napsite.MiddleName}`));
		spanTag.appendChild(document.createTextNode(`${Napsite.UserName}`));
		spanTag.style.fontWeight="bold";
		spanTag.style.padding="0px";
		spanTag.style.margin="0px";
		spanTag.style.fontStyle="italic"
		spanTag.style.textAlign="center";
		spanTag.style.fontSize="0.6rem";
		logSection.appendChild(spanTag);

		dashSection.style.color="black";
		dashSection.style.fontWeight="bold";


		function toggleBar (side,viewColor,original){

			side.forEach( (opts) => {

				opts.addEventListener("click", ()=> {

					for (var i=0; i<side.length; i++){

						if (side[i]===opts){

							side[i].style.color=viewColor;

						}else{

							side[i].style.color=original;

						}
						
					}
				})
			});

		};

		toggleBar(sideList,"white","#999999ff");
		toggleBar(topList,"black","#00000099");

	}catch(TypeError){

	}
	
}
loadDashboard();