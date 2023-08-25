const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 5000;

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, async () => {
	try {
		await connectToMongo();
		console.log(`App listening on http://localhost:${port}`);
	} catch (err) {
		console.log(err);
	}
});
