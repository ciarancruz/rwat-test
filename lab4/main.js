// Synchronous Implementation
function startSynchronous() {
    const dataLocationRequest = new XMLHttpRequest();

    // Store location of next file
    var dataLocation;

    var dataObjects = [];

    dataLocationRequest.open("GET", "./data/reference.json", false);
    dataLocationRequest.send();

    if (dataLocationRequest.status === 200) {
        reqListener();
    }
    else {
        console.log("Error");
    }

    data3 = getJSONFile("./data/data3.json");
    dataObjects.push(processData(data3));
    console.log(dataObjects);
    insertTable(dataObjects);

    function reqListener() {
        var response = JSON.parse(dataLocationRequest.responseText);
        dataLocation = response.data_location;
        getDataSynchronous(dataLocation);
    }

    function getDataSynchronous(dataLocation) {
        const dataRequest = new XMLHttpRequest();
        dataLocation = "./data/" + dataLocation;
    
        dataRequest.open("GET", dataLocation, false);
        dataRequest.send();
    
        
        if(dataRequest.status === 200) {
            var response = JSON.parse(dataRequest.responseText);
    
            dataObjects.push(processData(response.data));
            
            // If there is another data_location, call function again
            if(response.data_location) {
                getDataSynchronous(response.data_location);
            }
        }
        else {
            console.error("Error: " + dataRequest.status);
        }
    }
}

// Asynchronous Implementation 
function startAsynchronous() {
    const request = new XMLHttpRequest();
    var dataLocation;
    request.open("GET", "./data/reference.json", true);

    
    request.onload = (e) => {
        if (request.status === 200) {
            dataLocation = (JSON.parse(request.responseText).data_location);
        }
        else {
            console.error("Error: " + request.status);
        }

    }

    request.send();

}

// Return only the firstname, surname and id
function processData(data) {
    const processedData = data.map(person => {
        const [name, surname] = person.name.split(' ');
        const id = person.id;

        return {
            name: name,
            surname: surname,
            id: id
        }
    });
    return processedData;
}

function getJSONFile(dataLocation) {
    var request = new XMLHttpRequest();
    request.open("GET", dataLocation, false);
    request.send();

    if (request.status === 200) {
        return JSON.parse(request.responseText).data;
    }
}

// Display Table
function insertTable(data) {
    let tableString = ""
    data.forEach((array) => {
        array.forEach(object => {
            tableString += `<tr>
                                <td>${object.name}</td>
                                <td>${object.surname}</td>
                                <td>${object.id}</td>
                            </tr>`
        })
    });
    document.getElementById('synchronousTable').getElementsByTagName('tbody')[0].innerHTML = tableString;
    document.getElementById('synchronousTable').getElementsByTagName('thead')[0].innerHTML = `<tr>
                                                                                                    <th>First Name</th>
                                                                                                    <th>Surname</th>
                                                                                                    <th>ID</th>
                                                                                                </tr>`
}








