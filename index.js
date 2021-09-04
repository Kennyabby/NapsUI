
// mongodb://127.0.0.1:27017
// const url ="mongodb+srv://napsite:Napsite@21@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority"
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv/config');
const multer = require('multer');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/images');
	},
	filename: (req, file, cb) => {
		cb(null,Date.now()+'-'+file.originalname);
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
var userUpdate;
var userDetails;
var details;
var matList =[];
var createdStatus=false;
var updatedStatus=false;
var imgFilename="";

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
app.use(express.static("views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
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
app.post('/Upload-profile-pic', upload.single('image'), (req, res, next) => {
	imgFilename = req.file.filename;
	// var obj = {
	// 	name: req.body.name,
	// 	desc: req.body.desc,
	// 	img: {
	// 		data: fs.readFileSync(path.join(__dirname+'/uplaods'+req.file.filename)), 
	// 		contentType: 'image/png'
	// 	}
	// }
	// imgModel.create(obj, (err,item) => {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	// else{
	// 	// 	res.redirect('/');
	// 	// }
	// })
})
app.post('/NapsProfilePics',async (req, res) =>{
	
	await res.json({

		file: imgFilename,

	});
 
	
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
	const url ="mongodb+srv://napsite:Napsite@21@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority";
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








