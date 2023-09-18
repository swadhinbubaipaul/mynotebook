const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, async () => {
	try {
		await connectToMongo();
		console.log(`Mynotebook listening at http://localhost:${port}`);
	} catch (err) {
		console.log(err);
	}
});
