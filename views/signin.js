
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
var profileImage = document.getElementById("profile-image");
var profile = document.getElementById("profile");
var imageOpts = document.getElementById("image-options");
var updatePic = document.getElementById("updatePic");
var viewPic = document.getElementById("viewPic");
var removePic = document.getElementById("removePic");
var updImg = document.getElementById("updImg");
var imgButton = document.getElementById("view-img");
var notifications = document.getElementById("notifications");
var events = document.getElementById("events");
var tasks = document.getElementById("tasks");
var settings = document.getElementById("settings");
var dashSection = document.getElementById("dashSection");
// var alluminiSection = document.getElementById("alluminiSection");
var votingSection = document.getElementById("votingSection");
var discussionSection = document.getElementById("discussionSection");
var adminSection = document.getElementById("adminSection");
var profileIdentifier = document.getElementById("profile-identifier");
var imageCover = document.getElementById("image-cover");
var detailsCover = document.getElementById("details-cover");
var userDetailsCover = document.getElementById("userdetails-cover");
var editDiv = document.getElementById("edit-div");
editDiv.style.display="none";
var backDiv = document.getElementById("back-div");
var saveDiv = document.getElementById("save-div");
var searchMethod = document.getElementById("search-method");
var searchBar = document.getElementById("search-bar");
var sortSearch = document.getElementById("sort-search");
var firstContent= document.getElementById("first-content");
var side = document.getElementById("side");
var sideBar = document.getElementById("side-bar");
var imgComp = document.getElementById("imgComp");
var profileComp = document.getElementById("profileComp");
var notificationsComp = document.getElementById("notificationsComp");
var eventsComp = document.getElementById("eventsComp");
var tasksComp = document.getElementById("tasksComp");
var settingsComp = document.getElementById("settingsComp");
var compList = [imgComp,profileComp,notificationsComp,tasksComp,settingsComp];
var sortMethodList=["Sort By","100","200","300",
					"400","Male","Female"];
var searchMethodList=["User Name","Matric No","Name"];
var editList=[];
var editTagList=[];
var editNewList=[];
var viewList=[];
var userViewList=[];
var optList=[];
var userDetailsValue1 = [];
var sideList= [profile,notifications,events,tasks,settings];
var topList= [dashSection,votingSection,discussionSection,adminSection];
var optionList = [profile,notifications,events,tasks,settings,dashSection,votingSection,discussionSection,adminSection];
var imgList= ["403105.jpg","9UsWBvm4ScyGW7QOn2yz_20190122-Is-space-time-a-quantum-code-Featured.jpg",
				"12977115_1153710794652906_1138676803864315944_o.jpg","163-1631522_space-time-curvature-wall-paper.jpg",
				"464714_589563021067689_1857773835_o.jpg","981407_589561937734464_29963629_o.jpg",
				"depositphotos_55976909-stock-photo-advance-of-fractal-realms.jpg","9UsWBvm4ScyGW7QOn2yz_20190122-Is-space-time-a-quantum-code-Featured.jpg",
				"formula-math-mathematics-physics-wallpaper-preview.jpg","howeinsteins.jpg","iStock-941621770.jpg","kgWYUo.png","Mysteriously-Shrinking-Proton-Continues-to-Puzzle-Physicists.jpg",
				"N07LKc.png","Plasma_590x300.jpg"];
var imgFlow= document.getElementById("img-flow");
var nt= document.getElementById("next-img");
var pv= document.getElementById("prev-img")
var searchResult = document.getElementById("search-result");
var resultView = document.getElementById("result-view");
var profileName = document.createElement("p");
var userName = document.createElement("p");
var admin = document.createElement("p");
var napsdiv = document.createElement("div");
var nameTag = document.createElement("span");
var valueTag = document.createElement("span");

var count=0;
var countKeys=0;
var loopCount=0;
var loopCount1=0;
var isKeyPresent=false;
var userIndex;
var side1 = document.createElement("div");;
var detaisSent=false;
var isEditProfile=false;
var condition= "inSession";
// var onConditon="inSession";
if(sessionStorage.getItem("cond_key")===null){
	sessionStorage.setItem("cond_key", condition);
}else{
	sessionStorage.removeItem("cond_key");
}
// console.log(sessionStorage.getItem("cond_key"));
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

// console.log("This is a fresh page");
async function inspectLoginDetails(){
	// console.log("inspecting logging");
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
	var ct=0;
	userList.forEach (async (user) => {
		
		if (user.SchoolEmail===inputEmail.value && user.Password===inputPassword.value){
			ct++;
			var stringNapsite = "loggedin";
			// console.log(sessionStorage.getItem("cond_key"));
			if(sessionStorage.getItem("cond_key")!==null){
				sessionStorage.setItem("dash_key", stringNapsite);
				// console.log("started Session");
				window.open("/NapsPage","_self");
			};
			sessionStorage.setItem("cond_key", condition);
			// inputEmail.value="";
			// inputPassword.value="";
			inputPasswordTip.style.display="none";
			inputEmailAddressTip.style.display="none";
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
					// console.log("yes");
					// window.open('/Dashboard','_self');
					// window.location.href="/Dashboard";

					document.body.style.backgroundImage = "";
					async function loadDashboard(){

						try {
							const opts1 = {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								}
							};
							// console.log("started dashboard");
							const response2= await fetch("/NapsDetails", opts1);
							const User = await response2.json();
							var Napsite = await User.details;
							// console.log(Napsite);

							if (Napsite.Gender==="Male") {

								logImg.src="male-profile.png";

							}else if(Napsite.Gender==="Female") {

								logImg.src="female-profile.jpg";

							}else{

								logImg.src="male-profile.png";

							}

							var optImg = document.createElement("img");
							optImg.className="options";
							optImg.src="view.jpg";		
							var imgClick=0;
							optImg.addEventListener("click", () =>  {

								imgClick++;
								if (imgClick==1){
									if (optList.length>0){
										for (var i=0; i<optList.length; i++){
											side1.removeChild(optList[i]);
										}
									}
									optList=[];		
									side1.appendChild(optImg);				
									side1.appendChild(sideBar);
									optList = optList.concat(optImg);
									optList = optList.concat(sideBar);
									side1.style.backgroundColor="#000000aa";
									
								}else{

									if (optList.length>0){
									for (var i=0; i<optList.length; i++){
											side1.removeChild(optList[i]);
										}
									}
									optList=[];		
									side1.appendChild(optImg);				
									optList = optList.concat(optImg);
									
									side1.style.backgroundColor="#00000000";
									imgClick=0;
									

								}

								
							})	

							side1.className="side1";	
							if (optList.length>0){
								for (var i=0; i<optList.length; i++){
									side1.removeChild(optList[i]);
								}
							}
							optList=[];						
							side1.appendChild(sideBar);
							optList = optList.concat(sideBar);
							side1.style.backgroundColor="black";
							firstContent.appendChild(side1);	
							var x = window.matchMedia("(max-width: 750px)");
							function widthChangeEffect(x,nTag,vTag){
								if (x.matches){
									// console.log("matched");
									userName.style.right="20px";
									userName.style.fontSize="1rem";
									userName.style.bottom="8px";
									// imageCover.removeChild(userName);
									// imageCover.appendChild(userName);

									admin.style.left="45px";
									admin.style.fontSize="1rem";
									admin.style.bottom="3px";
									// imageCover.removeChild(admin);
									// imageCover.appendChild(admin);

									profileName.style.marginLeft="25px";
									profileName.style.marginTop="25px";
									// profileIdentifier.removeChild(profileName);
									// profileIdentifier.appendChild(profileName);

									nTag.style.fontSize="1rem";
									vTag.style.fontSize="1rem";
									vTag.style.marginLeft="15px";
									// napsdiv.removeChild(nameTag);
									// napsdiv.removeChild(valueTag);
									// napsdiv.appendChild(nameTag);
									// napsdiv.appendChild(valueTag);														
									if (optList.length>0){
										for (var i=0; i<optList.length; i++){
											side1.removeChild(optList[i]);
										}
									}
									optList=[];		
									side1.style.backgroundColor="#00000000";
									side1.appendChild(optImg);
									
									optList = optList.concat(optImg);
									
									// firstContent.removeChild(side1);
									// firstContent.appendChild(side1);									
									
									

								}else{
									// console.log("doesn't match");
									userName.style.right="30px";
									userName.style.fontSize="1.5rem";
									userName.style.bottom="10px";
									// imageCover.removeChild(userName);
									// imageCover.appendChild(userName);

									admin.style.left="90px";
									admin.style.fontSize="1.5rem";
									admin.style.bottom="3px";
									// imageCover.removeChild(admin);
									// imageCover.appendChild(admin);

									profileName.style.marginLeft="50px";
									profileName.style.marginTop="50px";
									// profileIdentifier.removeChild(profileName);
									// profileIdentifier.appendChild(profileName);

									nameTag.style.fontSize="1.5rem";
									valueTag.style.fontSize="1.5rem";
									valueTag.style.marginLeft="30px";
									// napsdiv.removeChild(nameTag);
									// napsdiv.removeChild(valueTag);
									// napsdiv.appendChild(nameTag);
									// napsdiv.appendChild(valueTag);
									
									if (optList.length>0){
										for (var i=0; i<optList.length; i++){
											side1.removeChild(optList[i]);
										}
									}
									optList=[];		
									side1.style.backgroundColor="black";
									
									side1.appendChild(sideBar);
									
									optList = optList.concat(sideBar);											
									
									// firstContent.removeChild(side1);
									// firstContent.appendChild(side1);
									
								}

							}
							var hasProfileImage = false;
							x.addListener(widthChangeEffect);
							if (Napsite.ProfileImage!==""){
								// console.log(Napsite.ProfileImage);
								profImg.style.padding="0px";
								profImg.src=`https://naps-ui-bucket2021.s3.amazonaws.com/${Napsite.ProfileImage}`;
								// console.log(profImg.src);
								hasProfileImage=true;
							}else{
								profImg.src="profile-img.png";	
								hasProfileImage=false;
							}
							
							function toggleOpts(){
								if(updatePic.style.display!=="none"){
									updatePic.style.display="none";
									viewPic.style.display="none";
									removePic.style.display="none";
								}else{
									// console.log("option clicked");
									updatePic.style.display="block";
									if(hasProfileImage){
										
										viewPic.style.display="block";
										removePic.style.display="block";
									}else{
										viewPic.style.display="none";
										removePic.style.display="none";
									}
									
								}

							}
							imageOpts.addEventListener("click",()=>{
								toggleOpts();
							});
							updatePic.addEventListener("click",()=>{
								updImg.click();
								toggleOpts();
							});

							var spanTag = document.createElement("p");
							// spanTag.appendChild(document.createTextNode(`${Napsite.LastName} ${Napsite.FirstName} ${Napsite.MiddleName}`));
							spanTag.appendChild(document.createTextNode(`${Napsite.UserName}`));
							spanTag.style.fontWeight="bold";
							spanTag.style.padding="0px";
							spanTag.style.margin="0px";
							spanTag.style.fontStyle="italic";
							// spanTag.style.textAlign="center";
							spanTag.style.fontSize="0.7rem";
				
							var dropTag = document.createElement("img");
							dropTag.src="drop-down.png";
							dropTag.className="drop-img";
							logSection.appendChild(spanTag);
							logSection.appendChild(dropTag);
							
							if (Napsite.ProfileImage!==""){
								// console.log(Napsite.ProfileImage);
								profileImage.style.padding="0px";
								profileImage.src=`https://naps-ui-bucket2021.s3.amazonaws.com/${Napsite.ProfileImage}`;
							}else{
								profileImage.src="profile-img.png"	
							}
							
							updImg.addEventListener("change", ()=>{
								
								imgButton.click()===true;
								var ur="";
								setTimeout(async ()=>{
									try{
										const options = {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											
										};
										const resp = await fetch('/NapsProfilePics',options);
										const json = await resp.json();
										var imageFileName = json.file;
										console.log("image name is: ",imageFileName);
										
										console.log(`./profile/images/${imageFileName}`);
										window.stop();
										
									}catch(TypeError){

									}finally{
										profileImage.style.padding="0px";
										profImg.style.padding="0px";
										
										var user ={

											ProfileImage: imageFileName,
											MatricNo: Napsite.MatricNo,
										}

										const options = {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify(user)
										};

										try{
											const response1 = await fetch('/ProfileUpdate', options);	
											const json = await response1.json();									
												
										}catch(TypeError){

										}

										console.log("changed...");
										var file= updImg.files[0];
										console.log(file);
										console.log(updImg.files);
										getSignedRequest(file);
										console.log("checking....");
										
										function getSignedRequest(file){
										  const xhr = new XMLHttpRequest();
										  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
										  console.log("/sign-s3 called");
										  xhr.onreadystatechange = () => {
										  	console.log("onreadystatechange called");
										    if(xhr.readyState === 4){
										    	console.log("readyState = 4");
										      if(xhr.status === 200){
										      	console.log("readyState = 200");
										        const response = JSON.parse(xhr.responseText);
										        uploadFile(file, response.signedRequest, response.url);
										        console.log("uploadFile called");
										      }
										      else{
										      	console.log("readyState != 200");
										        // alert('Could not get signed URL.');
										      }
										    }
										  };
										  xhr.send();
										  console.log("xhr sent...");
										}
										
										function uploadFile(file, signedRequest, url){
											console.log("uploadingFile");
										  const xhr = new XMLHttpRequest();
										  xhr.open('PUT', signedRequest);
										  xhr.onreadystatechange = () => {
										  	console.log('this is the image: ',url);
										  	ur=url;
										  	profileImage.src=`${ur}`;
											profImg.src=`${ur}`;
										    if(xhr.readyState === 4){
										    	
										      if(xhr.status === 200){
										        
										        // document.getElementById('avatar-url').value = url;
										      }
										      else{
										        // alert('Could not upload file.');
										      }
										    }
										  };
										  xhr.send(file);
										  
										}
										
									}
								},2000);
								
							})
							

							profileName.appendChild(document.createTextNode(`${Napsite.LastName} ${Napsite.FirstName} ${Napsite.MiddleName}`));
							profileName.style.marginLeft="50px";
							profileName.style.marginTop="50px";
							profileIdentifier.appendChild(profileName);

							
							userName.appendChild(document.createTextNode(`${Napsite.UserName}`));
							userName.style.position="absolute";
							userName.style.right="30px";
							userName.style.fontSize="1.5rem";
							// userName.style.fontWeight="bold";
							userName.style.fontStyle="italic";
							userName.style.bottom="10px";
							imageCover.appendChild(userName);

							if (Napsite.Admin==="positive"){

								adminSection.style.display="";
								
								admin.appendChild(document.createTextNode("Admin"));
								admin.style.position="absolute";
								admin.style.left="90px";
								admin.style.fontSize="1.5rem";
								// userName.style.fontWeight="bold";
								admin.style.fontStyle="italic";
								admin.style.bottom="3px";
								imageCover.appendChild(admin);

								searchBar.placeholder="Enter Napsite User Name"
								sortMethodList.forEach( (sort)=> {	

									var option = document.createElement("option");
									option.appendChild(document.createTextNode(sort));
									sortSearch.appendChild(option);
								})
								searchMethodList.forEach( (meth)=>{

									var option = document.createElement("option");
									option.appendChild(document.createTextNode(meth));
									searchMethod.appendChild(option);
								})

								searchMethod.addEventListener("input", ()=> {

									console.log("clicked a method")
									searchBar.placeholder="Enter Napsite "+searchMethod.value;
								})
								async function bySpecific() {

									backDiv.style.display="none";
									var allsList=[];
									const opts1 = {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										}
									};
									
									const response2= await fetch("/LoginDetails", opts1);
									const Usr = await response2.json();
									const Users = await Usr.detailsList;
									const st = sortSearch.value;
									var c=0;
									Users.forEach((user)=>{
										
										if (user.Gender==="Male" && sortSearch.value==="Male"){
											
											allsList=allsList.concat(user);							
																			
																				
																						
										}else if(user.Gender==="Female" && sortSearch.value==="Female"){
											allsList=allsList.concat(user);
										}

										
									})
									for (var i=0; i<4; i++){
										var v=(i+1)*100;

										Users.forEach((user)=>{
										
											if (user.Level===v.toString() && sortSearch.value===v.toString()){
												
												allsList=allsList.concat(user);											
																				
																						
																							
											}
											
										})
										
									}
									
									editDiv.style.display="none"
									if (userViewList.length>0){
										for(var i=0; i<userViewList.length; i++){
											userDetailsCover.removeChild(userViewList[i]);
										}
										userViewList=[];
									}
									if (viewList.length>0){
										for(var i=0; i<viewList.length; i++){
											searchResult.removeChild(viewList[i]);
										}
										viewList=[];
									}
									var p= document.createElement("p");
									p.appendChild(document.createTextNode(`Search result for type ${sortSearch.value}: ${allsList.length}`));
									p.style.color="blue";
									p.style.fontSize="1rem";
									p.style.fontWeight="bold";
									p.style.fontFamily="monospace";
									p.style.fontStyle="italic";
									searchResult.appendChild(p);
									viewList=viewList.concat(p);
									searchResult.appendChild(p);
									console.log(allsList);
									allsList.forEach((users)=>{
										// console.log(users);
										viewAlls(users);
									})
								}
								function viewAlls(user) {

									var userView = document.createElement("div");
									var userImg = document.createElement("img");
									var label = document.createElement("label");
									var label1 = document.createElement("label");
									label1.appendChild(document.createTextNode(`${user.UserName}`));
									label1.style.fontSize="1rem";
									label1.style.fontWeight="bold";
									label1.style.color="white";
									label1.style.fontStyle="italic";
									label1.style.position="absolute";
									label1.style.bottom="25px";
									label1.style.right="25px";
									label1.style.cursor="pointer";

									label.appendChild(document.createTextNode(`${user.LastName} ${user.FirstName} ${user.MiddleName}`))
									label.style.fontSize="1.2rem";
									label.style.position="absolute";
									label.style.top="25px";
									label.style.right="30px";
									label.style.fontWeight="bold"
									label.style.color="white";
									label.style.cursor="pointer";

									userImg.className="profi-img";

									if (user.ProfileImage!==""){
										console.log(user.ProfileImage);
										userImg.src=`https://naps-ui-bucket2021.s3.amazonaws.com/${user.ProfileImage}`;
										userImg.style.padding="0px";
									}else{
										userImg.src="profile-img.png";	
									}
									
									userView.appendChild(userImg);
									userView.appendChild(label);
									userView.appendChild(label1);										
									userView.className="result-view";


									searchResult.appendChild(userView);
									viewList=viewList.concat(userView);

									userView.addEventListener("click", () =>{
										editDiv.style.display="inline-flex";
										backDiv.style.display="inline-flex";
										if (userView.childNodes[2].innerHTML===Napsite.UserName){
											editDiv.style.display="none";
											sideList.forEach((side)=>{

												if (side===profile){
													backDiv.style.display="none"
													side.style.color="white";
													var activeDiv2 = document.getElementById(side.id+"-div");
													// console.log(opts.id);
													activeDiv2.style.display="block";
													sessionStorage.setItem("currDiv-key",side.id);
													topList.forEach((opt) => {
														opt.style.color="#00000099";
														var activeDiv = document.getElementById(opt.id+"-div");
														activeDiv.style.display="none";
														// console.log("no view for, ",opt.id);
													});

												}
												else{

													side.style.color="#999999ff";
													var activeDiv3 = document.getElementById(side.id+"-div");
													activeDiv3.style.display="none";
												}														
											})								
																				
										}else{

											if (viewList.length>0){
												for(var i=0; i<viewList.length; i++){
													searchResult.removeChild(viewList[i]);
												}
												viewList=[];
											}
											if (userViewList.length>0){
												for(var i=0; i<userViewList.length; i++){
													userDetailsCover.removeChild(userViewList[i]);
												}
												userViewList=[];
											}
											var userDetailsName = ["First Name: ","Middle Name: ","Last Name: ","UserName: ","Matric No: ","Gender: ","Level: ",
												"Date Of Birth: ","Hall Allocated: ","Contact Number: ","Other Contact Number: ","Current Address: ",
												"School Email: ","Email: ","Parent/Guardian Name: ","Parent/Guardian Address: ",
												"Parent/Guardian Contact: ","Parent/Guardian Other Contact: "];
											userDetailsValue1 = initializeUserDetails(user);

											function addNapsiteDetail1(napsiteName,napsiteValue){
												
												var napsdiv = document.createElement("div");
												var nameTag = document.createElement("span");
												var valueTag = document.createElement("span");
												napsdiv.style.display="inline-flex";														
												valueTag.style.marginLeft="30px";
												nameTag.appendChild(document.createTextNode(`${napsiteName}`));
												valueTag.appendChild(document.createTextNode(`${napsiteValue}`));
												nameTag.style.fontWeight="bold";
												nameTag.style.fontSize="1.5rem";
												valueTag.style.fontStyle="italic";
												nameTag.style.fontFamily="monospace";
												valueTag.style.fontSize="1.5rem";
												napsdiv.appendChild(nameTag);
												napsdiv.appendChild(valueTag);
												widthChangeEffect(x,nameTag,valueTag);
												var spaceTag = document.createElement("p");
												spaceTag.appendChild(napsdiv);
												spaceTag.style.marginBottom="50px";
												userDetailsCover.appendChild(spaceTag);
												
												userViewList = userViewList.concat(spaceTag);										
												
											}

											for (var i=0; i<userDetailsName.length; i++){

												addNapsiteDetail1(userDetailsName[i],userDetailsValue1[i]);

											}

											editDiv.addEventListener("click", () => {

												removePreviousDetails(userViewList);
												
												for (var i=0; i<userDetailsName.length; i++){

													editProfile(userDetailsName[i],userDetailsValue1[i]);

												}

												userViewList=[];
												editDiv.style.display="none";
												saveDiv.style.display="inline-flex";



											});
											backDiv.addEventListener("click", ()=> {
												console.log("clicked now");
												bySpecific();
												
											});

											saveDiv.addEventListener("click", async ()=> {

												await updateProfile();
												for (var i=0; i<userDetailsName.length; i++){
									
													addNapsiteDetail1(userDetailsName[i],userDetailsValue1[i]);
													

												};
												editTagList=[];
												editNewList=[];
												editDiv.style.display="inline-flex";
												saveDiv.style.display="none";
												// window.open("/NapsPage","_self");
											})

										}

										
									})

								}

								
								sortSearch.addEventListener("input", async() =>{

									bySpecific();
									
								})
								
								searchBar.addEventListener("input", async () =>{
									editDiv.style.display="none";
									backDiv.style.display="none";
									var isSearchFound=false;
									var userWithUserNameList=[];
									var userWithUserNameAndSortList=[];
									var userWithMatricList=[];
									var userWithMatricAndSortList=[];
									var userWithNameList=[];
									var userWithNameAndSortList=[];
									var foundUser=[];
									const opts1 = {
										method: 'POST',
										headers: {
											'Content-Type': 'application/json'
										}
									};
									
									const response2= await fetch("/LoginDetails", opts1);
									const Usr = await response2.json();
									const Users = await Usr.detailsList;
									
									if (searchMethod.value===searchMethodList[0]){

										
										Users.forEach( (user) => {
											
											if (user.UserName.toLowerCase().includes(searchBar.value.toLowerCase())){
												
												userWithUserNameList=userWithUserNameList.concat(user);

												isSearchFound=true;
											}else{
												isSearchFound=false;
											}

										})

										if(sortSearch.value!=="Sort By"){

											userWithUserNameList.forEach( (usr) => {

												if(usr.Level.includes(sortSearch.value) || usr.Gender.includes(sortSearch.value)){
													userWithUserNameAndSortList=userWithUserNameAndSortList.concat(usr);
													foundUser=userWithUserNameAndSortList;
													isSearchFound=true;
												}else{
													isSearchFound=false;
												}

											})
										}else{
											userWithUserNameAndSortList=userWithUserNameList;
											foundUser=userWithUserNameAndSortList;
										}
										
										// console.log(userWithUserNameAndSortList);
										
									}
									if (searchMethod.value===searchMethodList[1]){

										
										Users.forEach( (user) => {
											
											if (user.MatricNo.includes(searchBar.value)){
												
												userWithMatricList=userWithMatricList.concat(user);
												isSearchFound=true;
												
											}else{
												isSearchFound=false
											}
										})

										if(sortSearch.value!=="Sort By"){

											userWithMatricList.forEach( (usr) => {

												if(usr.Level.includes(sortSearch.value) || usr.Gender.includes(sortSearch.value)){
													userWithMatricAndSortList=userWithMatricAndSortList.concat(usr);
													foundUser=userWithMatricAndSortList;
													isSearchFound=true;
												}else{
													isSearchFound=false
												}

											})
										}else{

											userWithMatricAndSortList=userWithMatricList;
											foundUser=userWithMatricAndSortList;
										}
										
										// console.log(userWithMatricAndSortList);
										
									}
									if (searchMethod.value===searchMethodList[2]){

										
										Users.forEach( (user) => {
											// console.log([user.LastName+" "+user.FirstName+" "+user.MiddleName].toString())
											if ([user.LastName+" "+user.FirstName+" "+user.MiddleName]
												.toString().toLowerCase().includes(searchBar.value.toLowerCase())){
												
												userWithNameList=userWithNameList.concat(user);
												isSearchFound=true;
											}else{
												isSearchFound=false;
											}

										})
										if(sortSearch.value!=="Sort By"){

											userWithNameList.forEach( (usr) => {

												if(usr.Level.includes(sortSearch.value) || usr.Gender.includes(sortSearch.value)){

														userWithNameAndSortList=userWithNameAndSortList.concat(usr);
														foundUser=userWithNameAndSortList;
														isSearchFound=true;
												}else{
													isSearchFound=false
												}				
																	

											})
										}else{

											userWithNameAndSortList=userWithNameList;
											foundUser=userWithNameAndSortList;
										}

									}

									console.log(foundUser);
									// console.log(isSearchFound);

									if(foundUser.length>0 && searchBar.value!==""){

										if (userViewList.length>0){
											for(var i=0; i<userViewList.length; i++){
												userDetailsCover.removeChild(userViewList[i]);
											}
											userViewList=[];
										}
										if (viewList.length>0){
											for(var i=0; i<viewList.length; i++){
												searchResult.removeChild(viewList[i]);
											}
											viewList=[];
										}
										foundUser.forEach((user) => {										
											var p= document.createElement("p");
											p.appendChild(document.createTextNode(`Search result for type ${sortSearch.value}: ${foundUser.length}`));
											p.style.color="blue";
											p.style.fontSize="1rem";
											p.style.fontWeight="bold";
											p.style.fontFamily="monospace";
											p.style.fontStyle="italic";
											searchResult.appendChild(p);
											viewList=viewList.concat(p);
											searchResult.appendChild(p);
											viewAlls(user);

										})

									}else{

										if (userViewList.length>0){
											for(var i=0; i<userViewList.length; i++){
												userDetailsCover.removeChild(userViewList[i]);
											}
											userViewList=[];
										}
										
										if (searchBar.value.length>0){
											
											if (viewList.length>0){
												for(var i=0; i<viewList.length; i++){
													searchResult.removeChild(viewList[i]);
												}
												viewList=[];
											}

											if (userViewList.length>0){
												for(var i=0; i<userViewList.length; i++){
													userDetailsCover.removeChild(userViewList[i]);
												}
												userViewList=[];
											}

											var p= document.createElement("p");
											p.appendChild(document.createTextNode(`No Napsite posses the info of ${searchMethod.value} you entered`));
											p.style.color="red";
											p.style.fontSize="1rem";
											p.style.fontWeight="bold";
											p.style.fontFamily="monospace";
											p.style.fontStyle="italic";
											searchResult.appendChild(p);
											viewList=viewList.concat(p);
										}else{
											bySpecific();
										}
										

									}
									

								})


							}
							else{
								adminSection.style.display="none";
							}
							function initializeUserDetails (newNapsite){
								var userDetailsValue = [newNapsite.FirstName,newNapsite.MiddleName,newNapsite.LastName,newNapsite.UserName,newNapsite.MatricNo,
										newNapsite.Gender,newNapsite.Level,newNapsite.DateOfBirth,newNapsite.HallAllocated,
										newNapsite.ContactNumber,newNapsite.OtherContactNumber,newNapsite.CurrentAddress,
										newNapsite.SchoolEmail,newNapsite.OtherEmail,newNapsite.ParentGuardianName,
										newNapsite.ParentGuardianAddress,newNapsite.ParentGuardianContact,
										newNapsite.ParentGuardianOtherContact];

								return userDetailsValue;
							}
							var userDetailsValue = initializeUserDetails(Napsite);
							var userDetailsName = ["First Name: ","Middle Name: ","Last Name: ","UserName: ","Matric No: ","Gender: ","Level: ",
												"Date Of Birth: ","Hall Allocated: ","Contact Number: ","Other Contact Number: ","Current Address: ",
												"School Email: ","Email: ","Parent/Guardian Name: ","Parent/Guardian Address: ",
												"Parent/Guardian Contact: ","Parent/Guardian Other Contact: "];
							
							function addNapsiteDetail(napsiteName,napsiteValue){
								
								var napsdiv = document.createElement("div");
								var nameTag = document.createElement("span");
								var valueTag = document.createElement("span");
								napsdiv.style.display="inline-flex";								
								valueTag.style.marginLeft="30px";
								nameTag.appendChild(document.createTextNode(`${napsiteName}`));
								valueTag.appendChild(document.createTextNode(`${napsiteValue}`));
								nameTag.style.fontWeight="bold";
								nameTag.style.fontSize="1.5rem";
								valueTag.style.fontStyle="italic";
								nameTag.style.fontFamily="monospace"
								valueTag.style.fontSize="1.5rem";
								napsdiv.appendChild(nameTag);
								napsdiv.appendChild(valueTag);
								var spaceTag = document.createElement("p");
								spaceTag.appendChild(napsdiv);

								// console.log(spaceTag);
								spaceTag.style.marginBottom="50px";
								detailsCover.appendChild(spaceTag);
								widthChangeEffect(x,nameTag,valueTag);
								// x.addListener(widthChangeEffect);
								// console.log(valueTag.style.fontSize);
								editList = editList.concat(spaceTag);														
								// loopCount++;
								// if (loopCount===1){					
																													
									
								// }
							}
							// console.log(sideBar.childNodes[2]);

							function removePreviousDetails(list){
								console.log(list);
								for (var i=0; i<list.length; i++){

									userDetailsCover.removeChild(list[i]);
								}
								
							}

							function editProfile(napsiteName,napsiteValue){

								var editTag = document.createElement("input");
								var napsdiv = document.createElement("div");
									var nameTag = document.createElement("span");
									
								napsdiv.style.display="inline-flex";
																	
								editTag.style.marginLeft="30px";
								editTag.type = "text";
								editTag.value= napsiteValue;
								nameTag.appendChild(document.createTextNode(`${napsiteName}`));
								nameTag.style.fontWeight="bold";
								nameTag.style.fontFamily="monospace"
								nameTag.style.fontSize="1.5rem";
								editTag.style.fontStyle="italic";
								editTag.style.fontSize="1.5rem";
								napsdiv.appendChild(nameTag);
								napsdiv.appendChild(editTag);
								var spaceTag = document.createElement("p");
								
								spaceTag.appendChild(napsdiv);
								spaceTag.style.marginBottom="50px";

								editNewList = editNewList.concat(spaceTag);
								userDetailsCover.appendChild(spaceTag);
								widthChangeEffect(x,nameTag,editTag);
								editTagList = editTagList.concat(editTag);
								
							}

							for (var i=0; i<userDetailsName.length; i++){

								addNapsiteDetail(userDetailsName[i],userDetailsValue[i]);

							}
							widthChangeEffect(x,nameTag,valueTag);
							// x.addListener(widthChangeEffect);
							async function updateProfile(newNapsite1){

								const user = {

									FirstName: editTagList[0].value,
									MiddleName:editTagList[1].value,
									LastName: editTagList[2].value,
									UserName: editTagList[3].value,
									MatricNo: editTagList[4].value,
									Gender:editTagList[5].value,
									Level: editTagList[6].value,
									DateOfBirth: editTagList[7].value,
									HallAllocated: editTagList[8].value,
									ContactNumber: editTagList[9].value,
									OtherContactNumber: editTagList[10].value,
									CurrentAddress: editTagList[11].value,
									SchoolEmail: editTagList[12].value,
									OtherEmail: editTagList[13].value,
									ParentGuardianName: editTagList[14].value,
									ParentGuardianAddress: editTagList[15].value,
									ParentGuardianContact: editTagList[16].value,
									ParentGuardianOtherContact: editTagList[17].value,
									
								}

								const options = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify(user)
								};

								try{
									const response1 = await fetch('/ProfileUpdate', options);	
									const json = await response1.json();	
									proceed = json.sts;
									
									if (proceed===true){
										
										const opts1 = {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											}
										};
										
										const response2= await fetch("/NapsDetails", opts1);
										const User = await response2.json();
										console.log(User.newDetails);
										newNapsite1 = User.newDetails;
										
										removePreviousDetails(editNewList);
										
										userDetailsValue1 = [newNapsite1.FirstName,newNapsite1.MiddleName,newNapsite1.LastName,newNapsite1.UserName,newNapsite1.MatricNo,
																newNapsite1.Gender,newNapsite1.Level,newNapsite1.DateOfBirth,newNapsite1.HallAllocated,
																newNapsite1.ContactNumber,newNapsite1.OtherContactNumber,newNapsite1.CurrentAddress,
																newNapsite1.SchoolEmail,newNapsite1.OtherEmail,newNapsite1.ParentGuardianName,
																newNapsite1.ParentGuardianAddress,newNapsite1.ParentGuardianContact,
																newNapsite1.ParentGuardianOtherContact];
										// console.log(userDetailsValue[7]);

										
										
									}else{

										throw (TypeError);
									}
								}catch (TypeError){
									
									// waitCover.style.display="none";
									// error.innerHTML="Could not Connect to Server. Check your internet Connection, or Contact the administrator at Zerox.com";
									// again.style.display="";
									// goBack.style.display="";
									// errorCover.style.display="inline-block";
									// console.log("Error 404 page not found!!!");
								}

							}
							
							

							function shuffle(array) {
							  var currentIndex = array.length,  randomIndex;
							  while (0 !== currentIndex) {
							    randomIndex = Math.floor(Math.random() * currentIndex);
							    currentIndex--;
							    [array[currentIndex], array[randomIndex]] = [
							      array[randomIndex], array[currentIndex]];
							  }

							  return array;
							}

							imgList = shuffle(imgList);

							var currDiv = sessionStorage.getItem("currDiv-key");
							optionList.forEach( (opt) => {

								if (currDiv!==null){

									if (opt.id===currDiv){

										opt.style.color="black";
										if (sideList.includes(opt)){
											opt.style.color="white";
										}	
										// opt.style.color="white";
										opt.style.fontWeight="bold";
										var activeDiv = document.getElementById(opt.id+"-div");
										activeDiv.style.display="block";

									}else{

										var activeDiv = document.getElementById(opt.id+"-div");
										activeDiv.style.display="none";
									}
								}else {

									if (opt.id===dashSection.id){

										opt.style.color="black";
										if (sideList.includes(opt)){
											opt.style.color="white";
										}
										// opt.style.color="white";
										opt.style.fontWeight="bold";
										var activeDiv = document.getElementById(opt.id+"-div");
										activeDiv.style.display="block";

									}else{

										var activeDiv = document.getElementById(opt.id+"-div");
										activeDiv.style.display="none";
									}
								}
								
								
							});

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

												if (side===sideList){
													topList.forEach((opt) => {
														opt.style.color="#00000099";
														var activeDiv = document.getElementById(opt.id+"-div");
														activeDiv.style.display="none";
														// console.log("no view for, ",opt.id);
													});
												}
												if (side===topList){
													sideList.forEach((opt) => {
														opt.style.color="#999999ff";
														var activeDiv1 = document.getElementById(opt.id+"-div");
														activeDiv1.style.display="none";
														// console.log("no view for, ",opt.id);
													});
												}
												side[i].style.color=viewColor;
												var activeDiv2 = document.getElementById(opts.id+"-div");
												// console.log(opts.id);
												activeDiv2.style.display="block";
												sessionStorage.setItem("currDiv-key",opts.id);


											}else{

												side[i].style.color=original;
												var activeDiv3 = document.getElementById(side[i].id+"-div");
												activeDiv3.style.display="none";
												// console.log("no view for, ",side[i].id);
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
							};
							
							imgFlow.onmouseleave = ()=> {
								
								nt.style.display="none";
								pv.style.display="none";
							};

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
								if (count<0) {
									count=imgList.length-1;
								}

								console.log(count);
								imgFlow.style.backgroundImage=`url('${imgList[count]}')`;

							});

							
							sessionStorage.setItem("dash_key", stringNapsite);
							// console.log(sessionStorage.getItem("dash_key"));

							logSection.addEventListener("click", () => {
								
								sessionStorage.removeItem("user-email");
								sessionStorage.removeItem("user-password");
								sessionStorage.removeItem("dash_key");
								sessionStorage.removeItem("cond_key");
								sessionStorage.removeItem("currDiv-key");
								console.log(sessionStorage.getItem("dash_key"));
								if (sessionStorage.getItem("dash_key")===null){
									// console.log("yes");
									window.open("/NapsPage","_self");
								}
								
							});
							var usrs = {

								Image: Napsite.ProfileImage,
								UserName: Napsite.UserName,
								MatricNo: Napsite.MatricNo,
							}
							
							try{
								const opti = {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify(usrs),
									
								};

								const resps = await fetch('/imagesStore',opti);
								
							}catch(TypeError){

							};
							
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
			
			if(ct!==1){
					
				inputPasswordTip.style.display="flex";
				inputPasswordTip.innerHTML="You have entered an invalid Email or Password!";
			}
			
		}
	});
	
	
}
sign_in.addEventListener("click", async () => {

	if(inputEmail.value==="" && inputPassword.value!=="") {
	
		inputEmailAddressTip.style.display="flex";
		inputEmailAddressTip.innerHTML="Please fill in this field!";

	}else if(inputEmail.value!=="" && inputPassword.value==="") {
		
		inputPasswordTip.style.display="flex";
		inputPasswordTip.innerHTML="Please fill in this field!";

	}else if(inputEmail.value==="" && inputPassword.value==="") {
		
		inputEmailAddressTip.style.display="flex";
		inputEmailAddressTip.innerHTML="Please fill in this field!";
		inputPasswordTip.style.display="flex";
		inputPasswordTip.innerHTML="Please fill in this field!";

	}else{

		inputEmailAddressTip.innerHTML="";
		inputPasswordTip.innerHTML="";
		inputPasswordTip.style.display="none";
		inputEmailAddressTip.style.display="none";
		await inspectLoginDetails().then( ()=> {
			
		});
	
	}

});

var setDash= sessionStorage.getItem("dash_key");

if (setDash!==null){

	
	inspectLoginDetails();
	
}

inputPassword.addEventListener("keyup", function(event) {

	if (event.keyCode===13){

		event.preventDefault();
		sign_in.click();
	}
})
inputEmail.addEventListener("keyup", function(event) {

	if (event.keyCode===13){

		event.preventDefault();
		sign_in.click();
	}
})

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



