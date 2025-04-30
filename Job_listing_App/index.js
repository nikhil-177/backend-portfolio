import 'dotenv/config';
import app from './app.js';
import { connectDb } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
