
var forgot = document.getElementById("fgt");
var sign_in = document.getElementById("sign-in");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
var inputEmailAdressTip = document.getElementById("inputEmailAdressTip");
var inputPasswordTip = document.getElementById("inputPasswordTip");
var dashLink = document.getElementById("dash-link");
var emailKeys = ["@","stu","ui","edu","ng","."]
var countKeys=0;
var isKeyPresent=false;
var userList;
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

inputPasswordTip.style.display="";
inputEmailAddressTip.style.display="";
async function inspectLoginDetails(){
	// console.log("clicked");
	const opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const response= await fetch("/LoginDetails", opts);
	const LoginDetails = await response.json();
	userList = await LoginDetails.detailsList;
	userList.forEach( async (user) => {
		
		if (user.SchoolEmail===inputEmail.value && user.Password===inputPassword.value){
			// console.log(user.SchoolEmail);
			// inputEmail.value="";
			// inputPassword.value="";
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

					window.open('/Dashboard')
					
				}else{

					throw (TypeError);
				}
			}catch (TypeError){
				
				
			}
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

inputPassword.addEventListener("input", () =>{
	
	if (inputPassword.value!=""){

		inputPasswordTip.style.display="";
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

			inputEmailAddressTip.style.display="";
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



