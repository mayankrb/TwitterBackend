import {Router} from 'express';
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

//User CRUD

//create user
router.post('/', async(req, res) => {
    const user = req.body;
    console.log(user);
    const createUser = await prisma.user.create({data: user})
    res.status(200).json(`User added ${user}`);
})

//list user
router.get('/', async (req, res)=> {
    const users = await prisma.user.findMany({
        select: {
            id: true, 
            name:true, 
            image:true
        }
    });
    res.json(users);
})

//get one user
router.get('/:id', async(req, res)=> {
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where : { id: Number(id)},
            include: {tweets :true},
        });
        res.json(user);
    }catch(e){
        res.status(400).json(`User with id ${id} not found`);
    }
})

//update user
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const {bio, name, image} = req.body;
    console.log(`${bio}, ${name}, ${image}`)
    try{
        const result = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data : { bio, name, image}
        });
        res.json(result);
    }catch(e){
        res.status(400).json({error: `Failed to update the user`});
    }
});

//delete user
router.delete('/:id', async(req, res)=>{
    const {id} = req.params;
    await prisma.user.delete({where: {id: Number(id)}});
    res.sendStatus(200);
});

export default router;
