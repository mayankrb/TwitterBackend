import {Router} from 'express';
import { PrismaClient } from '@prisma/client';
const router = Router();
const prisma = new PrismaClient();

//Tweet CRUD

//create tweet
router.post('/', async(req, res) => {
    const {content, image, userId} = req.body;
    console.log(content);
    try{
        const createTweet = await prisma.tweet.create({data: {content, image, userId}});
        res.status(200).json(`Tweeted successfully ${content}`);
    }catch(e){
        res.status(400).json(`Error occured while creating the tweet ${e}`);
    }
    
})

//list tweets
router.get('/', async(req, res)=> {
    const allTweets = await prisma.tweet.findMany({
        include : {
            user: {
                select: {
                    id:true, name:true, username:true, image: true
                }
            }
        }
    });
    res.json(allTweets);
})

//get one tweet
router.get('/:id', async(req, res)=> {
    const {id} = req.params;
    try{
        const tweet = await prisma.tweet.findUnique({where :{ id: Number(id)}, include: {user: true}});
        res.json(tweet);
    }catch(e){
        res.status(404).json(`Tweet not found`);
    }
})

//update tweet
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const {userId, content} = req.body;
    try{
        const result = await prisma.tweet.update({
            where: {
                id: Number(id)
            },
            data: {userId, content}
        });
        res.json(result);
    }catch(e){
        res.status(400).json(`Something went wrong ${e}`);
    }
});

//get all tweets by a user
router.get('/user=:userId/tweets', async (req, res)=>{
    try {
        const { userId } = req.params;
        const tweets = await prisma.tweet.findMany({ where: { userId: Number(userId) } });
        res.json(tweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

//delete tweet
router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    const deleteTweet = prisma.tweet.delete({where : {id: Number(id)}});
    res.json("Tweet Deleted");
});

export default router;
