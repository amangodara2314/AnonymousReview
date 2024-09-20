// lib/db.js

import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectToDatabase() {
  // Check if already connected
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Connect to the MongoDB database using Mongoose
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = !!db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Could not connect to the database");
  }
}
