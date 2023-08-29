import prayTimes from './PrayTimes.js'


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
const closeRecipeDetailsBtn = document.querySelector(".close-recipe-details") 
const appSettingBtn = document.querySelector(".app-setting-btn")
const watchRecipeVideoBtn = document.querySelector(".recipe-video")
const searchBusstopForm  = document.querySelector(".search-busstop-container form")

const state = {
    setting:{
        location:""
    },

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
    },
    recipes:{
        recipeList:[],
        savedRecipes:[]
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

  

    var result = Object.keys(state.prayers.times).map((key) => [key, state.prayers.times[key]]);



    // 1/7
    // DETERMINE CURRENT SALAH
    var salahList = []
    for(let i=0; i<result.length; i++){
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

    // let lat = 63.4305;
    // let long = 10.3951;

    // Trondheim
    // let lat = 63.4305;
    // let long = 10.3951;
    
    // Stavanger
    let lat = 58.9700;
    let long = 5.7331;

    
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
        const weatherNow = Math.round((data.main.temp))-273
        temperature.textContent = "Idag: "+weatherNow+" "+"℃";
    

        
        

    })).catch(err=> console.log(err))
    
    
    
    
    fetch(forcast).then(res=>res.json()).then(data=>{



       

        let hour = new Date().getHours()
        
        // Slice up the two thr next days data
        // const nextDays = data.list.slice((23-hour), (23-hour+24))
        const nextDays = data.list
        
        nextdays.day1.temp = Math.round(nextDays[12].main.temp)-273
        nextdays.day2.temp = Math.round(nextDays[12+10].main.temp)-273
        nextdays.day3.temp = Math.round(nextDays[12+20].main.temp)-273
10
        
        document.querySelector(".day1").innerHTML = `<span class="weather-day">${getNextDays()[0]}</span>`+`<span >${nextdays.day1.temp} ℃</span>`
        document.querySelector(".day2").innerHTML = `<span class="weather-day">${getNextDays()[1]}</span>`+`<span >${nextdays.day2.temp} ℃</span>`
        document.querySelector(".day3").innerHTML = `<span class="weather-day">${getNextDays()[2]}</span>`+`<span >${nextdays.day3.temp} ℃</span>`

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


appSettingBtn.addEventListener("click", function(e){
    document.querySelector(".app-setting").classList.toggle("hidden")
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
    displaySavedRecipes()

})

closeRecipeDetailsBtn.addEventListener("click", function(e){
    const modal = e.target.parentNode.parentNode;

    modal.classList.add("hidden")
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
    document.querySelector(".current-salah").insertAdjacentHTML('afterbegin', `<i class="fa-solid fa-star-and-crescent fa-sm"></i> ${salah}`)
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

searchBusstopForm.addEventListener("submit", searchBusstop)

function searchBusstop(e){
    e.preventDefault()

    const search = document.querySelector(".search-busstop-container form input").value;

    if(search.length>1){
        console.log(search)


        fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${search}&size=20&lang=no`).then(res=> res.json()).then(data=>{
            console.log(data)

            // get busstop id

            if(data.features){
                const stopplace = data.features[0].properties.id;
                if(stopplace){
                    const stopId = stopplace.split(":")[2]

                    if(stopId){

                        // fetch table based on stopId

                        // update the state
                        state.travel.busstop=stopId;

                        getBusstopData(state.travel.busstop)
                    }else{
                        alert("Can't find the stop place. Try typing again!")
                    }
                }
            }
        })
    }


}

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

            // Update state
            state.recipes.recipeList = data.meals
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
            return `<div class="recipe" data-id=${el.idMeal}>
            <div class="recipe-image">
            
            <img src="${el.strMealThumb}" alt="meal">
            </div>
            <div class="recipe-details">
            
            <div class="recipe-name">${el.strMeal}</div>
            <div class="recipe-action">
            <button class="see-recipe"><i class="fa-regular fa-eye"></i> See recipe</button>
            <button class="save-recipe"><i class="fa-regular fa-bookmark"></i> Save recipe</button>
            </div>
            </div>
            </div>`
        }).join(" ")

        
    }else{
        html="Can't find meals or ingredients match! Try typing differently."
    }
    // display recipes

    document.querySelector(".recipes-list").insertAdjacentHTML("afterbegin", html)
    saveRecipeListener()
    seeRecipeListener()
}


function seeRecipeListener(){
    document.querySelectorAll(".see-recipe").forEach(e=>{
        e.addEventListener("click", seeRecipe)
    })
}


function saveRecipeListener(){
    document.querySelectorAll(".save-recipe").forEach(btn=>{
        btn.addEventListener("click", saveRecipe)
    })
    
    document.querySelectorAll(".fa-bookmark").forEach(btn=>{
        btn.addEventListener("click", saveRecipe)
        
    })


}


function isSaved(id){

   const saved =  state.recipes.savedRecipes.filter(el=> el.idMeal==id)
    return saved.length !==0
}


function seeRecipe(e){
    let recipeid = e.target.parentNode.parentNode.parentNode.dataset.id

    document.querySelector(".recipe-details-modal").classList.remove("hidden")
    document.querySelector(".recipe-details-modal").dataset.id=recipeid


    // fetch the recipedata

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`).then(res=> res.json()).then(data=>{
        console.log(data.meals[0])

        const meal = data.meals[0]

    // Update the view

    const instructions = meal.strInstructions
    console.log(instructions.split("\n"))


    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    document.querySelector(".instructions").innerHTML = ""
    const instructionsHtml = instructions.split("\n").map((el,i)=>{
        return `<div class="instrction">
        ${el}
    </div>`
    }).join(" ")

    document.querySelector(".meal-title").innerHTML = ""
    document.querySelector(".meal-title").innerHTML = "How to cook "+meal.strMeal
    document.querySelector(".instructions").insertAdjacentHTML("afterbegin", instructionsHtml)

//    document.querySelector(".recipe-video img").src = meal.strMealThumb=""
   console.log(state.recipes.recipeList)
   

   // Display ingredients
   let ingredientStr = []
   let moreIngredientStr = []
   
   
   for (const key in meal) {
       if(key.startsWith("strIngredient") && meal[key]){
           const ingredientNumber = key.split("t")
        let n = ingredientNumber[ingredientNumber.length-1]
        let measure = "strMeasure"+n
        
        ingredientStr.push(meal[measure]+" "+ meal[key])
    }

}


// check for more ingredients

if(ingredientStr.length>3){
    console.log("More ingredients")
    moreIngredientStr = ingredientStr.slice(3)
    ingredientStr=ingredientStr.slice(0,3)
    
}
    console.log(ingredientStr)
    console.log(moreIngredientStr)


const ingredientsHtml = ingredientStr.map(el=>{
    return `<div class="ingredient">
    ${el}
    </div>`
}).join("")

const moreIngredientHtml = moreIngredientStr.map(el=>{
    return `<div class="ingredient">
    ${el}
    </div>`
}).join("")


    document.querySelector(".ingredients").innerHTML=""
    document.querySelector(".more-ingredients").innerHTML=""
    document.querySelector(".ingredients").insertAdjacentHTML("afterbegin", ingredientsHtml)
    document.querySelector(".more-ingredients").insertAdjacentHTML('afterbegin', moreIngredientHtml)

// Get src img from the recipes list
   const imgSrc = state.recipes.recipeList.filter(el=> el.idMeal==recipeid)
   console.log(imgSrc[0])
//    document.querySelector(".recipe-video img").src = imgSrc[0].strMealThumb;

    })
}


async function fetchRecipeById(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res=>res.json()).then(data=>{
        return data;
    })
}

watchRecipeVideoBtn.addEventListener("click", watchRecipeVideo)

async function watchRecipeVideo(e){
    // <iframe style="position: absolute; top:0;" width="100%" height="100%" src="https://www.youtube.com/embed/ZT9LSsNXXe0" frameborder="0" allowfullscreen></iframe>
    const recipe = e.target.parentNode.parentNode;
    const recipeid = e.target.parentNode.parentNode.dataset.id;
    console.log(recipe.dataset)

    const videoLink = state.recipes.recipeList.filter(el=> el.idMeal==recipeid)
    console.log(videoLink)
    // const VideoHtml = `<iframe style="position: absolute; top:0;" width="100%" height="100%" src="${videoLink[0].strMealThumb}" frameborder="0" allowfullscreen></iframe>`

    // recipe.insertAdjacentHTML("beforeend", VideoHtml)
    const therecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeid}`)
    const recipeData = await therecipe.json()
    console.log(recipeData.meals)
    const url = recipeData.meals[0].strYoutube.split("=")[1]
    console.log(url)
    document.querySelector("iframe").src="https://www.youtube.com/embed/"+ url;
}


function saveRecipe(e){
    let recipeid = e.target.parentNode.parentNode.parentNode.dataset.id
    const isChild = [...e.target.classList].includes("fa-bookmark")



        console.log(e.target.classList)
        // if recipe is already saved, just unsave it
       console.log(isSaved(recipeid))
       if(isSaved(recipeid)){
        // remove from saved recipes
        console.log(recipeid)
            state.recipes.savedRecipes = state.recipes.savedRecipes.filter(el=> el.idMeal!==recipeid)
            console.log(state.recipes.savedRecipes)
            
            // remove the styling
            if(isChild){
                e.target.classList.add("fa-solid")

            }else{

                e.target.classList.remove("saved")
                e.target.classList.remove("saved")
            }


            displaySavedRecipes()
       }else{

           
           
           
           
        if(isChild){
            recipeid= e.target.parentNode.parentNode.parentNode.parentNode.dataset.id
            e.target.classList.add("fa-solid")
        }else{
            e.target.classList.add("saved")
        }
    console.log(state.recipes.recipeList)
    
    
    
    
    
   const savedRecipe = state.recipes.recipeList.filter(el=> el.idMeal==recipeid)
   console.log(savedRecipe[0])
   state.recipes.savedRecipes.push(savedRecipe[0])
   displaySavedRecipes()
   
   
   
   // Change the icon to saved
   console.log(e.target.classList)
   
   
   // change styles
}
   

}


function displaySavedRecipes(){
    console.log(state.recipes.savedRecipes)
    if(state.recipes.savedRecipes.length<=0){

        document.querySelector(".saved-recipe-list").textContent="No saved recipes currently!"
        return
    }
    document.querySelector(".saved-recipe-list").innerHTML=""
    const html = state.recipes.savedRecipes.map(el=>{
        return `   <div  data-id=${el.idMeal} class="saved-recipe">
        <div class="saved-recipe-name">${el.strMeal}</div>
    </div>`
    }).join(" ")

    document.querySelector(".saved-recipe-list").insertAdjacentHTML("afterbegin", html)
}



//  Expand ingreidents and show less
const moreIngredientsBtn = document.querySelector(".more-ingredients-btn");

moreIngredientsBtn.addEventListener("click", showMoreIngredients)


function showMoreIngredients(){
    console.log(moreIngredientsBtn.textContent)
    if(moreIngredientsBtn.textContent.trim()=="More ingredients"){
        document.querySelector(".more-ingredients").classList.remove("hidden")
        moreIngredientsBtn.textContent = "Less ingredients"
        
    }else if(moreIngredientsBtn.textContent.trim()=="Less ingredients"){
        document.querySelector(".more-ingredients").classList.add("hidden")
        moreIngredientsBtn.textContent = "More ingredients"

    }
    
}





async function showSalahTimeTable(time, coords){
    //get salah data

    const res= await fetch("/api/salah/table")

    const salahData = await res.json()


}

async function getGraphqlBusData(){

    const query = `
    query{
        
            stopPlaces {
              id
            }
          
    }
    `




    const res = await fetch("https://cors-anywhere.herokuapp.com/https://api.entur.io/journey-planner/v3/graphql", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({query})
    })

    
    console.log(res)


}

// getGraphqlBusData()






function getTimeTableData(){
    fetch("https://cloud.timeedit.net/uis/web/student_u/ri13Q65Yg55277Q0g6QY56y7Zc61X83776dY520yZ08Qh6Z6Qnk7bsnlc.html").then(res=> res.json()).then(data=>{
        console.log(data)
    })
}

getTimeTableData()