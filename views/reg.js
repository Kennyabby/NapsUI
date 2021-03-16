// napsite
// Napsite@21
// mongodb+srv://napsite:<password>@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority
// const url ="mongodb+srv://napsite:Napsite@21@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority"
// const {MongoClient} = require('mongodb');

var regCover = document.getElementById("cover");
var information = document.getElementById("information");
var proceed = document.getElementById("proceed");
var inputFirstName = document.getElementById("inputFirstName");
var inputMiddleName = document.getElementById("inputMiddleName");
var inputLastName = document.getElementById("inputLastName");
var inputLevel = document.getElementById("inputLevel");
var inputHall = document.getElementById("inputHall");
var inputParentName = document.getElementById("inputParentName");
var inputBirthday = document.getElementById("inputBirthday");
var inputMatricNo = document.getElementById("inputMatricNo");
var inputSchoolEmail = document.getElementById("inputSchoolEmail");
inputSchoolEmail.disabled=true;
var inputEmail = document.getElementById("inputEmail");
var inputContact = document.getElementById("inputContact");
var inputOtherContact = document.getElementById("inputOtherContact");
var inputAddress = document.getElementById("inputAddress");
var inputParentContact = document.getElementById("inputParentContact");
var inputParentOtherContact = document.getElementById("inputParentOtherContact");
var inputParentAddress = document.getElementById("inputParentAddress");
var inputUserName = document.getElementById("inputUserName");
var inputPassword = document.getElementById("inputPassword");
var inputConfirmPassword = document.getElementById("inputConfirmPassword");
inputConfirmPassword.disabled=true;
var hallList = ["MELLANBY", "TEDDER", "KUTI", "SULTAN BELLO", "QUEEN ELIZABETH II", "INDEPENDENCE", 
"IDIA", "OBAFEMI AWOLOWO", "ALEXANDER BROWN", "INDEPENDENCE", "NNAMDI AZIKWE", "ABDULSALAMI ABUBAKAR"];
var toggleMale = document.getElementById("male");
var toggleFemale = document.getElementById("female");
var toggleOthers = document.getElementById("others");
var GenderValue = toggleOthers;
var inputList = [inputFirstName, inputMiddleName, inputLastName, inputUserName, GenderValue, inputBirthday, inputLevel, inputHall, 
inputMatricNo, inputSchoolEmail, inputEmail, inputContact, inputOtherContact, inputAddress, 
inputParentName, inputParentContact, inputParentOtherContact, inputParentAddress,inputPassword, inputConfirmPassword]
var toggleMale = document.getElementById("male");
var toggleFemale = document.getElementById("female");
var toggleOthers = document.getElementById("others");
var GenderValue = toggleOthers;
var basicLabel = document.getElementById("basic");
var schoolLabel = document.getElementById("school");
var contLabel = document.getElementById("cont");
var signinLabel = document.getElementById("signin");
var finilLabel = document.getElementById("finil");
var firstClicked=true, middleClicked=false, lastClicked=false;
var inputClicked=-1, windowClicked=0;
var verifiedList=[];
var basicCompleted=false, schoolCompleted=false, contCompleted=false, signinCompleted=false;
var isBasicFirstImg=true, isSchoolFirstImg=true, isContFirstImg=true, isSigninFirstImg=true;
var proceedToNext=false, proceedToFinish=false;
var proceedToStatus=false;
var password="";
var cpassword="";
var current = document.getElementById("current");
var currentList = [];
var posVal = document.getElementsByName("pos-val");
var detailsName =[];
var detailsValue =[];
var infosList = document.getElementsByName("info");
var infosCount=0;
var isPageSlide=false;


var count=0;
var basicInfo = document.getElementById("basic-info");
var basicList = document.getElementsByName("basic");
var next = document.getElementById("next");
var back = document.getElementById("back");
var save = document.getElementById("save");
var finish = document.getElementById("finish");
var submit = document.getElementById("submit");
var isPageActive=false;

var schoolInfo = document.getElementById("school-info");
var schoolList = document.getElementsByName("school");

var finil = document.getElementById("finil-1");
var pList =[];
var rewriteData=0;

function toggleTo(choice){

	toggleMale.checked=false;
	toggleFemale.checked=false;
	toggleOthers.checked=false;
	choice.checked=true;
	GenderValue = choice;
	inputList[4]= GenderValue;
	
}

toggleMale.addEventListener("click", function(){
	
	toggleTo(this);
});

toggleFemale.addEventListener("click", function(){

	toggleTo(this);
});

toggleOthers.addEventListener("click", function(){

	toggleTo(this);
});

function displayUserData(){

	if (rewriteData>1){
		removePrevUserData();
	}
	var prefix = inputFirstName.value[0].toLowerCase()+
	inputLastName.value.toLowerCase()+inputMatricNo.value.slice(-3);
	inputSchoolEmail.value=prefix+"@stu.ui.edu.ng";
	inputList.forEach(function(val){

		if (val===inputPassword || val===inputConfirmPassword){

		}else{
			
			var p = document.createElement("p");
			p.appendChild(document.createTextNode(val.name+":  		"+val.value));
			p.className="finil-label";
			finil.appendChild(p);
			pList=pList.concat(p);
			
		}
		detailsName = detailsName.concat(val.name);
		detailsValue = detailsValue.concat(val.value);
		
	});	

};

function removePrevUserData(){
	
	pList.forEach(function(vals){
		finil.removeChild(vals);
		
	});
	pList=[];
	detailsName=[];
	detailsValue=[];
}


 	
const infosChildList= () => {
	var infosChildId=infosList[infosCount].id;
	var infosChildList = document.getElementsByName((infosChildId).slice(0,infosChildId.indexOf("-")));
	return infosChildList;
}
function infosChildLabel(){
	var infosChildId=infosList[infosCount].id;
	var infosChildLabel = document.getElementById((infosChildId).slice(0,infosChildId.indexOf("-")));
	return infosChildLabel;
}
function focus(input){
	++inputClicked;
	inputList.forEach(function(list){
		if (list===input){
			list.style.border="solid #1111ff99 2px";
		}
		else{
			list.style.border="solid #ffffffff 1px";		
		}
	})
	
};


function addInputsFocusListener(){

	inputList.forEach(function(input){
		input.addEventListener("click",function(){
			focus(input);
		});	
	});
	
}

addInputsFocusListener();
focus(inputFirstName);

// var option = document.createElement("option");
// option.appendChild(document.createTextNode(""));
// inputLevel.appendChild(option);
for(var i=0; i<4; i++){

	var option = document.createElement("option");
	option.appendChild(document.createTextNode((i+1)*100));
	inputLevel.appendChild(option);
}

hallList.forEach(function(hall){

	var option = document.createElement("option");
	option.appendChild(document.createTextNode(hall));
	inputHall.appendChild(option);
})

window.onclick=function(){
	
	++windowClicked;
	if (windowClicked>inputClicked){
		inputFirstName.style.border="solid #ffffffff 1px";
		inputMiddleName.style.border="solid #ffffffff 1px";
		inputLastName.style.border="solid #ffffffff 1px";
		inputClicked=0;
		windowClicked=0;
	}
	
};

function removePrevChildren(list,parents){

	var length = list.length;
	for (var i=0; i<length; i++){
	parents.removeChild(list[0]);
	
	}
};

function currentInfo(parents, val, count){

	if (isPageActive===true){

		removePrevChildren(currentList,current);
	
	}

	for(var i=0; i<val.length; i++){

		var child = document.createElement("img");
		child.className="pos";
		parents.appendChild(child);
	}

	currentList = parents.children;

	currentList[count].className="pos-active";
};

function updateRegTo(infoVal,infoList, infoCount){

	infoVal.style.display="block";
	infoVal.appendChild(posVal[0]);
	infoVal.appendChild(current);
	current.style.display="block";
	posVal[0].style.display="flex";
	infoList.forEach(function(val){

		if (val.id===infoList[infoCount].id){
			val.style.display="block";
		}else{
			val.style.display="none";
		}
	});

	save.style.display="none";
	finish.style.display="none";
	submit.style.display="none";
	if (infoCount>0){
	
		back.style.display="";	
		isPageSlide=false;		
			
	}

	if (infoCount===0){

		if (infosCount===0){
		
			next.style.display="";
			next.style.marginLeft="auto";
			back.style.display="none";
				
		}else{

			next.style.display="";
			next.style.marginLeft="auto";
			back.style.display="";
		}
		isPageSlide=true;
		
	}

	if(infoCount===(infoList.length-1)){
		
		if (infosCount===3){
			finish.style.display="";
			back.style.display="";
			back.style.marginRight="auto";
			next.style.display="none";	
		}else if(infosCount===4){
			displayUserData();
			submit.style.display="";
			back.style.display="";
			back.style.marginRight="auto";
			next.style.display="none";
		}else{

			save.style.display="";
			back.style.display="";
			back.style.marginRight="auto";
			next.style.display="none";
		}

		
		
	}

	currentInfo(current,infoList,infoCount);
	
};

function update(infoVal, infoList, infoCount){

	labelUpdate(infosChildLabel());
	infosList.forEach(function (val){

		if (val===infoVal){
			val.style.display="";	
		}

		else{
			val.style.display="none";
		}
		
	
	});

	updateRegTo(infoVal, infoList, infoCount);

};

update(infosList[infosCount],basicList,count);

function labelUpdate(label){

	isPageActive=true;
	basicLabel.style.borderBottom="none";
	schoolLabel.style.borderBottom="none";
	contLabel.style.borderBottom="none";
	signinLabel.style.borderBottom="none";
	finilLabel.style.borderBottom="none";
	label.style.borderBottom="solid #ff4444ff 3px";

};

function validateNextInputs(index){
	
	verifiedList=[];
	var proceedCount=0;
	inputParent = infosList[index].children[count].querySelectorAll("input");
		
	inputParent.forEach(function(input){
		if (input.required===true && input!==inputLevel && input!==inputHall && input!==inputBirthday){
			
			if (input.value.length>0){
				++proceedCount;
				if(input===inputConfirmPassword){
					
					if(input.value!=inputPassword.value){
						--proceedCount;
					}
				}

				if(input===inputMatricNo && String(Number(input.value)).length<6){
					--proceedCount;
				}
				
			}
			verifiedList = verifiedList.concat(input);
		}
	})
	

	if (proceedCount===verifiedList.length){
		
		proceedToNext=true;
		

	}
	else{
		proceedToNext=false;
		
	}

}

function validateInputs(index){
	
	verifiedList=[];
	var proceedCount=0;
	var currentLength = infosList[index].children.length;
	if(index===infosCount){
		var lengthe = infosList[index].children[currentLength-1].children.length;	
	}
	else{
		var lengthe = infosList[index].children.length;
	}
	var inputParent = [];
	for (var i=0; i<lengthe; i++){
		inputParent = infosList[index].children[i].querySelectorAll("input");
		
		inputParent.forEach(function(input){
			if (input.required===true && input!==inputLevel && input!==inputHall && input!==inputBirthday){
				
				if (input.value.length>0){
					++proceedCount;
					if(input===inputConfirmPassword){
						
						if(input.value!=inputPassword.value){
							--proceedCount;
						}
					}

					if(input===inputMatricNo && String(Number(input.value)).length<6){
						--proceedCount;
					}
					
				}
				verifiedList = verifiedList.concat(input);
			}
		})
		
	}
	

	if (proceedCount===verifiedList.length){
		
		proceedToFinish=true;
		displayComp();

	}
	else{
		proceedToFinish=false;
		displayInComp();
	}

}

function displayComp(){
	
	
	if( isCompletedInfo(infosCount)){
		updateCompImg("complete.png");
		
	}
}

function addImg(src){
	divId=infosChildLabel().id+"Comp";
	imgId=infosChildLabel().id+"Img";
	var div = document.getElementById(divId);
	var currImg = document.createElement("img");
	currImg.id=imgId;
	currImg.className="comp";
	currImg.src=src;
	div.appendChild(currImg);
}

function updateCompImg(src){

	divId=infosChildLabel().id+"Comp";
	imgId=infosChildLabel().id+"Img";
	var currImg = document.getElementById(imgId);
	var div = document.getElementById(divId);
	div.removeChild(currImg);

	var currImg = document.createElement("img");
	currImg.id=imgId;
	currImg.className="comp";
	currImg.src=src;
	div.appendChild(currImg);

}

function displayInComp(){
	
	divId=infosChildLabel().id+"Comp";
	if( isCompletedInfo(infosCount)){
		updateCompImg("incomplete.png");
		
	}
}

function monitorInput(input,parent){

	var infosChildId = input.parentElement.parentElement.id;
	var infosTag = infosChildId.slice(0,infosChildId.indexOf("-"));
	var toolTip = document.getElementById(input.id+"Tip");
	
	if (infosTag===parent){
		
		if (input.required===true && input!==inputLevel && input!==inputHall && input!==inputBirthday){

			if (input.value.length===0){

				if (input===inputPassword){
					inputConfirmPassword.disabled=true;
					inputConfirmPassword.value="";
					inputConfirmPassword.innerHTML="";
				}
				input.style.border="solid rgb(255,0,0) 2px";
				toolTip.innerHTML=input.title;
				validateInputs(infosCount);
			}
			else{
				if (input===inputConfirmPassword && input.value!=inputPassword.value){
					
					input.style.border="solid rgb(255,0,0) 2px";
					toolTip.innerHTML="Passwords Do Not Match!";
					validateInputs(infosCount);
			
				}else if(input===inputMatricNo && String(Number(input.value)).length<6){
					input.style.border="solid rgb(255,0,0) 2px";
					toolTip.innerHTML="Enter A Valid Matric Number!";
					inputSchoolEmail.value="";
					validateInputs(infosCount);
				}
				else{
					if(input===inputMatricNo){
						var prefix = inputFirstName.value[0].toLowerCase()+
						inputLastName.value.toLowerCase()+inputMatricNo.value.slice(-3);
						inputSchoolEmail.value=prefix+"@stu.ui.edu.ng";
					}
					if(input===inputPassword){
						inputConfirmPassword.disabled=false;
					}
					input.style.border="solid #1111ff99 2px";
					toolTip.innerHTML="";
					validateInputs(infosCount);	
				}
				
			}
		}	
	}
}

function monitorAll(){

	inputList.forEach((input) => {
		var toolTip = document.getElementById(input.id+"Tip");
		if (input.required===true && input!==inputLevel && input!==inputHall && input!==inputBirthday){

			if (input.value.length===0){

				if (input===inputPassword){
					inputConfirmPassword.disabled=true;
					inputConfirmPassword.value="";
					inputConfirmPassword.innerHTML="";
				}
				input.style.border="solid rgb(255,0,0) 2px";
				toolTip.innerHTML=input.title;
				validateInputs(infosCount);
			}
			else{
				if (input===inputConfirmPassword && input.value!=inputPassword.value){
					
					input.style.border="solid rgb(255,0,0) 2px";
					toolTip.innerHTML="Passwords Do Not Match!";
					validateInputs(infosCount);
			
				}else if(input===inputMatricNo && String(Number(input.value)).length<6){
					input.style.border="solid rgb(255,0,0) 2px";
					toolTip.innerHTML="Enter A Valid Matric Number!";
					inputSchoolEmail.value="";
					validateInputs(infosCount);
				}
				else{
					if(input===inputMatricNo){
						var prefix = inputFirstName.value[0].toLowerCase()+
						inputLastName.value.toLowerCase()+inputMatricNo.value.slice(-3);
						inputSchoolEmail.value=prefix+"@stu.ui.edu.ng";
					}
					if(input===inputPassword){
						inputConfirmPassword.disabled=false;
					}
					input.style.border="solid #1111ff99 2px";
					toolTip.innerHTML="";
					validateInputs(infosCount);	
				}
				
			}
		}
	})
	
}
function createInputEvents(){

	inputList.forEach(function(input){

		input.addEventListener("input", function(){
			var infosChildId=infosList[infosCount].id;
			var infosTag = infosChildId.slice(0,infosChildId.indexOf("-"));
			monitorInput(input,infosTag);
			
		});
	});
}

createInputEvents();

basicLabel.addEventListener("click", function(){

	count=0;
	infosCount=0;
	update(infosList[infosCount],infosChildList(), count);
});

schoolLabel.addEventListener("click", function(){
	
	count=0;
	infosCount=1;
	update(infosList[infosCount],infosChildList(), count);
	
});

contLabel.addEventListener("click", function(){
	
	count=0;
	infosCount=2;
	update(infosList[infosCount],infosChildList(), count);
});

signinLabel.addEventListener("click", function(){
	
	count=0;
	infosCount=3;
	update(infosList[infosCount],infosChildList(), count);
});

finilLabel.addEventListener("click", function(){
	var cot=0;
	var holdCount = infosCount;
	for (var i=0; i<4; i++){
		validateInputs(i);
		infosCount=i;
		if (proceedToFinish===true){
			++cot;
			checkCompletedInfo(i);
			initializeCompImg(i);
			displayComp();
			// isPageSlide=true;
			infosCount=holdCount;
		}
		else{
			checkCompletedInfo(i);
			initializeCompImg(i);
			displayInComp();
			infosCount=holdCount;
		}
	}
	infosCount=holdCount;
	
	if (cot===4){
		proceedToFinish=true;
	}
	else{
		proceedToFinish=false;
	}

	if (proceedToFinish===true && basicCompleted===true && schoolCompleted===true && contCompleted===true){
		++rewriteData;
		count=0;
		infosCount=4;
		update(infosList[infosCount],infosChildList(), count);
		proceedToFinish=false;
	}
	else{
		monitorAll();
		
	}

});

next.addEventListener("click", function(){

	validateNextInputs(infosCount);
	if (proceedToNext===true){
		isPageActive=true;
		++count;
		updateRegTo(infosList[infosCount],infosChildList(),count);	
	}
	else{
		verifiedList.forEach(function(input){
			var infosChildId=infosList[infosCount].id;
			var infosTag = infosChildId.slice(0,infosChildId.indexOf("-"));
			monitorInput(input,infosTag);
		})
		
	}
	

});
back.addEventListener("click", function(){

	
	if (isPageSlide===false){
		--count;
		updateRegTo(infosList[infosCount],infosChildList(), count);
		
	}else{
		--infosCount;
		update(infosList[infosCount],infosChildList(), count);		
		
		
	}

});

function checkCompletedInfo(count){

	if (count===0){
		basicCompleted=true;
	}else if (count===1){
		schoolCompleted=true;
	}else if (count===2){
		contCompleted=true;
	}else if (count===3){
		signinCompleted=true;
	}
}

function isCompletedInfo(count){
	if (count===0){
		return basicCompleted;
	}else if (count===1){
		return schoolCompleted;
	}else if (count===2){
		return contCompleted;
	}else if (count===3){
		return signinCompleted;
	}
}

function initializeCompImg(count){
	if (count===0 && isBasicFirstImg===true){
		addImg("complete.png");
		isBasicFirstImg=false;
	}else if (count===1 && isSchoolFirstImg===true){
		addImg("complete.png");
		isSchoolFirstImg=false;
	}else if (count===2 && isContFirstImg===true){
		addImg("complete.png");
		isContFirstImg=false;
	}else if (count===3 && isSigninFirstImg===true){
		addImg("complete.png");
		isSigninFirstImg=false;
	}
}

proceed.addEventListener("click", () => {

	information.style.display="none";
	regCover.style.display="inline-flex";
})
save.addEventListener("click", function(){

	validateInputs(infosCount);
	if (proceedToNext===true){
		count=0;
		checkCompletedInfo(infosCount);
		initializeCompImg(infosCount);
		displayComp();
		++infosCount;
		isPageSlide=true;
		update(infosList[infosCount],infosChildList(), count);
	}
	else{
		verifiedList.forEach(function(input){
			var infosChildId=infosList[infosCount].id;
			var infosTag = infosChildId.slice(0,infosChildId.indexOf("-"));
			monitorInput(input,infosTag);
		})
		
	}
	

});
finish.addEventListener("click", function(){

	var cot=0;
	var holdCount = infosCount;
	for (var i=0; i<4; i++){
		validateInputs(i);
		infosCount=i;
		if (proceedToFinish===true){
			++cot;
			checkCompletedInfo(i);
			initializeCompImg(i);
			displayComp();
			
			infosCount=holdCount;
		}
		else{
			checkCompletedInfo(i);
			initializeCompImg(i);
			displayInComp();
			infosCount=holdCount;
		}
	}
	infosCount=holdCount;
	
	if (cot===4){
		proceedToFinish=true;
	}
	else{
		proceedToFinish=false;
	}
	if (proceedToFinish===true && basicCompleted===true && schoolCompleted===true && contCompleted===true){
		++rewriteData;
		count=0;
		infosCount=4;
		update(infosList[infosCount],infosChildList(), count);
		proceedToFinish=false;
	}
	else{
		monitorAll();
		
	}
	

});
submit.addEventListener("click", function(){

	// count=0;
	// ++infosCount;
	// isPageSlide=true;
	// update(infosList[infosCount],infosChildList(), count);
	
	postToServer();
});


async function postToServer(){

	const user = {
		FirstName: detailsValue[0],
		MiddleName:detailsValue[1],
		LastName: detailsValue[2],
		UserName: detailsValue[3],
		Gender: detailsValue[4],
		DateOfBirth:detailsValue[5],
		Level: detailsValue[6],
		HallAllocated: detailsValue[7],
		MatricNo: detailsValue[8],
		SchoolEmail: detailsValue[9],
		OtherEmail: detailsValue[10],
		ContactNumber: detailsValue[11],
		OtherContactNumber: detailsValue[12],
		CurrentAddress: detailsValue[13],
		ParentGuardianName: detailsValue[14],
		ParentGuardianContact: detailsValue[15],
		ParentGuardianOtherContact: detailsValue[16],
		ParentGuardianAddress: detailsValue[17],	
		Password: detailsValue[18]
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	};

	const response = await fetch('/Registeration_Status', options);
	if (response===null){
		console.log("no response: error 404");
	}
	const json = await response.json();	
	proceedToStatus = json.sts;
	
	if (proceedToStatus===true){


	}else{


	}
};





 