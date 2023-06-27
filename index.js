
// DOM
const hourBox = document.querySelector(".date-hour")
const monthBox = document.querySelector(".date-month")
const dayBox = document.querySelector(".date-day")
const temperature = document.querySelector(".weather-temperature")
const closeModalBtn = document.querySelectorAll(".modal-close-btn")
const familyModal = document.querySelector(".modal-family")
const homeModal = document.querySelector(".modal-home")
const shoppingModal = document.querySelector(".modal-shopping")
const familyBtn = document.querySelector(".btn-family")
const HomeBtn = document.querySelector(".btn-home")
const shoppingBtn = document.querySelector(".shopping-btn")





const state = {

    
}

var monthArray= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
const days=["Søndag","Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]



function getNowDate(){

     // Set up date and time
const now = new Date()
const nowDay = now.getDay()
let nowHour = formating(now.getHours())
let nowMin = formating(now.getMinutes())
let nowSec = formating(now.getSeconds())
let nowMonth = now.getMonth()
let nowDate = now.getDate()


return {
    day: nowDay,
    date: nowDate,
    hour: nowHour,
    min: nowMin,
    sec:nowSec,
    month:nowMonth
}
}


function formating(input){
    if(input<10){
        return "0"+input
    }
    return input
}


function displayDate(){

    const {date, hour, min, sec, month} = getNowDate()


    hourBox.textContent = hour+":"+min;
    monthBox.textContent = monthArray[month]
    dayBox.textContent = date




}


async function getWeatherData(city){

    let lat;
    let long;
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;

      });

    // const link = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}.10&lon=${long}`
    const link = `https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=XtLvbDDG9LOPU3wtfvcswAA6rrg1ytyA`

      const nextdays={
        day1:{
            temp:getNextDays()[0],
            day:""
        },
        day2:{
            temp:"",
            day:getNextDays()[1]
        },
        day3:{
            temp:"",
            day:getNextDays()[2]
        }
      }

    fetch(link).then(res=> res.json().then(data=>{
        const weatherNow = Math.round((data.data.timelines[0].intervals[0].values.temperature))
        temperature.textContent = weatherNow+" "+"℃";
        console.log(data.data.timelines[0].intervals[0].values.temperature)
    

        
        nextdays.day1.temp = Math.round(data.data.timelines[0].intervals[26].values.temperature)
        nextdays.day2.temp = Math.round(data.data.timelines[0].intervals[26+24].values.temperature)
        nextdays.day3.temp = Math.round(data.data.timelines[0].intervals[26+(24*2)].values.temperature)

        console.log(nextdays)

        document.querySelector(".day1").innerHTML = getNextDays()[0]+`<span>${nextdays.day1.temp} ℃</span>`
        document.querySelector(".day2").innerHTML = getNextDays()[1]+`<span>${nextdays.day2.temp} ℃</span>`
        document.querySelector(".day3").innerHTML = getNextDays()[2]+`<span>${nextdays.day3.temp} ℃</span>`
    })).catch(err=> console.log(err))



}


//Events

window.addEventListener("load", function(e){

    // Load weather data

    


})
getWeatherData()
function getNextDays(){

    let date = new Date().getDay()

    console.log(date)
    if(date==4){
        console.log("hh")
    }
    console.log(date+3)
    return [days[date+1], days[date+2], days[date+3]]
}


closeModalBtn.forEach(btn=>{
    btn.addEventListener("click", function(e){
        closeModals()
    })
})
familyBtn.addEventListener("click", function(){
    familyModal.classList.remove("hidden")
})
HomeBtn.addEventListener("click", function(){
    homeModal.classList.remove("hidden")
})
shoppingBtn.addEventListener("click", function(){
    shoppingModal.classList.remove("hidden")
})

setInterval(()=>{

    displayDate()

},6000)


function closeModals(){
    document.querySelectorAll(".modal").forEach(el=> el.classList.add("hidden"))
}