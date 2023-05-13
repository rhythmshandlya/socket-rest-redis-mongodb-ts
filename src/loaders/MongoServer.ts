import mongoose from "mongoose";
import config from "../common/config";

async function connectMongoServer() {
  try {
    console.log("Trying to connect to mongo database at", config.mongoURI);
    await mongoose.connect(config.mongoURI);
    console.log("Connected to the mongo database!");
  } catch (e) {
    console.log(e);
  }
}

export default connectMongoServer;
