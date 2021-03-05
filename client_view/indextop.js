var backToTop = document.getElementById("toTop");

window.onscroll = function(){
	scrollFunction();
};

function scrollFunction(){

	if (document.body.scrollTop>150 || document.documentElement.scrollTop>150){
		backToTop.style.display ="block";

	}else{
		backToTop.style.display="none";
	}
}

function topFunction(){
	document.body.scrollTop=0;
	document.documentElement.scrollTop=0;
}