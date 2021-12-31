document.querySelector(".get-data").addEventListener("click", onClick);
document.querySelector(".add-data").addEventListener("click", onAddClick);
let allEmployee = [];
let crntEmployee = [];
let crnt = 0;


function onClick() {
    const $questDivision = document.querySelector(".quest-dvsn-wrapper");
    const $tableDivision = document.querySelector(".table-general-wrapper");

    $questDivision.style.display = "none";
    $tableDivision.style.display = "flex";
};


function onAddClick() {
    const BASE_URL = "https://jsonplaceholder.typicode.com/users";

    getEmployeesData(BASE_URL);
};


async function getEmployeesData(url) {

    try { 
        let response = await fetch(url);

        !checkErrorPage(response) ?  checkErrorPage(response) : addEmployee(await response.json()); 
    } 
    catch(error) {
        
        console.log(error);
    }
};


function addEmployee(data) {
    const $addBtn = document.querySelector(".add-data");
    const $tableDivision = document.querySelector(".table-general-wrapper");
    const $blurDivision = document.querySelector(".blur-dvsn-general-wrapper");
    const length = data.length;
    let crntEmployee = data[crnt];
    let blurExist = null;

    allEmployee.push(crntEmployee);

    if(crnt === length) {  // <============== observer condition

        $addBtn.disabled = true;
        $tableDivision.classList.add("blur");
        $blurDivision.style.display = "flex";

        blurExist = setTimeout(() => {
            cancelBlur($tableDivision, $blurDivision, blurExist);
        }, 2000);

        return;
    }

    getCurrentEmployee(crntEmployee);
    crnt++;
};

function cancelBlur($tableDivision, $blurDivision, blurExist) {

    $tableDivision.classList.remove("blur");
    $blurDivision.style.display = "none";
    blurExist = null;
};


function getCurrentEmployee({id, name, company : {name : nm}, address : {city},  phone, email}) {

    crntEmployee.push(id, name, nm, city, phone, email);
    renderMarkUp(allEmployee, crntEmployee);
    crntEmployee.splice(0, crntEmployee.length);
};


function renderMarkUp(allEmployee, crntEmployee) {
    const $tableBody = document.querySelector(".t-body");
    let trComponent;

    for(let i = 0; i < allEmployee.length; i++) {
        trComponent = document.createElement("tr");

        for(let j = 0; j < crntEmployee.length; j++) {
          let tdComponent = document.createElement("td");

            tdComponent.innerHTML = crntEmployee[j];
            trComponent.appendChild(tdComponent);
        }
    }

    $tableBody.appendChild(trComponent);
};


function checkErrorPage(response) {
    const $tableDivision = document.querySelector(".table-general-wrapper");
    const $errorDivision = document.querySelector(".error-dvsn");

    if(!response.ok) {
       $errorDivision.style.display = "flex";
    }

    return $tableDivision.style.display = "flex";
};