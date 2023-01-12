#!node
var command = process.argv[2];

var fs = require('fs');


if (command === 'read'){
    fs.readFile('pets.json', 'utf8', function(error, data){
        var index = process.argv[3];
        if(error){
            throw error;
        } else {
            var petsArray = JSON.parse(data);
            if(!index){
                console.log(petsArray);
            }else if(!petsArray[index]){
                console.log('Usage: node pets.js read INDEX')
            }else{
                console.log(petsArray[index]);
            }
        }
    })
} else if(command === 'create'){
    fs.readFile('pets.json', 'utf8', function(error, data){
        var ageInput = parseInt(process.argv[3]);
        var kindInput = process.argv[4];
        var nameInput = process.argv[5];
        if(error){
            throw error;
        } else if(!ageInput || !kindInput || !nameInput){
            console.log('Usage: node pets.js create AGE KIND NAME');
        } else {
            var petsArray = JSON.parse(data);
            var newPet = {
                age: ageInput,
                kind: kindInput,
                name: nameInput
            }
            petsArray.push(newPet)
            fs.writeFile('pets.json', JSON.stringify(petsArray), function(error){
                if(error)
                    console.log('create error')
            })
        }
    })
} else if(command === 'update'){
    var indexInput = process.argv[3];
    var ageInput = parseInt(process.argv[4]);
    var kindInput = process.argv[5];
    var nameInput = process.argv[6];
    if(!indexInput || !ageInput || !kindInput || !nameInput){
        console.log('Usage: node pets.js update INDEX AGE KIND NAME')
        process.exit(1);
    }
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error){
            process.exit(1);
        }else {
            var petsArray = JSON.parse(data);
            if(!petsArray[indexInput]){
                console.log('Usage: node pets.js update INDEX AGE KIND NAME')
                process.exit(1);
            }
            else{
                petsArray[indexInput].age = ageInput;
                petsArray[indexInput].kind = kindInput;
                petsArray[indexInput].name = nameInput;
                fs.writeFile('pets.json', JSON.stringify(petsArray), function(error){
                    if(error)
                        console.log('create error')
                })
            }
        }
    })
}else if(command === 'destroy'){
    var indexInput = process.argv[3];

    if (!indexInput) {
        console.log('Usage: node pets.js update INDEX AGE KIND NAME')
        process.exit(1);
    }
    fs.readFile('pets.json', 'utf8', function(error, data){
        if(error){
            process.exit(1)
        }else{
            var petsArray = JSON.parse(data);
            if(!petsArray[indexInput]){
                console.log('Usage: node pets.js destroy INDEX')
                process.exit(1);
        }else{
            petsArray.splice(indexInput,1)
            fs.writeFile('pets.json', JSON.stringify(petsArray), function(error) {
                if(error){
                    process.exit(1)
                }
            })
        }
    }
    })
    
}else {
    console.log('Usage: node pets.js [read | create | update | destroy]')
}