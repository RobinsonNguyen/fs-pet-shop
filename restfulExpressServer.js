const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;
const client = require('./db');


app.get('/pets', async (req, res) =>{
    try {
        const result = await client.query(`SELECT * from pets_table;`);
        res.json(results.rows).status(200);
    } catch (error){
        res.status(500).type('text/plain').send(error);
    }
})


app.get('/pets/:id', async (req, res) =>{
    try {
        const result = await client.query(`SELECT * from pets_table WHERE pets_id = ${req.params.id};`);
        if(result.rowCount === 0){
            res.status(404).type('text/plain').send('Not Found')
        } else
            res.json(result.rows);
    } catch (error){
        res.status(500).type('text/plain').send(error);
    }
})

app.post('/pets', async (req, res) => {
    try{
        const {age, kind, name} = req.body;
        console.log(`INSERT INTO pets_table (age, kind, name) VALUES (${age},'${kind}','${name}');`);
        await client.query(`INSERT INTO pets_table (age, kind, name) VALUES (${age},'${kind}','${name}');`);
        const returnResult = await client.query(`SELECT * from pets_table ORDER BY pets_id DESC LIMIT 1`);
        res.send(returnResult.rows).status(201); 
    } catch (error){

    }
})



app.patch('/pets/:id', async (req, res) =>{
    try{
        const {age, kind, name} = req.body;
        let newAge = null;
        let newKind = null;
        let newName = null;
        if(age !== undefined){
            newAge = age;
        }
        if(kind !== undefined){
            newKind = `'${kind}'`;
        }
        if(name !== undefined){
            newName = `'${name}'`;
        }
        // console.log(`UPDATE pets_table SET age = COALESCE(${newAge},${age}), kind = COALESCE(${newKind},${kind}), name = COALESCE(${newName}, ${name}) WHERE pets_id = ${req.params.id};`);

        await client.query(`UPDATE pets_table SET age = COALESCE(${newAge},age), kind = COALESCE(${newKind},kind), name = COALESCE(${newName}, name) WHERE pets_id = ${req.params.id};`);    
        const returnResult = await client.query(`SELECT * from pets_table WHERE pets_id = ${req.params.id};`);
        res.send(returnResult.rows).status(240);    
    } catch (error){
        res.status(500).json({error})
    }
})

app.delete('/pets/:id', async (req, res) => {
    try {
        const returnResult = await client.query(`SELECT * from pets_table WHERE pets_id = ${req.params.id};`);
        await client.query(`DELETE FROM pets_table WHERE pets_id =  ${req.params.id}`)
        res.send(returnResult.rows).status(200);
    } catch (error) {

    }
})

app.listen(PORT, function(){
    console.log(`server is listening`);
})


// for key in body set ${key} = ${body.key}
// await pool.query('Update set name = $1, age = $2, kind = $3 where pet_id = $4', [name,age, kind,id])

// try{

// }catch (err){
//     res.status(500).json({error:err});
// }