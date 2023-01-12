const fs = require('fs');
var http = require('http');
const petRegExp = /^\/pets\/(.*)$/;
var PORT = 8000
var server = http.createServer(function(request, response){
    if (request.method === 'GET'){
        fs.readFile('./pets.json', 'utf-8', (err, data) => {
            if (err) { 
                console.log('error')
            } else {
                var url = request.url;
                var urlArray = url.split('/')
                // console.log(urlArray[2])
                var dataFile = JSON.parse(data)
                var arrParse = parseInt(urlArray[2])
                //if it does not exist, it will return all pets
                if (urlArray[1] === 'pets'){
                    if (!urlArray[2]){
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json')
                        //.end sends data to the requestor
                        response.end(JSON.stringify(dataFile))
                        //if it does exist but input is out of bounds
                    } else if(!dataFile[arrParse]){
                        response.statusCode = 404
                        response.setHeader('Content-Type', 'text/plain')
                        response.end('not found')
                        //urlArray does exist and input is within bounds
                    } else{
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json')
                        //.end sends data to the requestor
                        response.end(JSON.stringify(dataFile[arrParse]))
                    }
                }else {
                    response.statusCode = 404
                    response.setHeader('Content-Type', 'text/plain')
                    response.end('not found')
                }
            }
        })
    } else if (request.method === 'POST'){
        var url = request.url;
        var urlArray = url.split('/')
        if (urlArray[1] === 'pets'){
            request.on('data', function(data){
                var petObj = JSON.parse(data.toString());
                if(petObj.name && petObj.age && petObj.kind){
                    console.log('in post');
                    fs.readFile('./pets.json', 'utf-8', (err, data) => {
                        if (err) { 
                            console.log('error')
                        } else {
                            
                            var petsArray = JSON.parse(data);
                            var newPet = {
                                age: petObj.age,
                                kind: petObj.kind,
                                name: petObj.name
                            }
                            petsArray.push(newPet)
                            fs.writeFile('pets.json', JSON.stringify(petsArray), function(error){
                                if(error){
                                    console.log('create error')
                                }
                            })
                            response.statusCode = 200;
                            response.setHeader('Content-Type', 'application/json')
                            response.end(JSON.stringify(petObj))
                        }
                    })
                } else{
                    response.statusCode = 400;
                    response.setHeader('Content-Type', 'text/plain')
                    response.end('Bad Request')
                }
            })
        }
    }
})

server.listen(PORT, function(){
    console.log('listen', PORT)
})

