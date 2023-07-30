// DOM
const hourBox = document.querySelector(".date-hour")
const monthBox = document.querySelector(".date-month")
const dayBox = document.querySelector(".date-day")
const temperature = document.querySelector(".weather-temperature")
const closeModalBtn = document.querySelectorAll(".modal-close-btn")
const familyModal = document.querySelector(".modal-family")
const homeModal = document.querySelector(".modal-home")
const shoppingModal = document.querySelector(".modal-shopping")
const reminderModal = document.querySelector(".modal-reminder")
const familyBtn = document.querySelector(".btn-family")
const HomeBtn = document.querySelector(".btn-home")
const shoppingBtn = document.querySelector(".shopping-btn")
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




const state = {

    family:{
        members:[],
        highlights:[]
    },
    shopping:{
        lists:{
            week:[{name:"Ost", quantity:2}, {name:"Egg", quantity:1, description:"Mida box ga"}, {name:"Canbo", quantity:3}, {name:"Eple", quantity:4}],
            month:[{name:"Hvetemel", quantity:20}]
        }
    }
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

    const {date, hour, min, sec, month} = getNowDate()


    hourBox.textContent = hour+":"+min;
    monthBox.textContent = monthArray[month]
    dayBox.textContent = date




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
        temperature.textContent = weatherNow+" "+"℃";
    

        
        

    })).catch(err=> console.log(err))
    
    
    
    
    fetch(forcast).then(res=>res.json()).then(data=>{
        
        const hour = new Date().getHours()
        
        // Slice up the two thr next days data
        const nextDays = data.list.slice((23-hour), (23-hour+24))
        console.log(nextDays)
        
        
        nextdays.day1.temp = Math.round(nextDays[5].main.temp)-273
        nextdays.day2.temp = Math.round(nextDays[5+8].main.temp)-273
        nextdays.day3.temp = Math.round(nextDays[5+16].main.temp)-273


        console.log()
        
        document.querySelector(".day1").innerHTML = getNextDays()[0]+`<span>${nextdays.day1.temp} ℃</span>`
        document.querySelector(".day2").innerHTML = getNextDays()[1]+`<span>${nextdays.day2.temp} ℃</span>`
        document.querySelector(".day3").innerHTML = getNextDays()[2]+`<span>${nextdays.day3.temp} ℃</span>`

    })

}


//Events

window.addEventListener("load", function(e){

    // Load weather data
    

    document.querySelectorAll(".coming-soon").forEach(el=> el.innerHTML="Coming soon")
    getWeatherData()
    UpdateListData()
    document.querySelector(".list-items-count").textContent= state.shopping.lists.week.length +" "+"Items";
    deleteItemEvent()
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

newItemBtn.addEventListener("click", openAddList)
closeAddItemBtn.addEventListener("click", closeAddItem)

decreaseQuantity.addEventListener("click", function(e){
    var count = Number(quantityBox.textContent.trim())
    if(count>1){
        count=count-1
        updateQuantity(count)
    }
})
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

    if(date==4){
    }
    return [days[date+1], days[date+2], days[date+3]]
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