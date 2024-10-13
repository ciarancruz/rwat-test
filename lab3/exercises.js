const STUDENT_DATA_JSON = '[' + 
'{"name": "Annie Apple","id": "X00111111","address": "Phibsboro, D7","grades": [0, 0, 0, 53, 0, 62]},' + 
'{"name": "Ben Bounce","id": "B00111111","address": "Rathmines, D6","grades": [44, 22, 77, 33, 41, 50]},' +
'{"name": "Charlie Curry","id": "B00222222","address": "Phibsboro, D7","grades": [80, 88, 75, 81, 90, 77]},' +
'{"name": "Dan Dreamer","id": "X00222222","address": "Cabra, D7","grades": [64, 55, 66, 65, 78, 62]},' +
'{"name": "Emmy Ember","id": "X00333333","address": "Stoneybatter, D7","grades": [53, 55, 55, 52, 51, 60]},' +
'{"name": "Fiona Falls","id": "C00111111","address": "Grangegorman, D7","grades": [90, 91, 88, 80, 81, 97]},' +
'{"name": "Georgina Gull","id": "C00222222","address": "City Centre, D1","grades": [76, 67, 63, 71, 55, 82]},' +
'{"name": "Harry Hops","id": "C00333333","address": "Cabra, D7","grades": [50, 33, 55, 11, 42, 61]},' +
'{"name": "Iris Indie","id": "X00444444","address": "Tallaght, D24","grades": [61, 71, 58, 70, 65, 67]},' +
'{"name": "Jack Jobs","id": "C00444444","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' +
'{"name": "Kat Kid","id": "C00555555","address": "Grangegorman, D7","grades": [41, 41, 50, 48, 55, 44]},' +
'{"name": "Lula Lock","id": "C00666666","address": "Cabra, D7","grades": [77, 80, 85, 80, 78, 81]}' + 
']';

const studentData = JSON.parse(STUDENT_DATA_JSON);

getStudentIDs(studentData);
const newList = newStudentList(studentData);
displayStudentList(newList, 'studentTable1');

// Displaying failed students
const failedList = findFailedStudents(newList);
displayFailedStudents(failedList, "failedStudents");

// Calculating class average
const classAverage = calculateAverage(newList);
document.getElementById("classAvg").innerHTML = classAverage;

// Print list of student IDs
function getStudentIDs(data) {
    const studentIDs = data.map(student => student.id).join(', ');
    document.getElementById("studentID").innerHTML = studentIDs;
}

// Create a new student list
function newStudentList(data) {
    const avg = data.map(student => student.grades.reduce((a, b) => a+b, 0) / student.grades.length)
    const bestAvg = Math.max(...avg);

    const newList = data.map((student, index) => {
        const [name, surname] = student.name.split(' ');
        const [town, postcode] = student.address.split(', ');
        const id = student.id;
        const average = avg[index];
        let resultCategory = '';
        if(average >= 40 && average === bestAvg) {
            resultCategory = 'A';
        }
        else if (average >= 40) {
            resultCategory = 'P';
        }
        else {
            resultCategory = 'F';
        }
        
        return {
            firstName: name,
            surname: surname,
            town: town,
            postcode: postcode.replace('D', ''),
            averageGrade: average.toFixed(2),
            resultCategory: resultCategory,
            id: id
        }
    });

    const printString = newList.map((student) => {

        return `<tr>
                    <td>${student.firstName}</td>
                    <td>${student.surname}</td>
                    <td>${student.town}</td>
                    <td>${student.postcode.replace('D', '')}</td>
                    <td>${student.averageGrade}</td>
                    <td>${student.resultCategory}</td>
                </tr>`
    });
        
    document.getElementById('studentTable').getElementsByTagName('tbody')[0].innerHTML = printString.join('');

    return newList;
}


// Display student results
function displayStudentList(data, table) {
    const printString = data.map((student) => {

        return `<tr>
                    <td>${student.firstName}</td>
                    <td>${student.surname}</td>
                    <td>${student.id}</td>
                    <td>${student.resultCategory}</td>
                </tr>`
    });
        
    document.getElementById(table).getElementsByTagName('tbody')[0].innerHTML = printString.join('');

}

// Find students who failed
function findFailedStudents(data) {
    const failedList = data.map((student) => {
        let isFailed = true;
        
        if(student.resultCategory === 'P' || student.resultCategory === 'A') {
            isFailed = false;
        }

        return {
            firstName: student.firstName,
            surname: student.surname,
            town: student.town,
            postcode: student.postcode,
            averageGrade: student.averageGrade,
            resultCategory: student.resultCategory,
            id: student.id,
            fail: isFailed
        }
    });
    return failedList
}

// Show the students who failed
function displayFailedStudents(data, table) {
    const printString = data
        .filter(student => student.fail)
        .map((student) => {
            return `<tr>
                    <td>${student.firstName}</td>
                    <td>${student.surname}</td>
                    <td>${student.id}</td>
                    <td>${student.resultCategory}</td>
                </tr>`
    });
        
    document.getElementById(table).getElementsByTagName('tbody')[0].innerHTML = printString.join('');
}

// Calculate the class average
function calculateAverage(data) {
    const allGrades = data.map(student => student.averageGrade);
    const getSum = (total, num) => total + Math.round(num);
    return allGrades.reduce(getSum, 0) / allGrades.length;
}


// Exercise 3: Function Currying
function template(strings, ...keys) {
    return (...values) => {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join("");
    };
}

// Pass Messages
const passTemplate = template`Dear ${0}, your average result for the semester is ${1}. Congratulations on your progression to the next semester!`;
const passMessages = newList
        .filter(student => student.averageGrade >= 40)
        .map(student => {
    return passTemplate(student.firstName, student.averageGrade); 
});
document.getElementById("passMessages").innerHTML = passMessages;

// Fail Messages
const failTemplate = template`Dear ${0}, your average result for the semester is ${1}. Unfortunately, you have not passed and will have to repeat some exams.`;
const failMessages = newList
        .filter(student => student.averageGrade < 40)
        .map(student => {
    return failTemplate(student.firstName, student.averageGrade); 
});
document.getElementById("failMessages").innerHTML = failMessages;

// Best Messages
const bestTemplate = template`Dear ${0}, your average result for the semester is ${1}. Congratulations, you have won the Best in Class Award!`;
const bestMessage = newList
        .filter(student => student.resultCategory === 'A')
        .map(student => {
    return bestTemplate(student.firstName, student.averageGrade); 
});
document.getElementById("bestMessages").innerHTML = bestMessage;



// Exercise 4: Generators
async function* generatorFunction() {
    let index = 0;
    while (true) {
        const name = newList[index % newList.length];

        const randomDelay = Math.random() * 3000; 
        await new Promise(resolve => setTimeout(resolve, randomDelay)); 
        yield `Hello ${name.firstName}, welcome to the new semester!`;

        index++; 
    }
}

async function displayMessages() {
    const welcomeMessage = document.getElementById("welcome");
    const generator = generatorFunction();

    for await (const message of generator) {
        welcomeMessage.innerHTML = message;
    }
}
displayMessages();
