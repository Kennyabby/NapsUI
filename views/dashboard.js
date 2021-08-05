
var welcomeMessage = document.getElementById("welcome");
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

		welcomeMessage.innerHTML=`Welcome to Naps Dashboard Dear ${Napsite.LastName} ${Napsite.FirstName} ${Napsite.MiddleName} with Matric No ${Napsite.MatricNo}`;
	}catch(TypeError){
		
	}
	
}
loadDashboard();