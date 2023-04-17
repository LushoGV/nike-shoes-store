import { connect, connection } from "mongoose";

const DB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/nikeStore";

const conn: { isConnected: any } = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) return;

  const db = await connect(DB_URL);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
