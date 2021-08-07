
var forgot = document.getElementById("fgt");
var sign_in = document.getElementById("sign-in");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputEmailAdressTip = document.getElementById("inputEmailAdressTip");
var inputPasswordTip = document.getElementById("inputPasswordTip");
var dashLink = document.getElementById("dash-link");
var emailKeys = ["@","stu",".ui",".edu",".ng","."];
var logSection=document.getElementById("welcome");
var logImg= document.getElementById("log-img")
var profImg= document.getElementById("prof-img")
var profile = document.getElementById("profile");
var notifications = document.getElementById("notifications");
var events = document.getElementById("events");
var tasks = document.getElementById("tasks");
var settings = document.getElementById("settings");
var dashSection = document.getElementById("dashSection");
// var alluminiSection = document.getElementById("alluminiSection");
var votingSection = document.getElementById("votingSection");
var discussionSection = document.getElementById("discussionSection");
var adminSection = document.getElementById("adminSection");
var sideList= [profile,notifications,events,tasks,settings];
var topList= [dashSection,votingSection,discussionSection,adminSection];
var imgList= ["403105.jpg","9UsWBvm4ScyGW7QOn2yz_20190122-Is-space-time-a-quantum-code-Featured.jpg",
				"12977115_1153710794652906_1138676803864315944_o.jpg","163-1631522_space-time-curvature-wall-paper.jpg",
				"464714_589563021067689_1857773835_o.jpg","912712.jpg","981407_589561937734464_29963629_o.jpg",
				"depositphotos_55976909-stock-photo-advance-of-fractal-realms.jpg","9UsWBvm4ScyGW7QOn2yz_20190122-Is-space-time-a-quantum-code-Featured.jpg",
				"First-Signs-of-Weird-Quantum-Property-of-Empty-Space-750x300-1280x720.jpg","formula-math-mathematics-physics-wallpaper-preview.jpg",
				"howeinsteins.jpg","howstrongisg.jpg","iStock-941621770.jpg","kgWYUo.png","Mysteriously-Shrinking-Proton-Continues-to-Puzzle-Physicists.jpg",
				"N07LKc.png","Plasma_590x300.jpg","Spacetime_I_edit.jpg"];
var imgFlow= document.getElementById("img-flow");
var nt= document.getElementById("next-img");
var pv= document.getElementById("prev-img")
var count=0;
var countKeys=0;
var isKeyPresent=false;
var userIndex;
var detaisSent=false;
forgot.addEventListener("mousedown", function(){
	forgot.style.boxShadow="4px 4px 5px black";
	forgot.style.border="solid #0000ff33 3px";
});
forgot.addEventListener("mouseup", function(){
	forgot.style.boxShadow="";
	forgot.style.border="solid black 0px";
});

inputEmail.value=sessionStorage.getItem("user-email");
inputPassword.value=sessionStorage.getItem("user-password");
inputPasswordTip.style.display="none";
inputEmailAddressTip.style.display="none";

console.log("This is a fresh page");
async function inspectLoginDetails(){
	console.log("inspecting logging");
	// console.log("clicked");
	const opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const response= await fetch("/LoginDetails", opts);
	const LoginDetails = await response.json();
	const userList = await LoginDetails.detailsList;
	userList.forEach (async (user) => {
		
		if (user.SchoolEmail===inputEmail.value && user.Password===inputPassword.value){
			// console.log(user.SchoolEmail);
			// inputEmail.value="";
			// inputPassword.value="";
			sessionStorage.setItem("user-email",inputEmail.value);
			sessionStorage.setItem("user-password",inputPassword.value);
			userIndex=userList.indexOf(user);
			
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			};

			try{
				const response1 = await fetch('/Dash', options);	
				const json = await response1.json();	
				detailsSent = json.sts;
				
				if (detailsSent){
					console.log("yes");
					// window.open('/Dashboard','_self');
					// window.location.href="/Dashboard";

					document.body.style.backgroundImage = "";
					async function loadDashboard(){

						try{
							const opts1 = {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								}
							};
							console.log("started dashboard");
							const response2= await fetch("/NapsDetails", opts1);
							const User = await response2.json();
							const Napsite = await User.details;
							console.log(Napsite);
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
							// spanTag.style.textAlign="center";
							spanTag.style.fontSize="0.7rem";
							console.log(spanTag);
							logSection.appendChild(spanTag);

							dashSection.style.color="black";
							// dashSection.style.color="white";
							dashSection.style.fontWeight="bold";


							function shuffle(array) {
							  var currentIndex = array.length,  randomIndex;
							  while (0 !== currentIndex) {

							    // Pick a remaining element...
							    randomIndex = Math.floor(Math.random() * currentIndex);
							    currentIndex--;

							    // And swap it with the current element.
							    [array[currentIndex], array[randomIndex]] = [
							      array[randomIndex], array[currentIndex]];
							  }

							  return array;
							}
							imgList = shuffle(imgList);

							imgFlow.style.backgroundImage=`url('${imgList[count]}')`;
							// imgFlow.style.backgroundSize=`${imgFlow.offsetWidth.toString()}px ${imgFlow.offsetHeight.toString()}px`;
							// console.log(`${imgFlow.offsetWidth.toString()}`);
							imgFlow.style.backgroundRepeat="no-repeat";
							nt.style.display="none";
							pv.style.display="none";

							function toggleBar (side,viewColor,original){

								side.forEach( (opts) => {

									opts.addEventListener("click", ()=> {

										for (var i=0; i<side.length; i++){

											if (side[i]===opts){

												side[i].style.color=viewColor;
												if (side===sideList){
													topList.forEach((opt) => {
														opt.style.color="#00000099";
													})
												}
												if (side===topList){
													sideList.forEach((opt) => {
														opt.style.color="#999999ff";
													})
												}

											}else{

												side[i].style.color=original;

											}
											
										}
									})
								});

							};
							// 
							toggleBar(sideList,"white","#999999ff");
							toggleBar(topList,"black","#00000099");

							imgFlow.onmouseenter = ()=> {
								
								nt.style.display="block";
								pv.style.display="block";
							}
							
							imgFlow.onmouseleave = ()=> {
								
								nt.style.display="none";
								pv.style.display="none";
							}

							nt.addEventListener("click", ()=> {

								count++;
								if (count>=imgList.length){
									count=0;
								}
								console.log(count);
								imgFlow.style.backgroundImage=`url('${imgList[count]}')`;

							});
							pv.addEventListener("click", ()=> {

								count--;
								if (count<0){
									count=imgList.length-1;
								}
								console.log(count);
								imgFlow.style.backgroundImage=`url('${imgList[count]}')`;

							});

							var stringNapsite = "loggedin";
							sessionStorage.setItem("dash_key", stringNapsite);
							console.log(sessionStorage.getItem("dash_key"));

							logSection.addEventListener("click", () => {
								
								sessionStorage.removeItem("user-email");
								sessionStorage.removeItem("user-password");
								sessionStorage.removeItem("dash_key");
								console.log(sessionStorage.getItem("dash_key"));
								if (sessionStorage.getItem("dash_key")===null){
									console.log("yes");
									window.open("/NapsPage","_self");
								}
								
							});
							
						}catch(TypeError){

						}

						
					}
					loadDashboard();
					signPage.style.display="none";
			       	dashPage.style.display= "block"; 
				
				}else{

					throw (TypeError);
				}
			}catch (TypeError){
				
				
			}
		}else{


		}
	});
	
	
}
sign_in.addEventListener("click", async () => {

	if(inputEmail.value==="" && inputPassword.value!="") {
	
		inputEmailAddressTip.style.display="flex";
		inputEmailAddressTip.innerHTML="Please fill in this field!";

	}else if(inputEmail.value!="" && inputPassword.value==="") {
		
		inputPasswordTip.style.display="flex";
		inputPasswordTip.innerHTML="Please fill in this field!";

	}else if(inputEmail.value==="" && inputPassword.value==="") {
		
		inputEmailAddressTip.style.display="flex";
		inputEmailAddressTip.innerHTML="Please fill in this field!";
		inputPasswordTip.style.display="flex";
		inputPasswordTip.innerHTML="Please fill in this field!";

	}else{

		await inspectLoginDetails().then( ()=> {
			
		});
	
	}

});

inspectLoginDetails();
inputPassword.addEventListener("input", () =>{
	
	if (inputPassword.value!=""){

		inputPasswordTip.style.display="none";
		inputPasswordTip.innerHTML="";

	}else{

		inputPasswordTip.style.display="flex";
		inputPasswordTip.innerHTML="Please fill in this field!";

	}
});

inputEmail.addEventListener("input", () =>{
	// countKeys=0;
	if (inputEmail.value!=""){
		countKeys=0;
		emailKeys.forEach( (keys) => {

			if (inputEmail.value.includes(keys)){

				countKeys++;
				isKeyPresent=true;
				// console.log(countKeys)
			}
			else{

				countKeys--;
				isKeyPresent=false;
				// console.log(countKeys)
			}
		})

		if (isKeyPresent===true && countKeys===emailKeys.length && inputEmail.value.slice(-2)==="ng"){

			inputEmailAddressTip.style.display="none";
			inputEmailAddressTip.innerHTML="";

		}

		else {

			inputEmailAddressTip.style.display="flex";
			inputEmailAddressTip.innerHTML="Please enter a valid email address!, must contain @, ., stu, ui, edu, ng";
		}
		
	}else{

		inputEmailAddressTip.style.display="flex";
		inputEmailAddressTip.innerHTML="Please fill in this field!";

	}
});



