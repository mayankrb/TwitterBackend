import {Router} from 'express';
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

//User CRUD

//create user
router.post('/', (req, res) => {
    res.status(501).json({error: "Not Implemented"});
})

//list user
router.get('/', (req, res)=> {
    res.status(501).json({error: "Not implemented"});
})

//get one user
router.get('/:id', (req, res)=> {
    const {id} = req.params;
    res.status(501).json({error: `Not implemented: ${id}`});
})

//update user
router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const {bio, name, image} = req.body;
    try{
        const result = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data : { bio, name, image}
        })
        res.json(result)
    }catch(e){
        res.status(400).json({error: `Failed to update the user`});
    }
});

//delete user
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    res.status(501).json({error: `Delete not implemented for ${id}`});
});

export default router;
