const carContainer = document.getElementById("car-container");
const carText = document.getElementById("car-text");
const carForm = document.getElementById("car-form");
const carArray = [];

document.addEventListener("DOMContentLoaded", ()=>{
 carFetch();            
 carSubmit();   
 filterBtn();                        
})                                 

function carFetch(){
    fetch("http://localhost:3000/Cars")
    .then(res=>res.json())
    .then(data=>{
        Object.values(data).forEach(car=>carArray.push(car))
    })
}

function carSubmit(){
    carForm.addEventListener("submit", e=>{
        e.preventDefault()
        const foundCar = carArray.find((car) => {
            console.log(carText.value.trim().toLowerCase())
            if(carText.value.trim() === car.name||carText.value.trim() === car.name.toLowerCase()||carText.value.trim() === car.name.toUpperCase()){
                return car;
            }
        });
        if(foundCar) {
            carText.value = "";
            makeCarCard(foundCar);
            console.log(foundCar)
        }
    })
}

function makeCarCard(car){
    const carCard = document.createElement("div")
    carCard.innerHTML = `<h1>${car.name}</h1><br><h3>${car.model}</h3><br><h4>${car.year}</h4><br><img src=${car.image} width = 400px height=200px><br><li>$${car.price}</li><br><button id=car-button>show Information</button> <button id=delete-car>Delete</button>`
    carCard.classList.add("carCard")
    carContainer.append(carCard)
    const infoButton = carCard.querySelector("#car-button")
    infoButton.addEventListener("click",()=>{
        showDeatilsOfCar(car, carCard)
        infoButton.disabled = true;
    })
    const deleteBtn = carCard.querySelector("#delete-car");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click",()=>{
     del(carCard)
    })
}

function showDeatilsOfCar(car,carCard){
    const p = document.createElement("p");
    p.classList.add("p");
    p.innerHTML = car.details;
    carCard.appendChild(p);
}

function filterBtn(){
    const filterBtn = document.createElement("button");
    filterBtn.textContent = "show cars Less then 90,000"
    carContainer.appendChild(filterBtn)
    filterBtn.addEventListener("click", ()=>{  //filterButton
    filterBtn.disabled = true
    const filteredDiv = document.createElement("div") ;  
    filteredDiv.classList.add("filterDiv");
    carContainer.appendChild(filteredDiv)
    const filteredCars = carArray.filter(car => parseFloat(car.price) <= 90000)
    filteredCars.forEach(car=> {
     let li = document.createElement("li")
     li.textContent = `${car.name} ${car.model} $${car.price}`
     filteredDiv.appendChild(li)
    })
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "close"
    filteredDiv.appendChild(closeBtn)
    closeBtn.addEventListener("click", ()=>{
        del(filteredDiv)
        filterBtn.disabled = false
    })
    })
}

function del(div){
    div.innerHTML = "";
}