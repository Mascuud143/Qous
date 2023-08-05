import prayTimes from './PrayTimes.js'
const prayerResults = prayTimes.getTimes((new Date()), ["63.446827", '10.421906'])
console.log(prayerResults)


// DOM
const hourBox = document.querySelector(".date-hour")
const monthBox = document.querySelector(".date-month")
const dayBox = document.querySelector(".date-day")
const temperature = document.querySelector(".weather-temperature")
const closeModalBtn = document.querySelectorAll(".modal-close-btn")
const familyModal = document.querySelector(".modal-family")
const homeModal = document.querySelector(".modal-home")
const travelModal = document.querySelector(".modal-travel")
const shoppingModal = document.querySelector(".modal-shopping")
const opensalahModal = document.querySelector(".salah")

const reminderModal = document.querySelector(".modal-reminder")
const familyBtn = document.querySelector(".btn-family")
const HomeBtn = document.querySelector(".btn-home")
const shoppingBtn = document.querySelector(".shopping-btn")
const travelBtn = document.querySelector(".bus")
const reminderBtn = document.querySelector(".reminder-btn")
const openAddMember = document.querySelector(".open-add-member")
const addMemberModal = document.querySelector(".modal-mini")
const closeAddMember = document.querySelector(".close-add-member")
const AddMemberBtn = document.querySelector(".add-member-btn")
const familyList = document.querySelector(".family-list")
const expandListBtn = document.querySelectorAll(".expand-list")
const addItemModal = document.querySelector(".add-item")
const newItemBtn = document.querySelector(".new-item-btn")
const closeAddItemBtn = document.querySelector(".close-add-item")
const decreaseQuantity = document.querySelector(".less")
const increaseQuantity = document.querySelector(".more")
const quantityBox = document.querySelector(".quantity-box")
const listItems = document.querySelector(".list-items")
const addListForm = document.querySelector(".add-item form")
const addMoreBtns = document.querySelectorAll(".add-more")
const closeShopBtn = document.querySelector(".close-shop")
const shopList = document.querySelector(".shop-list")
const shopperListOption = document.querySelector(".shop select")
const busstopOption  = document.getElementById("busstop-option")
const familyScreen = document.querySelector(".family-screen")
const openRecipesModal = document.querySelector(".meal-plan")
const searchRecipes = document.querySelector(".search-area form")

const state = {

    family:{
        members:[],
        highlights:[{name:"John's birthday today!"},{name:"Family Dinner next week"}, {name:"Keep going you can 😍"}]
    },
    shopping:{
        lists:{
            week:[{name:"Ost", quantity:2}, {name:"Egg", quantity:1, description:"Mida box ga"}, {name:"Canbo", quantity:3}, {name:"Eple", quantity:4}],
            month:[{name:"Hvetemel", quantity:20}]
        }
    },
    travel:{
        busstop: "41800"
    },
    prayers:{
        times: prayTimes.getTimes((new Date()), ["63.446827", '10.421906']),
        // times: {
        //     asr:"19:52",
        //     dhuhr:"19:54",
        //     fajr:"03:30",
        //     isha:"23:08",
        //     maghrib:"20:14",
        //     midnight:"19:24",
        //     sunrise:"19:53",
        //     sunset:"22:14"
        // },
        currentPrayer:[]
    }
}



function calculateIqamah(athan){
    // 23:08
    let hour = Number(athan.split(":")[0])
    let mins = Number(athan.split(":")[1])

    let rem=0;

    if((60-mins)>10){
            mins+=10
    }else if((60-mins)==10){
        hour++
        mins=0
    } else if((60-mins)<10){
        hour++
        mins= rem+(60-mins)
    }


    return `${formating(hour)}:${formating(mins)}`

}


function calculateCurrentPrayer(){

    const now  = new Date()

    const hour = formating(now.getHours())
    const mins = formating(now.getMinutes())

    console.log("-------------")
    console.log(hour)

    var result = Object.keys(state.prayers.times).map((key) => [key, state.prayers.times[key]]);
    console.log(result)


    console.log()

    // 1/7
    // DETERMINE CURRENT SALAH
    var salahList = []
    for(let i=0; i<result.length; i++){
        console.log(result[i][1])
        // Get the hour to determine which salah is near
        const salahHour = Number(result[i][1].split(":")[0])
        salahList.push(salahHour)

    }


        const goal = hour;

        var closest = salahList.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });


        // get the index of current salah 
        const currentSalahIndex = salahList.indexOf(closest)

        // Update current salah in the state

        state.prayers.currentPrayer = result[currentSalahIndex]

        return result[currentSalahIndex][0]
}




var monthArray= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
const days=["Søndag","Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]



function updateMemberList(){
    familyList.innerHTML=""
    if(state.family.members.length!=0){

        const html = state.family.members.map(el=> `<div class="family-member"><h3>${el.name}</h3></div>`).join(" ")
        familyList.insertAdjacentHTML("afterbegin", html)
        document.querySelectorAll(".family-member").forEach(el=> el.addEventListener("click", function(e){
            // Do this if 
            // <p>${el.phone}</p>
        }))
    }else{
        familyList.textContent="There are currently no members!"
    }


}





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

    const {date, hour, min, day, sec, month} = getNowDate()


    hourBox.textContent = hour+":"+min;
    monthBox.textContent =date+ ". "+ monthArray[month]
    dayBox.textContent = days[day]+ ","



}


async function getWeatherData(city){

    let lat = 63.4305;
    let long = 10.3951;
    // navigator.geolocation.getCurrentPosition((position) => {
    //     lat = position.coords.latitude;
    //     long = position.coords.longitude;

    //   });

      console.log(lat)
      console.log(long)

    // const link = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}.10&lon=${long}`
    // const link = `https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=XtLvbDDG9LOPU3wtfvcswAA6rrg1ytyA`
    const APIKey = `a5119b46c74d635711f592e966870833`
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}`
    const forcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}`

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
        console.log(data)
        const weatherNow = Math.round((data.main.temp))-273
        temperature.textContent = "Idag: "+weatherNow+" "+"℃";
    

        
        

    })).catch(err=> console.log(err))
    
    
    
    
    fetch(forcast).then(res=>res.json()).then(data=>{



       

        let hour = new Date().getHours()
        
        // Slice up the two thr next days data
        // const nextDays = data.list.slice((23-hour), (23-hour+24))
        const nextDays = data.list
        console.log(data.list)
        console.log(nextDays)
        
        
        nextdays.day1.temp = Math.round(nextDays[12].main.temp)-273
        console.log(nextDays.day1)
        nextdays.day2.temp = Math.round(nextDays[12+10].main.temp)-273
        nextdays.day3.temp = Math.round(nextDays[12+20].main.temp)-273
10
        
        document.querySelector(".day1").innerHTML = getNextDays()[0]+`<span class="">${nextdays.day1.temp} ℃</span>`
        document.querySelector(".day2").innerHTML = getNextDays()[1]+`<span class="">${nextdays.day2.temp} ℃</span>`
        document.querySelector(".day3").innerHTML = getNextDays()[2]+`<span class="">${nextdays.day3.temp} ℃</span>`

    })

}


let highlightsCount = 0;
setInterval(function(){
    const highlights = state.family.highlights;

    familyScreen.innerHTML =""
    familyScreen.insertAdjacentHTML("afterbegin", `<span class="highlight">${highlights[highlightsCount].name}</span>`)
    if(highlightsCount==highlights.length-1){
        highlightsCount=0
    }else{
        highlightsCount++
    }
    console.log(highlightsCount)
}, 10000)


//Events

window.addEventListener("load", function(e){

    
    let date = new Date();
    let sec = date.getSeconds();
    setTimeout(()=>{
        setInterval(()=>{
            
            getBusstopData(state.travel.busstop)
        }, 60 * 1000);
        }, (60 - sec) * 1000);
    
    getWeatherData()
    UpdateListData()
    document.querySelector(".list-items-count").textContent= state.shopping.lists.week.length +" "+"Items";
    deleteItemEvent()
    calculateCurrentPrayer()
    displayCurrentSalah()
})


addMoreBtns.forEach(el=>{
    el.addEventListener("click", openAddList)

})

addListForm.addEventListener("submit", function(e){
    e.preventDefault()
    const formData = new FormData(addListForm)

    const listData = {
        name:e.target.name.value,
        quantity: Number(e.target.querySelector(".quantity-box").textContent.trim()),
        description:e.target.description.value,
    }


    const listType = [...e.target.parentNode.classList]
    if(e.target.parentNode.dataset.listType=='week'){
        state.shopping.lists.week.push(listData)
    }else{
        
        state.shopping.lists.month.push(listData)
    }



    UpdateListData()


    //close mini modal
    closeAddItem()
})


function deleteItemEvent(){


    document.querySelectorAll(".list-item i").forEach(el=>{
        el.addEventListener("click", function(e){
            
            // is week or month
            const listType = [...e.target.parentNode.parentNode.parentNode.parentNode.classList]
            console.log(listType.includes("week-list"))

            if(listType.includes("week-list")){

                
                state.shopping.lists.week = state.shopping.lists.week.filter((el,i)=> i!=e.target.parentNode.parentNode.dataset.id)
            }else{
                
                state.shopping.lists.month = state.shopping.lists.month.filter((el,i)=> i!=e.target.parentNode.parentNode.dataset.id)
            }

            UpdateListData()
        })
    })
}


function UpdateListData(){


    const weekHtml = state.shopping.lists.week.map((el, i)=>{
        const descr= `<p class='item-description'>${el.description}</p>`
        return `<div class="list-item" data-id="${i}"> <div class="item-content"><span>${el.quantity} x </span> ${el.name} <i class="fa-solid fa-trash"></i></div> ${el.description?descr:""}</div>`
    }).join(" ")

    const monthHtml = state.shopping.lists.month.map((el, i)=>{
        const descr= `<p class='item-description'>${"**"+el.description}</p>`
        return `<div class="list-item" data-id="${i}"> <div class="item-content"><span>${el.quantity} x </span> ${el.name} <i class="fa-solid fa-trash"></i></div> ${el.description?descr:""}</div>`
    }).join(" ")


    const weekListNames = state.shopping.lists.week.slice(0, 3).map(el=> el.name).join(", ")+" "+"..."
    const monthListNames = state.shopping.lists.month.slice(0, 3).map(el=> el.name).join(", ")+" "+"..."



    document.querySelectorAll(".list-desc").forEach(el=>el.textContent="")
    document.querySelector(".week-list .list-desc").textContent= weekListNames
    document.querySelector(".month-list .list-desc").textContent= monthListNames
    document.querySelector(".list-desc").textContent= weekListNames
    document.querySelector(".week-list .list-items").innerHTML=""
    document.querySelector(".month-list .list-items").innerHTML=""

    document.querySelector(".week-list .list-items").insertAdjacentHTML("afterbegin", weekHtml)
    document.querySelector(".month-list .list-items").insertAdjacentHTML("afterbegin", monthHtml)
    document.querySelector(".week-list .list-items-count").textContent= state.shopping.lists.week.length +" "+"Items";
    document.querySelector(".month-list .list-items-count").textContent= state.shopping.lists.month.length +" "+"Items";
    deleteItemEvent()
}


closeShopBtn.addEventListener("click", function(e){
    document.querySelector(".shop").classList.add("hidden")
})

shopList.addEventListener("click", function(e){
    shopperListOption.innerHTML=""
    document.querySelector(".shop").classList.remove("hidden")
    
    const html = state.family.members.map(el=> `<option value="${el.name}">${el.name}</option>`)
    shopperListOption.insertAdjacentHTML("afterbegin", html)

})



openRecipesModal.addEventListener("click", function(){
    document.querySelector(".modal-recipes").classList.remove("hidden")
    console.log("hh")
})

// newItemBtn.addEventListener("click", openAddList)
closeAddItemBtn.addEventListener("click", closeAddItem)

decreaseQuantity.addEventListener("click", function(e){
    var count = Number(quantityBox.textContent.trim())
    if(count>1){
        count=count-1
        updateQuantity(count)
    }
})


function displayCurrentSalah(){
    let [salah, time] = state.prayers.currentPrayer
    salah  = salah.charAt(0).toUpperCase() + salah.slice(1);
    document.querySelector(".current-salah").innerHTML=""
    document.querySelector(".current-salah").insertAdjacentHTML('afterbegin', `<i class="fa-solid fa-mosque"></i> ${salah}`)
    document.querySelector(".salah-in").innerHTML=""
    document.querySelector(".salah-in").textContent="Adhan at " + time
}

increaseQuantity.addEventListener("click", function(e){
    var count = Number(quantityBox.textContent.trim())
    count=count+1
    updateQuantity(count)
})

function updateQuantity(count){
    quantityBox.textContent = count
}
expandListBtn.forEach(el=>{
    el.addEventListener("click", function(e){

        
        // show the list 
        e.target.parentNode.parentNode.querySelector(".list-items").classList.toggle("hidden")
        
        
        // remove the description
        
        const isOpen =  [...(e.target.parentNode.parentNode.querySelector(".list-items").classList)].includes("hidden")
        
        if(isOpen){
            e.target.parentNode.parentNode.querySelector(".list-desc").classList.remove("hidden")
            // change the icon
    
            e.target.parentNode.parentNode.querySelector(".expand-list").innerHTML = `<i class="fa-solid fa-angle-right"></i>`
            
            
        }else{
            
            e.target.parentNode.parentNode.querySelector(".list-desc").classList.add("hidden")
            e.target.parentNode.parentNode.querySelector(".expand-list").innerHTML = `<i class="fa-solid fa-angle-up"></i>`
            // e.target.parentNode.parentNode.querySelector(".list-desc").classList.add("hidden")
    
        }
    
    
    })
})

openAddMember.addEventListener("click",  function(e){
    addMemberModal.classList.remove("hidden")
})

closeAddMember.addEventListener("click", closeMiniModal)

AddMemberBtn.addEventListener("click", function(e){
    e.preventDefault()

    const memberName = document.querySelector(".member-name").value
    const phone = "1234567"

    state.family.members.push({name:memberName, phone:phone})


    closeMiniModal()
    updateMemberList()
})


opensalahModal.addEventListener("click", function(e){
    document.querySelector(".modal-salah").classList.remove("hidden")
    displaySalahtable()
})

function displaySalahtable(){

    var result = Object.keys(state.prayers.times).map((key) => [key, state.prayers.times[key]]);

    let html = result.map((el,i)=>{
        if(el[0].toLowerCase()!="imsak" && el[0].toLowerCase()!="sunrise"&&el[0].toLowerCase()!="midnight" && el[0].toLowerCase()!="sunset"){
            console.log(el[0].toLowerCase()=="imsak")
            
            return `<tr class="${el[0]==calculateCurrentPrayer()?"current":""}">
            <td>${el[0].toUpperCase()}</td>
            <td>${el[1]}</td>
            <td>${calculateIqamah(el[1])}</td>
            </tr>`
        }else{
            return ''
        }
    }).join(" ")


    html = `<tr>
    <th>Salah</th>
    <th>Adhan</th>
    <th>Iqamah</th>
 </tr>`+html
    document.querySelector(".salah-table table").innerHTML=""
    document.querySelector(".salah-table table").insertAdjacentHTML(`afterbegin`, html)
}

function openAddList(e){
    addItemModal.classList.remove("hidden")

    const parentList  = [...(e.target.parentNode.parentNode.classList)]                                                                                                             

    console.log(parentList)

    let isWeek = parentList.includes("week-list");
    let isMonth = parentList.includes("month-list");

    if(isWeek){
       
        addItemModal.dataset.listType = "week"                                                                                                            
    }else if(isMonth){
        
        addItemModal.dataset.listType = "month"                                                                                                            
    }
    




}

function closeAddItem(){
    addItemModal.classList.add("hidden")
}

function getNextDays(){

    let date = new Date().getDay()


   // Calc the days
   let day1 = IslastDay(date)
   let day2 = IslastDay(day1)
   let day3 = IslastDay(day2)


    // check is if is last day
   function IslastDay(day){
    
        if(day==6){
            return 0
        }else{
            return day=day+1;
        }
   }



    return [days[day1], days[day2], days[day3]]
}


closeModalBtn.forEach(btn=>{
    btn.addEventListener("click", function(e){
        closeModals()
        closeMiniModal()
    })
})
familyBtn.addEventListener("click", function(){
    familyModal.classList.remove("hidden")
    updateMemberList()

})
HomeBtn.addEventListener("click", function(){
    homeModal.classList.remove("hidden")
})
shoppingBtn.addEventListener("click", function(){
    shoppingModal.classList.remove("hidden")
})
// reminderBtn.addEventListener("click", function(){
//     reminderModal.classList.remove("hidden")
// })


setInterval(()=>{

    displayDate()

},6000)


function closeModals(){
    document.querySelectorAll(".modal").forEach(el=> el.classList.add("hidden"))
}

function closeMiniModal(){

        addMemberModal.classList.add("hidden")
    
    
}


// recipes

searchRecipes.addEventListener("submit", loadRecipes)


// Travel

travelBtn.addEventListener("click", async function(e){
    travelModal.classList.remove("hidden")

    getBusstopData(state.travel.busstop)
    
})



async function getBusstopData(stop){
    
    fetch(`https://mpolden.no/atb/v2/departures/${stop}?direction=inbound`).then(res=>res.json()).then(data=>{
        console.log(data)
        displayBusstopDataInbound(data.departures)
    })

    fetch(`https://mpolden.no/atb/v2/departures/${stop}?direction=outbound`).then(res=>res.json()).then(data=>{
        console.log(data)
        displayBusstopDataOutbound(data.departures)
    })
    
}

function displayBusstopDataInbound(departures){
    departures=departures.slice(1,10)

    const html = departures.map(el=>{
        const now = new Date()
        const date = new Date(el.scheduledDepartureTime)
  
        let isNow = false
        if(((now.getHours())===(date.getHours())) && ((date.getMinutes())-(now.getMinutes()))<=10){
            console.log("isnow")
            isNow = true
        }
        


        let hour = formating(date.getHours());
        let mins = date.getMinutes()



        function getTimeTravel(){
            let time;
            isNow?(date.getMinutes()-now.getMinutes())+" mins":hour+":"+formating(mins)
            console.log((date.getMinutes()-now.getMinutes()))

            if(isNow && (date.getMinutes()-now.getMinutes())==0 || isNow && (date.getMinutes()-now.getMinutes())<1){
                
                time = "now"
            }else  if(isNow){
                time = (date.getMinutes()-now.getMinutes())+" mins"
            }else{
                time=hour+":"+formating(mins)
            }
            console.log(time)
            return time;
        }
        

        return `<li class="${isNow && "now"}"><span class="line">${el.line}    <span class="destination">${el.destination}</span></span> <span class="time">${getTimeTravel()}</span></li>`
    }).join(" ")

    document.querySelector(".busstop-table .from-centre ul").innerHTML = ""
    document.querySelector(".busstop-table .from-centre ul").insertAdjacentHTML("afterbegin", html)

}
function displayBusstopDataOutbound(departures){
    departures=departures.slice(1,10)

    const html = departures.map(el=>{

        const now = new Date()
        const date = new Date(el.scheduledDepartureTime)
  
        let isNow = false
        if(((now.getHours())===(date.getHours())) && ((date.getMinutes())-(now.getMinutes()))<=10){
            isNow = true
        }
        


        let hour = formating(date.getHours());
        let mins = date.getMinutes()
        

        return `<li class="${isNow && "now"}"><span class="line">${el.line}    <span class="destination">${el.destination}</span></span> <span class="time">${isNow?(date.getMinutes()-now.getMinutes())+" mins":hour+":"+formating(mins)}</span></li>`
    }).join(" ")

    document.querySelector(".busstop-table .to-centre ul").innerHTML = ""
    document.querySelector(".busstop-table .to-centre ul").insertAdjacentHTML("afterbegin", html)

}

busstopOption.addEventListener("change", function(e){

    state.travel.busstop=e.target.value.trim()

    getBusstopData(state.travel.busstop)


})


function loadRecipes(e){
    e.preventDefault()
    const search = document.querySelector(".search-area form input").value.trim()

    if(search.length!=0){
        console.log(search)
        
        // fetch from the api
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`).then(res=>res.json()).then(data=>{
            console.log(data)
            displayRecipeLists(data.meals)
        })
    }else{
        alert("Please type in search!")
    }
}


function displayRecipeLists(recipes){
    document.querySelector(".recipes-list").innerHTML=""
    let html =""
    if(recipes){

        html = recipes.map(el=>{
            return `<div class="recipe">
            <div class="recipe-image">
            
            <img src="${el.strMealThumb}" alt="meal">
            </div>
            <div class="recipe-details">
            
            <div class="recipe-name">${el.strMeal}</div>
            <div class="recipe-action">
            <button><i class="fa-regular fa-eye"></i> See recipe</button>
            <button><i class="fa-regular fa-bookmark"></i> Save recipe</button>
            </div>
            </div>
            </div>`
        }).join(" ")

        
    }else{
        html="Can't find meals or ingredients match! Try typing differently."
    }
    // display recipes

    document.querySelector(".recipes-list").insertAdjacentHTML("afterbegin", html)

}



