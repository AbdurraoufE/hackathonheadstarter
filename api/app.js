import express from 'express';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute); 


app.listen(8800, () => {
    console.log('Server: 8800 Running...');
});
