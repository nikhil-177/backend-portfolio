import 'dotenv/config';
import app from './app.js';
import { connectdb } from './config/db.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log('failed to connect database', error);
    process.exit(1);
  }
}
startServer();
