import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://nagwanirishab:${process.env.DB_PASSWORD}@patreonclonecluster.zxcqy.mongodb.net/?retryWrites=true&w=majority&appName=patreonclonecluster`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDb;
