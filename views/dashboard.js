
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
async function loadDashboard(){

	console.log(imgList.length);
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
		// spanTag.style.textAlign="center";
		spanTag.style.fontSize="0.7rem";
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
		nt.style.display="none";
		pv.style.display="none";

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

		
	}catch(TypeError){

	}

	
}
loadDashboard();