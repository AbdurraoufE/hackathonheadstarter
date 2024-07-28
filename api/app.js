import express from 'express';
import cookieParser from "cookie-parser";
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

//gets the json data
app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute); 


app.listen(8800, () => {
    console.log('Server: 8800 Running...');
});
