import mongoose, { Connection } from "mongoose";

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

let cached = global.mongoose as Cached;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async (): Promise<Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL!)
      .then((m) => m.connection); // 👈 THIS is the key line
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
