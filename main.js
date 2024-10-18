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
    insertTable(dataObjects, 'synchronousTable');

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
    var dataObjects = [];
    request.open("GET", "./data/reference.json", true);

    
    request.onload = (e) => {
        if (request.status === 200) {
            dataLocation = (JSON.parse(request.responseText).data_location);
            getDataAsynchronous(dataLocation);

            // Wait until data is retrieved from data location
            setTimeout(() => {
                data3 = getJSONFile("./data/data3.json");
                dataObjects.push(processData(data3));
                insertTable(dataObjects, 'asynchronousTable');
            }, 500);
        }
        else {
            console.error("Error: " + request.status);
        }

    }

    

    function getDataAsynchronous(dataLocation) {
        var dataRequest = new XMLHttpRequest();
        dataLocation = "./data/" + dataLocation;

        dataRequest.open("GET", dataLocation, true);
        dataRequest.send();

        dataRequest.onload = (e) => {
            if (dataRequest.status === 200) {
                var response = JSON.parse(dataRequest.responseText);
                dataObjects.push(processData(response.data));

                // If there is another data_location, call function again
                if(response.data_location) {
                    getDataAsynchronous(response.data_location);
                }
            }
        }
    }

    request.send();

}

// fetch() and Promises Implementation
async function startFetch() {
    var dataObjects = [];
    const response  = await fetch("./data/reference.json");
    const dataLocation = (await response.json()).data_location;
    getDataFetch(dataLocation);
    setTimeout(() => {
        data3 = getJSONFile("./data/data3.json");
        dataObjects.push(processData(data3));
        insertTable(dataObjects, 'fetchTable');
    }, 500);
    // insertTable(dataObjects, 'fetchTable');
    
    
    async function getDataFetch(data) {
        const dataLocation = "./data/" + data;
        const response = (await fetch(dataLocation));
        const responseData = await response.json();
        
        dataObjects.push(processData(responseData.data));
        
        // If another data location exists 
        if(responseData.data_location) {
            getDataFetch(responseData.data_location);
            return responseData.data;
        }
    }
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
function insertTable(data, table) {
    let tableString = "";
    data.forEach((array) => {
        array.forEach(object => {
            tableString += `<tr>
                                <td>${object.name}</td>
                                <td>${object.surname}</td>
                                <td>${object.id}</td>
                            </tr>`
        })
    });
    document.getElementById(table).getElementsByTagName('tbody')[0].innerHTML = tableString;
    document.getElementById(table).getElementsByTagName('thead')[0].innerHTML = `<tr>
                                                                                                    <th>First Name</th>
                                                                                                    <th>Surname</th>
                                                                                                    <th>ID</th>
                                                                                                </tr>`
}




