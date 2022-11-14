const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById("searchBtn");
const getWeatherBtn = document.querySelector(".getWeatherBtn");
const cities = document.querySelector("#cities");
const displayResult = document.querySelector(".displayResult");
const cancelBtn = document.querySelector(".fa-solid");
const displayWeatherData = document.querySelector(".displayWeatherData");
const cityNames = document.querySelector(".cityNames");

let objectArray = [];

function selectCity() {
  // let weatherData = {};
  let url1 = `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cities.value}`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    let obj= {
        "name":cities.value,
        "id":Math.floor(Math.random()*1000),
      }
objectArray.push(obj);
      let displayWeather = `
          <div class="displayWeatherData" id="${obj.id}">
          <i class="fa-solid fa-xmark" id="cancel"></i>
           <p class="cityNames">${cities.value}</p>
            <p>Description:<input value="${data.description}"></p>
            <p>Temperature(℃):${data.temp_in_celsius}</p>
            <p>Pressure(hPa):${data.pressure_in_hPa}</p>
            <p>Data age(No. of days):${data.date_and_time}</p>
        </div>
          `;
      displayResult.innerHTML += displayWeather;
        
      // let currentDate=new Date().toDateString();
      // let givenDate=new Date(data.date_and_time).toDateString();
      // console.log(givenDate);
      // let timeDiff= (currentDate.getTime())-(givenDate.getTime());
      // let daysDiff=timeDiff/(1000*60*40*24);
      // console.log(daysDiff)
    });
  console.log(cities.value);
 

  console.log(objectArray);
}

function searchCity() {
  console.log(objectArray);
  objectArray.map((item) => {

    if (item.name == cityName.value) {
       document.getElementById(`${item.id}`).setAttribute("class","changeColor")
      
      console.log( document.getElementById(`${item.id}`))
      setTimeout(()=>{
        document.getElementById(`${item.id}`).classList.remove("changeColor");
      },3000)
    }
  });
}

function removeCard(e) {
  if (e.target.classList.contains("fa-solid")) {
    e.target.parentElement.remove();
    console.log("remove");
  }
}

getWeatherBtn.addEventListener("click", selectCity);
searchBtn.addEventListener("click", searchCity);
displayResult.addEventListener("click", removeCard);
