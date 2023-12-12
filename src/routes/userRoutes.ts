import {Router} from 'express';
const router = Router();


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
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    res.status(501).json({error: `Put not implemented for ${id}`});
});

//delete user
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    res.status(501).json({error: `Delete not implemented for ${id}`});
});

export default router;
