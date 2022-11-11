const table = document.getElementById("table");
const tableBody = document.querySelector(".tableBody");
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

function addRow() {
  let name = nameInput.value;
  let dob = dobInput.value;
  let adhar_num = adhar_numInput.value;
  let mob_num = mob_numInput.value;
  let age = ageInput.value;
  // let save_del=save_del_btn.value;

//   -----validations---------

  if (name==null || name==""){
      alert("Name can't be blank");
      return false;
    }else if(adhar_num.length<12 || adhar_num.length>12){
      alert("Adhar number should be 12 digits");
      return false;
      }
      else if(mob_num.length > 10 || mob_num.length<10) {
          alert("Please enter correct mobile number");
          return false;
      }

  let rowBlock = `
    <tr>
        <td>${name}</td>
        <td>${dob}</td>
        <td>${adhar_num}</td>
        <td>${mob_num}</td>
        <td class="ageVal" >${age}</td>
        <td id="save_del_btn">
            <button class="save_btn"><u>Save</u></button>
            <button class="delete_row"><u class="delete_row">Delete</u></button>
        </td>
    </tr>
    `;
  table.innerHTML += rowBlock;

  // ----------------------calculating age-------------------------

  let userDate = Date.parse(dob);
  let presentDate = Date.now();
  let milliSeconds = presentDate - userDate;

  let minutes = 1000 * 60;
  let hours = minutes * 60;
  let days = hours * 24;
  let years = days * 365;

  let myAge = Math.round(milliSeconds / years);

  document.querySelector(".ageVal").innerHTML = myAge;

  // ---------------setting data in local storage -----------------

  let user = [
    {
      Name: name,
      DateOfBirth: dob,
      AadharNumber: adhar_num,
      MobileNumber: mob_num,
      Age: myAge,
    },
  ];
//   localStorage.setItem("user", JSON.stringify(user));

//   saveBtn.addEventListener("click", function () {
//     localStorage.setItem("user", JSON.stringify(user));
//   });

  table.addEventListener("click",function(e){
      if(e.target.classList.contains("save_btn")){
         localStorage.setItem("user",JSON.stringify(user))
      }
  })

  // -----------------------deleting row------------------------

  table.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete_row")) {
      localStorage.clear();
      e.target.closest("tr").remove();
    }
  });
}

// -----------------------------------------------------------

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

let getUser = JSON.parse(localStorage.getItem("user"));
console.log(getUser[0]["AadharNumber"]);

function findObjVal() {
  let key, val;
  for (let i = 0; i < getUser.length; i++) {
    for (key in getUser[i]) {
      console.log(key + ":" + getUser[i][key]);
    }
  }
}
findObjVal();

findBtn.addEventListener("click", function (e) {
  let aadharValue = aadharInput.value;
  console.log(aadharValue);
  e.preventDefault();
  if (aadharValue == getUser[0]["AadharNumber"]) {
    displayMessage.innerHTML = `
        <div class="retrieve_info_display">
            <p>Name: ${getUser[0]["Name"]}</p>
            <p>DOB: ${getUser[0]["DateOfBirth"]}</p>
            <p>Aadhar: ${getUser[0]["AadharNumber"]}</p>
            <p>Mobile No: ${getUser[0]["MobileNumber"]}</p>
            <p>Age: ${getUser[0]["Age"]}</p>
        </div>
            `;
  } else {
    noData.innerHTML = "No Match Found";
  }
});
