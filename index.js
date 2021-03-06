
// const url ="mongodb+srv://napsite:Napsite@21@cluster0.nm56r.mongodb.net/myFirstDatabase?retryWrites=true&useUnifiedTopology=true&w=majority"
const {MongoClient} = require('mongodb');

const express = require('express');
const app = express();
var newUser;
var createdStatus=false;

app.listen(process.env.PORT || 3000,()=>{
	console.log("listening at 3000");
})
app.use(express.static("client_view"));
app.use(express.json());
app.post('/Registeration_Status',async (req, res) =>{
	console.log('I got a request!');
	console.log(req.body);
	newUser = req.body;
	main().catch(console.error);
	console.log(createdStatus);
	res.json({

		sts: createdStatus

	});
})

async function main(){

	const url ="mongodb://127.0.0.1:27017";
	const client = new MongoClient(url,useUnifiedTopology=true);
	try {

		await client.connect();
		await createListing(client,newUser);
		
	}catch (e){
		console.error(e);

	}finally{
		client.close();
		
	}
	async function createListing(client, newListing){
	    const result = await client.db("napsui").collection("NapsDatabase").insertOne(newListing);
	    createdStatus=true;
				   
	};
}