const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/mynotebook";

const connectToMongo = async () => {
	await mongoose.connect(mongoURI);
	console.log("Connected to Mongo Successfully");
};

module.exports = connectToMongo;
