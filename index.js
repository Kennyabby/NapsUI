
// const url ="mongodb+srv://napsite:Napsite@21@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority"
const {MongoClient} = require('mongodb');

const express = require('express');
const app = express();
const bodyParser= require('body-parser');
var newUser;
var matList =[];
var createdStatus=false;

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
app.get('/Sign-in', (req,res) => {
	res.render("signin.ejs", {});
});
app.get('/Register|Sign-up', (req,res) => {
	res.render("signup.ejs", {});
});
app.get('/Events', (req,res) => {
	res.send("Naps Events will be ready and available soon..");
});
app.get('/About', (req,res) => {
	res.send("Our About Page will be ready shortly..");
});
app.post('/MatricList',async (req, res) =>{
	console.log("got the request for Matric List");
	await main("findMatric").catch(console.error).then(()=>{

		res.json({

			matricList: matList

		});	
	});
	
	
})
app.post('/Registeration_Status',async (req, res) =>{
	
	newUser = await req.body;

	await main("insertOneUser").catch(console.error).then(()=>{

		res.json({

			sts: createdStatus

		});
	});
	
})

async function main(action){

	const url ="mongodb://127.0.0.1:27017";
	const client = new MongoClient(url,{useUnifiedTopology:true});
	try {

		await client.connect();
		if (action==="insertOneUser"){
			await createListing(client,newUser);	
		}
		if (action==="findMatric"){

			await findListing(client,"MatricNo").catch(console.error);
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
		console.log("fetching matric list");
		const result = await client.db("napsui").collection("NapsDatabase").find({},{ projection: {_id:0,MatricNo: 1}});
		var mat = await result.toArray();
		matList=[];
		for(var i=0; i<mat.length; i++){
			matList = matList.concat(mat[i].MatricNo);
		}
		console.log(matList);
		
	}
}