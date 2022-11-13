const myTable=document.querySelector(".myTable")
const tableBody = document.querySelector(".tableBody");

const nameInput = document.querySelector(".nameInput");
const dateInput = document.querySelector(".dateInput");
const aadharInput = document.querySelector(".aadharInput");
const mobInput = document.querySelector(".mobInput");
const ageBox = document.querySelector(".ageBox");

const addNewpersonBtn=document.querySelector(".addNewpersonBtn");
const retrieveInfoBtn=document.querySelector(".retrieveInfoBtn")
const addRowBtn = document.querySelector(".addRowBtn");
const saveBtn = document.querySelector(".saveBtn");
const delBtn = document.querySelector(".delBtn");
const findBtn=document.querySelector(".findBtn");

const addNewPersonBlock=document.querySelector(".addNewPersonBlock");
const retrieveInfoBlock=document.querySelector(".retrieveInfoBlock");

addRowBtn.addEventListener("click", addRow);

function setLocalStorage(){
    if(!localStorage.getItem('user')){
        let arr=[]
        localStorage.setItem("user", JSON.stringify(arr));
    }
}
setLocalStorage()


let myAge;
let userArray = [];

function addRow() {
  if(nameInput.value==null||nameInput.value==""){
      document.querySelector(".errorMessage").innerHTML="Name cannot be Blank";
      return false;
  }
  else if(aadharInput.value.length>12 || aadharInput.value.length<12){
      document.querySelector(".errorMessage").innerHTML="Aadhar Number should be of 12 digits";
      return false;
  }
  else if(mobInput.value.length>10 || mobInput.value.length<10){
      document.querySelector(".errorMessage").innerHTML="Mobile Number should be of 10 digits";
      return false;
  }

  calculateAge();

  let newRowBlock = `
    <tr class="newRow">
        <td>${nameInput.value}</td>
        <td>${dateInput.value}</td>
        <td>${aadharInput.value}</td>
        <td>${mobInput.value}</td>
        <td class="ageBox">${myAge}</td>
        <td>
            <button class="saveBtn" id=${mobInput.value}>Save</button>
            <button class="delBtn" id=${aadharInput.value}>Delete</button>
        </td>
    `;
  tableBody.innerHTML += newRowBlock;

 createUser();

  reset();
}

// --------------------calculating age---------------------

function calculateAge(){
    myAge=new Date().getFullYear()-new Date(`${dateInput.value}`).getFullYear();
}

// -------------------making input values empty----------------

function reset() {
  nameInput.value = "";
  dateInput.value = "";
  mobInput.value = "";
  aadharInput.value = "";
}

function createUser(){
    let user = {
        "Name": nameInput.value,
        "Date of Birth": dateInput.value,
        "Aadhar Number": aadharInput.value,
        "Mobile Number": mobInput.value,
        "Age":new Date().getFullYear()-new Date(`${dateInput.value}`).getFullYear(),
      };
      userArray.push(user);
      console.log(userArray)
}
// createUser();

myTable.addEventListener("click", addUser);
function addUser(e) {

   if (e.target.classList.contains("saveBtn")) {
    let saveobj=userArray.filter((item)=>{
            return e.target.id == item["Mobile Number"];
    })
    // console.log(...saveobj)
    let storredArray=JSON.parse(localStorage.getItem('user'))
    storredArray.push(...saveobj)
    localStorage.setItem("user", JSON.stringify(storredArray));
    e.target.classList.remove("saveBtn")
   }
 }

 myTable.addEventListener("click",deleteUser);

 function deleteUser(e){
        if (e.target.classList.contains("delBtn")) {
          e.target.closest("tr").remove();
          let storedData=JSON.parse(localStorage.getItem("user"));
          console.log(storedData);
         let filterData= storedData.filter((item)=>{
              return e.target.id != item["Aadhar Number"];
          })
          localStorage.setItem("user",JSON.stringify(filterData));
          console.log(filterData);
        
      };
 }

//  -------------------------tabs--------------------------

 addNewpersonBtn.addEventListener("click",displayAddNewPerson);
 function displayAddNewPerson(){
    document.querySelector(".addNewPersonBlock").style.display="block"
    document.querySelector(".retrieveInfoBlock").style.display="none"
 }

 retrieveInfoBtn.addEventListener("click",displayRetrieveBlock);
 function displayRetrieveBlock(){
    document.querySelector(".addNewPersonBlock").style.display="none"
    document.querySelector(".retrieveInfoBlock").style.display="block"
 }

//  ---------------------Retrieve Block-----------------------------------
const aadharInputField=document.querySelector(".aadharInputField");
const displayDetails=document.querySelector(".displayDetails");
const noMatchFoundText=document.querySelector(".noMatchFoundText")

findBtn.addEventListener("click",findPersonDetails);

function findPersonDetails(){
    let userData = JSON.parse(localStorage.getItem("user"));
    

    for (let i = 0; i < userData.length; i++) {
        if (aadharInputField.value !== userData[i]["Aadhar Number"]) {
            noMatchFoundText.innerHTML = `<h2>No Match Found</h2>`;
            displayDetails.innerHTML = "";
        }
    }

    for (let i = 0; i < userData.length; i++) {
        if (aadharInputField.value == userData[i]["Aadhar Number"]) {
            displayDetails.innerHTML = `
            <div class="retrieve_info_display">
                <p>Name: ${userData[i]["Name"]}</p>
                <p>DOB: ${userData[i]["Date of Birth"]}</p>
                <p>Aadhar: ${userData[i]["Aadhar Number"]}</p>
                <p>Mobile No: ${userData[i]["Mobile Number"]}</p>
                <p>Age: ${userData[i]["Age"]}</p>
            </div>
                `;
                noMatchFoundText.innerHTML = "";
        }
    }
}
