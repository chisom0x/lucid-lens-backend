import { createServer } from './app.js';
import http from 'http';

const PORT = 3000;

const startServer = async () => {
  try {
    const app = createServer();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
