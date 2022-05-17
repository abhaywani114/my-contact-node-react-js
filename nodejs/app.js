//console.log("Bismillah");
require('dotenv').config();
const express = require('express');
const path = require("path");
const connectDB = require('./db/connect');
const contactRoutes = require('./routes/contact.js');

const app = express();
app.use('/api/v1', contactRoutes);
app.use(express.static(path.resolve(__dirname, "..", "reactjs","build")));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,"..", "reactjs", 'build', 'index.html'));
});


const startServer = async () => {
	try {

		await connectDB(process.env.DB_URL);
		console.log("Database connected...");

		const port = process.env.SERVER_PORT || 5000;
		app.listen(port, () => (
			console.log(`Server is listening at port ${port}`)));
		
	} catch (err) {
		console.log({err});
	}
}

app.use((req, res, next) => {
	console.log(`Request ${req.method} ${req.url} from ${req.ip}`);
	next();
});

startServer();
