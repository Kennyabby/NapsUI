
var navbar = document.getElementById("main-nav");
var tops = document.getElementById("text-top");
var nav = document.getElementsByClassName("top-nav");
var options = document.createElement("img");
var home = document.getElementById("home");
var event = document.getElementById("event");
var about = document.getElementById("about");
var signin = document.getElementById("signin");
var first = document.getElementById("ones");
var second = document.getElementById("push");
var isWidthChanged=false, isOptionsClicked=false;


options.className="options";
options.src="options.jpg";

function widthChangeEffect(x){
	if (x.matches){

		nav[0].style.backgroundColor="#22222233"
		navbar.removeChild(first);
		navbar.removeChild(second);
		navbar.appendChild(options);
		tops.style.display="block";
		isWidthChanged=true;
	}	
	else{
		if (isWidthChanged===true){
			tops.style.display="none";
			nav[0].style.backgroundColor="#22222288"
			navbar.removeChild(options);
			backToDefault();
			navbar.appendChild(first);
			navbar.appendChild(second);

			
		}
		
	}
}


var x = window.matchMedia("(max-width: 850px)");

widthChangeEffect(x);
x.addListener(widthChangeEffect);
var ul = document.querySelector("ul");

function backToDefault(){
	if (isOptionsClicked===true){
		navbar.removeChild(home);
		navbar.removeChild(signin);	
		navbar.removeChild(event);
		navbar.removeChild(about);
		
	}

	first.appendChild(home);
	first.appendChild(signin);
	second.appendChild(event);
	second.appendChild(about);

	navbar.style.display="flex";
	navbar.style.width="auto";
	isOptionsClicked=false;
}

options.addEventListener("click", function(){

	if (isOptionsClicked===false){

		tops.style.display="none";
		navbar.style.display="inline-block";
		nav[0].style.backgroundColor="rgba(2,2,2,0.8)"
		navbar.style.width="100%";

		navbar.appendChild(home);
		navbar.appendChild(signin);	
		navbar.appendChild(event);
		navbar.appendChild(about);
		isOptionsClicked=true;

	}else {
		tops.style.display="block";
		nav[0].style.backgroundColor="22222233"
		backToDefault();
	}
});




