window.onload = function () {
    setupDivs();
};


function setupDivs() {

    let allABedsArray = document.querySelectorAll("[position = 'top']");

    for (let i = 0; i < allABedsArray.length; i++) {
        allABedsArray[i].addEventListener("click", getDetailsA, false);
    }

    let allBBedsArray = document.querySelectorAll("[position = 'bottom']");

    for (let i = 0; i < allBBedsArray.length; i++) {
        allBBedsArray[i].addEventListener("click", getDetailsB, false);
    }
}
var getDetailsA = function () {
    let income = this.getAttribute("income");
    let id = this.getAttribute("clientidnumber");
    let bedAssigned = this.previousElementSibling.innerHTML;
    if (income == "" && id == "")
    alert ("Bed: " + bedAssigned + " is empty!")
    else
alert ("Bed: " + bedAssigned + ", Client Id Number: " + id + ", Income: $" + income + ".");
};

var getDetailsB = function () {
    let income = this.getAttribute("income");
    let id = this.getAttribute("clientidnumber");
    let bedAssigned = this.previousElementSibling.innerHTML;
    if (income == "" && id == "")
    alert ("Bed: " + bedAssigned + " is empty!")
    else
    alert ("Bed: " + bedAssigned + ", Client Id Number: " + id + ", Income: $" + income + ".");
};

function clientPrompt() {
    const radioButtons = document.querySelectorAll('input[name="pmcFloor"]');
    let selectedFloor;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedFloor = radioButton.value;
            break;
        }
    }

    let allBeds = document.getElementsByClassName('bedSquare');
    if (selectedFloor == 2) {


        for (let i = 0; i < 20; i++) {

            let bed = allBeds[i];

            if (bed.parentElement.getAttribute('clientIdNumber') == "") {

                bed.getElementsByTagName('i')[0].classList.add('available');
            }
            else if (bed.parentElement.getAttribute('clientIdNumber') != "") {

                bed.getElementsByTagName('i')[0].classList.add('unavailable');
            }
        }


        let element1 = document.getElementById('floor2');
        element1.classList.remove('hide');
        element1.classList.add('show');

        let element2 = document.getElementById('floor3');
        element2.classList.remove('show');
        element2.classList.add('hide');

    }
    else if (selectedFloor == 3) {

        for (let i = 20; i < 40; i++) {

            let bed = allBeds[i];

            if (bed.parentElement.getAttribute('clientIdNumber') == "") {

                bed.classList.add('available');
            }
            else if (bed.parentElement.getAttribute('clientIdNumber') != "") {

                bed.classList.add('unavailable');
            }
        }

        let element2 = document.getElementById('floor3');
        element2.classList.remove('hide');
        element2.classList.add('show');

        let element1 = document.getElementById('floor2');
        element1.classList.add('hide');
        element1.classList.remove('show');
    }

    let elementButton = document.getElementById('newClient');
    elementButton.classList.remove('hide');

}

function promptForIncome() {
    let incomeLimitTotal = document.getElementById('incomeLimit').value;

    const radioButtons = document.querySelectorAll('input[name="pmcFloor"]');
    let selectedFloor;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedFloor = radioButton.value;
            break;
        }
    }

    let clientidnumber = prompt("Please enter client ID number");
    if (clientidnumber == null || clientidnumber == "") {
    alert ("Client ID must be entered to proceed.")
    return false;
    }
    let income = prompt("Please enter client's income");
    if (income == null || income== ""){
    alert ("Client income must be entered to proceed.")
    return false;
    }
    let clientIncome = parseInt(income);
    let allBeds;
    if (selectedFloor == 2) {
    allBeds = document.getElementsByClassName('bedGroup2');}
    else if (selectedFloor == 3) {
    allBeds = document.getElementsByClassName('bedGroup3');}

    let maxIncomeLimit = parseInt(document.getElementById('incomeLimit').value);
    let selectedPartner;
    for (let i = 0; i < allBeds.length; i++) {
        selectedPartner = null;
        let partner1 = allBeds[i].querySelectorAll("[position = 'top']");
        let clientIdA = partner1[0].getAttribute('clientidnumber');
        let clientIncomeA = 0;
        if (partner1[0].getAttribute('income') != "")
        clientIncomeA = parseInt(partner1[0].getAttribute('income'));

        let partner2 = allBeds[i].querySelectorAll("[position = 'bottom']");
        let clientIdB = partner2[0].getAttribute('clientidnumber');
        let clientIncomeB = 0;
        if (partner2[0].getAttribute('income') != "")
        clientIncomeB = parseInt(partner2[0].getAttribute('income'));

       

        if (clientIdA == "" && clientIdB == "") {
            if (clientIncome <= maxIncomeLimit){
            partner1[0].setAttribute("clientidnumber", clientidnumber);
            partner1[0].setAttribute("income", clientIncome);
            selectedPartner = partner1[0];
           break;
         }
        }       
        else if (clientIdA != "" && clientIdB == "") {
            if (clientIncomeA + clientIncome <= maxIncomeLimit) {
                partner2[0].setAttribute("clientidnumber", clientidnumber);
                partner2[0].setAttribute("income", clientIncome);
                selectedPartner = partner2[0];
            break; 
            }
            else {
                continue;
            }
        }
        else if (clientIdA == "" && clientIdB != "") {
            if (clientIncomeB + clientIncome <= maxIncomeLimit) {
                partner1[0].setAttribute("clientidnumber", clientidnumber);
                partner1[0].setAttribute("income", clientIncome);
                selectedPartner = partner1[0];
            break;   
            }
            else {
                continue;
            }
        }
    }  
     
    if (selectedPartner != null) {
            selectedPartner.getElementsByTagName('i')[0].classList.remove('available');
            selectedPartner.getElementsByTagName('i')[0].classList.add('unavailable');
        let bedAssigned = selectedPartner.previousElementSibling.innerHTML;  
        alert("Client with ID number " + clientidnumber + " was assigned bed " + bedAssigned + ".");
        }
    else {
        if (clientIncome > maxIncomeLimit){
        alert ("Client's income exceeds income limit. Not eligible for bed assignment.")}
        else {
            alert("Client's income of $" + clientIncome + " exceeds current available beds.")}
    
    }
}


