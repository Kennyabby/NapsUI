const express = require('express');
const app = express();

app.listen(process.env.PORT || 3000,()=>{
	console.log("listening at 3000");
})
app.use(express.static("client_view"));