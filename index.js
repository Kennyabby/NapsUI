

const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')
const express = require('express');
const aws = require('aws-sdk');
const app = express();
const bodyParser= require('body-parser');
const fs = require('fs');
const path = require('path');
const S3_BUCKET = "naps-ui-bucket2021";
aws.config.region = 'us-east-2';
require('dotenv/config');
const multer = require('multer');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './views/profile/images');
	},
	filename: (req, file, cb) => {
		cb(null,Date.now()+'-'+imgStore.MatricNo+file.originalname.slice(
			file.originalname.indexOf("."),));
	}
});
var imgModel = require('./model');
var upload = multer({ 
	storage: storage,
	limits: {
		fieldSize: 1024*1024*3,
	}
});

var newUser;
var imgStore;
var userUpdate;
var userDetails;
var details;
var matList =[];
var imList=[];
var sImList=[];
var createdStatus=false;
var updatedStatus=false;
var imgFilenames="";

// app.get('/', (req,res)=>{
// 	imgModel.find({}, (err,items) =>{
// 		if(err){
// 			console.log(err);
// 			res.status(500).send('An error occured', err);
// 		}else{
// 			res.render('imagesPage',{items: items});
// 		}
// 	})
// })


app.listen(process.env.PORT || 3000,()=>{
	console.log("listening at 3000");
})
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(express.static("views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get('/sign-s3', (req, res) => {
	console.log("sign-s3 called");
  const s3 = new aws.S3({
  	accessKeyId: process.env.ACCESS_KEY_ID,
  	secretAccessKey: process.env.SECRETE_ACCESS_KEY
  });
  const imgFilename = `./views/profile/images/${imgFilenames}`;
  const fileType = req.query['file-type'];
  const fileContent = fs.readFileSync(imgFilename);
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: imgFilenames,
    Body: fileContent,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
  sImList = sImList.concat(s3Params);
	// console.log(sImList);
	if(imgStore.Image!=="" && imgStore.Image!==undefined){
		console.log("creating params");
		const fileContents = fs.readFileSync(`./views/profile/images/${imgStore.Image}`);
		const s3Paramss = {

	    Bucket: S3_BUCKET,
	    Key: imgStore.Image,
	    Body: fileContents,
	    Expires: 60,
	    ContentType: fileType,
	    ACL: 'public-read'
	  };
		sImList = sImList.concat(s3Paramss);	
		console.log(sImList);
	}
	if(sImList.length>1){
		console.log("getting ready to delete");
		 sImList.forEach((file)=>{
			if(file!==s3Params){
				console.log("got one",file);
				s3.deleteObject({Bucket: file.Bucket, Key: file.Key}, function(err, data) {
					console.log("deleting");
			   if (err) {
			    console.log(err);
			   } else {
			    // resolve(data);
			    console.log(`deleted this: ${file}`);
			   }
			  });
				sImList.splice(sImList.indexOf(file),1);
				
			}
			
		})
	}
	if(imList.length>1){
		imList.forEach((file)=>{
			if(file!==imgFilenames){
				fs.unlinkSync(`./views/profile/images/${file}`);
				imList.splice(imList.indexOf(file),1);
				console.log(`deleted ./views/profile/images/${file}`);
			}
			
		})
	}
	
	s3.putObject(s3Params, function(err, data){
	  if (!err) 
	    { 
	        // callbackOk(fileName, imgFilenames);
	        console.log('succesfully uploaded the image!');

	        s3.getSignedUrl('putObject', s3Params, (err, data) => {

				  	console.log("in signed url");
				    if(err){
				      console.log(err);
				      return res.end();
				    }
				    console.log("past error");
				    const returnData = {
				      signedRequest: s3Params,
				      url: `https://naps-ui-bucket2021.s3.amazonaws.com/${imgFilenames}`
				    };
				    console.log("data returned");
				    console.log(returnData.url);
				    res.write(JSON.stringify(returnData));
				    res.end();
				  });

	    } else {
	        console.log('Error uploading data: ', s3Params); 
	        // callbackFail();
	    }
	});
  
  
  
});
app.get('/', (req,res) => {
	res.render("index.ejs", {});
})
app.get('/NapsPage', (req,res) => {
	res.render("signin.ejs", {});
});
app.get('/Sign-out', (req,res) => {
	res.render("signin.ejs", {});
	url="";
});
app.get('/Register', (req,res) => {
	res.render("signup.ejs", {});
});
app.get('/Dashboard', (req,res) => {
	res.render("dashboard.ejs", {});
});
app.get('/Events', (req,res) => {
	res.send("Naps Events will be ready and available soon..");
});
app.get('/About', (req,res) => {
	res.send("Our About Page will be ready shortly..");
});

app.post('/Upload-profile-pic', upload.single('image'), async (req, res, next) => {
	imgFilenames = req.file.filename;
	imList = imList.concat(imgFilenames);
	console.log(imList);
	

})
app.post('/UploadProfilePics', upload.single('image'), async (req, res, next) => {
	imgFilenames = req.file.filename;
	if(imgStore.Image!==""){
		imList = imList.concat(`${imgStore.Image}`);	
	}
	imList = imList.concat(imgFilenames);
	
});
app.post('/NapsProfilePics',async (req, res) =>{
				

	await res.json({
		file: imgFilenames,
	});

 
})
app.post('/imagesStore',async (req, res) =>{
	
	imgStore = await req.body;
	
 
})

app.post('/MatricList',async (req, res) =>{
	// console.log("got the request for Matric List");
	await main("findMatric").catch(console.error).then(()=>{

		res.json({

			matricList: matList

		});	
	});
	
})
app.post('/Registeration_Status',async (req, res) =>{
	
	newUser = await req.body;
	newUser.ProfileImage=imgFilename;
	console.log(imgFilename);

	await main("insertOneUser").catch(console.error).then(()=>{

		res.json({

			sts: createdStatus

		});
	});
	
})
app.post('/ProfileUpdate',async (req, res) =>{
	console.log("got request for profile update");
	userUpdate = await req.body;


	await main("updateOneUser").catch(console.error).then(()=>{
		console.log("in the main function");
		res.json({

			sts: updatedStatus

		});
	});
	
})

app.post('/LoginDetails',async (req, res) =>{
	// console.log("got the request for LoginDetails");
	await main("LoginDetails").catch(console.error).then(()=>{

		res.json({

			detailsList: details

		});	

		// console.log(details);
	});
	
	
});

app.post('/Dash',async (req, res) =>{
	
	userDetails = await req.body;
	if (userDetails!= null){

		res.json({

			sts: true

		});
	}
	
	// console.log("userDetails are:")
	// console.log(userDetails);
	
});

app.post('/NapsDetails',async (req, res) =>{
	
	await res.json({

		details: userDetails,
		newDetails:userUpdate

	});
 
	
})

async function main(action){
	const url =process.env.MONGO_URL;
	const client = new MongoClient(url,{useUnifiedTopology:true});
	try {

		await client.connect();
		if (action==="insertOneUser"){
			await createListing(client,newUser);	
		}
		if (action==="findMatric"){

			await findListing(client,"MatricNo").catch(console.error);
		}
		if (action==="LoginDetails"){

			await findDetails(client,"LoginDetails").catch(console.error);
		}
		if (action==="updateOneUser"){
			await updateListing(client,userUpdate.MatricNo,userUpdate).catch(console.error);
		}
		
	}catch (e){
		console.error(e);

	}finally{
		client.close();
		
	}
	async function createListing(client, newListing){
	    const result = await client.db("napsui").collection("NapsDatabase").insertOne(newListing);
		createdStatus=true;		  
	};
	async function findListing(client,name){
		// console.log("fetching matric list");
		const result = await client.db("napsui").collection("NapsDatabase").find({},{ projection: {_id:0,MatricNo: 1}});
		var mat = await result.toArray();
		matList=[];
		for(var i=0; i<mat.length; i++){
			matList = matList.concat(mat[i].MatricNo);
		}
		// console.log(matList);
	}
	async function findDetails(client,name){
		// console.log("fetching email list");
		const result = await client.db("napsui").collection("NapsDatabase").find({});
		details = await result.toArray();
		
	};
	async function updateListing(client, matricNo, updatedListing) {

		const result = await client.db("napsui").collection("NapsDatabase").updateOne({ MatricNo: matricNo }, { $set: updatedListing });
       	updatedStatus=true;
    	// console.log(details1);
    	// console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    };
}








