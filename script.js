const table = document.getElementById("table");
const tableBody = document.querySelector(".tableBody");
const tableInnerBody = document.querySelector(".tableInnerBody");
const add_btn = document.querySelector(".add_btn");
const nameInput = document.querySelector("#fname");
const dobInput = document.querySelector("#dob");
const adhar_numInput = document.querySelector("#adhar_num");
const mob_numInput = document.querySelector("#mob_num");
const ageInput = document.querySelector("#age");
const save_del_btn = document.querySelector("#save_del_btn");

const addNewPersonBtn = document.querySelector(".add_new_person_btn");
const retrieveInfoBtn = document.querySelector(".retrieve_info_btn");

const delRow = document.querySelector(".delete_row");
const saveBtn = document.querySelector(".save_btn");

add_btn.addEventListener("click", addRow);

let userArray = [];
let myAge;

function addRow() {
  let name = nameInput.value;
  let dob = dobInput.value;
  let adhar_num = adhar_numInput.value;
  let mob_num = mob_numInput.value;

  nameInput.value = "";
  dobInput.value = "";
  adhar_numInput.value = "";
  mob_numInput.value = "";

  //   -----validations---------

  //   if (name==null || name==""){
  //       alert("Name can't be blank");
  //       return false;
  //     }else if(adhar_num.length<12 || adhar_num.length>12){
  //       alert("Adhar number should be 12 digits");
  //       return false;
  //       }
  //       else if(mob_num.length > 10 || mob_num.length<10) {
  //           alert("Please enter correct mobile number");
  //           return false;
  //       }

  // ----------------------calculating age-------------------------

  let userDate = Date.parse(dob);
  let presentDate = Date.now();
  let milliSeconds = presentDate - userDate;

  let minutes = 1000 * 60;
  let hours = minutes * 60;
  let days = hours * 24;
  let years = days * 365;

  myAge = Math.round(milliSeconds / years);

  let rowBlock = `
    <tr>
        <td>${name}</td>
        <td>${dob}</td>
        <td>${adhar_num}</td>
        <td>${mob_num}</td>
        <td class="ageVal" >${myAge}</td>
        <td id="save_del_btn">
            <button class="save_btn"><u class="save_btn">Save</u></button>
            <button class="delete_row" id="${adhar_num}">Delete</button>
        </td>
        </tr>
    `;
  tableInnerBody.innerHTML += rowBlock;

  let user = {
    "Name": name,
    "DateOfBirth": dob,
    "AadharNumber": adhar_num,
    "MobileNumber": mob_num,
    "Age": myAge,
  };
  userArray.push(user);
}
// -----------------------deleting row------------------------

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete_row")) {
    // localStorage.clear();
    e.target.closest("tr").remove();
    let storedData=JSON.parse(localStorage.getItem("user"));
    console.log(storedData);
   let filterData= storedData.filter((item)=>{
        return e.target.id != item.AadharNumber;
    })
    localStorage.setItem("user",JSON.stringify(filterData));
    console.log(filterData);
  }
});

// ---------------setting data in local storage -----------------

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("save_btn")) {
    localStorage.setItem("user", JSON.stringify(userArray));
    console.log("hi");
  }
});

// tabs

retrieveInfoBtn.addEventListener("click", function () {
  document.querySelector(".retrieve_info_box").style.display = "block";
  document.querySelector(".add_new_person_box").style.display = "none";
});

addNewPersonBtn.addEventListener("click", function () {
  document.querySelector(".retrieve_info_box").style.display = "none";
  document.querySelector(".add_new_person_box").style.display = "block";
});

// -------------------retrieve block---------------------

const aadharInput = document.querySelector(".aadhar_num_input");
const findBtn = document.querySelector(".find_btn");
const displayMessage = document.querySelector(".display_message");
const noData = document.querySelector(".no_match_found");

findBtn.addEventListener("click", function (e) {
  let aadharValue = aadharInput.value;
  aadharInput.value=""
  console.log(aadharValue);
  e.preventDefault();

  let userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);
let key;
for(let i=0;i<userData.length;i++){
    for( key in userData[i]){
        console.log(key+":"+userData[i][key])
    }
}

  for (let i = 0; i < userData.length; i++) {
    if (aadharValue !== userData[i]["AadharNumber"]) {
      noData.innerHTML = `<h1>No Match Found</h1>`;
      displayMessage.innerHTML = "";
    }
  }

  for (let i = 0; i < userData.length; i++) {
    if (aadharValue == userData[i]["AadharNumber"]) {
      displayMessage.innerHTML = `
        <div class="retrieve_info_display">
            <p>Name: ${userData[i]["Name"]}</p>
            <p>DOB: ${userData[i]["DateOfBirth"]}</p>
            <p>Aadhar: ${userData[i]["AadharNumber"]}</p>
            <p>Mobile No: ${userData[i]["MobileNumber"]}</p>
            <p>Age: ${userData[i]["Age"]}</p>
        </div>
            `;
      noData.innerHTML = "";
    }
  }
});
