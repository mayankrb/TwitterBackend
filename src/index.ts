import express from 'express';
import tweetRoutes from './routes/tweetRoutes';
import userRoutes from './routes/userRoutes';
const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);

app.get('/', (req, res) => {
    res.send('Hello World is running in dev mode');
});
//app.method(PATH, HANDLER)
app.get('/post', (req, res) => {
    res.send('Get post is running in dev mode');
});
app.post('/post', (req, res)=>{
    res.send("In the post method");
});
app.delete('/delete', (req, res)=>{
    res.send("In the delete method");
});


app.listen(3000, ()=>{
    console.log('Server ready at localhost:3000');
})


