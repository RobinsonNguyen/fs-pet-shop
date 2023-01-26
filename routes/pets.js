const express = require('express');
const router = express.Router();
const pool = require('../db');
const queries = require('../queries');
express().use(express.json());

router.get('/', basicAuth, async(req, res) => {
    try{
        const result = await pool.query(queries.getAllPets);
        res.send(result.rows);
    } catch (err){

    }
})

router.get('/:id', basicAuth, getPet, (req, res) => {
    res.send(res.pets.rows);
})

router.post('/', basicAuth, (req, res) => {
    const {age, kind, name} = req.body;
    try{
        const result = pool.query(queries.addPet, [age, kind, name]);
        res.status(201).send('success');
    } catch (err){

    }
    
})
router.patch('/:id', basicAuth, getPet, (req, res) => {
    
})
router.delete('/:id',basicAuth, getPet, (req, res) => {
    
})

async function getPet(req, res, next){
    let result;
    try{    
        result = await pool.query(queries.getPetById,[`${req.params.id}`]);
        if(result.rowCount === 0){
            return res.status(404).json({message: 'Cannot find this pet'});
        }
    }catch (err){
        return res.status(500).json({message: err.message});
    }
    res.pets = result;
    next();
}

function basicAuth(req, res, next){
    console.log('authorizing...');
    const auth = req.headers.authorization;
    if(!auth){
        return res.status(403).send({message: "You are forbidden"});
    }
    const decoded = Buffer.from(auth.substring(6), 'base64').toString('ascii');
    //decoded is username:password
    const [username, password] = decoded.split(':');
    console.log(username, password);
    next();
}
module.exports = router;