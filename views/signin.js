var forgot = document.getElementById("fgt");
var signin = document.getElementById("sign-in");

forgot.addEventListener("mousedown", function(){
	forgot.style.boxShadow="4px 4px 5px black";
	forgot.style.border="solid #0000ff33 3px";
});
forgot.addEventListener("mouseup", function(){
	forgot.style.boxShadow="";
	forgot.style.border="solid black 0px";
});

signin.addEventListener( "click", ()=> {
	
});