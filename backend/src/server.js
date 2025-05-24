import app from './app.js';
import ConnectDB from './db/connectDB.js';
import { PORT } from './config/config.js';

ConnectDB();



app.listen(PORT, () => {
    console.log(`Server Up on port ${PORT}!`);
});