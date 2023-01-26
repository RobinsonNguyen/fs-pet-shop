const express = require('express');
const app = express();
app.use(express.json());
// const client = require('./db')
const PORT = process.env.PORT || 8000;

const petsRouter = require('./routes/pets.js');
app.use('/pets', petsRouter);

// app.get('/', async (req, res) =>{
//     try{
//         const result = await client.query(`SELECT * FROM pets_table;`);
//         res.send(result.rows);
//     }catch (err){
//         console.log({err:err});
//         res.send(err);
//         next();
//     }
//     return;
// })




app.listen(PORT, () => console.log('fakeExpress listening...'));