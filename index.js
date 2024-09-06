const carContainer = document.getElementById("car-container");
const carText =document.getElementById("car-text");
const carForm = document.getElementById("car-form");

document.addEventListener("DOMContentLoaded", ()=>{
 carFetch()
})

function carFetch(){
    fetch("http://localhost:3000/Cars")
    .then(res=>res.json())
    .then(data=>{
        Object.values(data).forEach(car=>{
            carSubmit(car)
        })
    })
}

function carSubmit(car){
    carForm.addEventListener("submit", e=>{
        e.preventDefault()
        if(carText.value === car.name||carText.value === car.name.toLowerCase()||carText.value === car.name.toUpperCase()){
            console.log(car.name)
            carText.value = ""
            makeCarCard(car)
        }
    })
}


function makeCarCard(car){
    const carCard = document.createElement("div")
    carCard.innerHTML = `<h1>${car.name}</h1><br><h3>${car.model}</h3><br><h4>${car.year}</h4><br><img src=${car.image} width = 400px height=200px><br><li>${car.price}</li><br><button id=car-button>show Information</button> <button id=delete-car>Delete</button>`
    carContainer.append(carCard)
    const infoButton = carCard.querySelector("#car-button")
    infoButton.addEventListener("click",()=>{
        showDeatilsOfCar(car, carCard)
    })
    const deleteBtn = carCard.querySelector("#delete-car");
    deleteBtn.addEventListener("click", ()=>{
        carCard.innerHTML = ""
    })
}

function showDeatilsOfCar(car,carCard){
 const p = document.createElement("p")
 p.classList.add("p")
 p.innerHTML = car.details
carCard.appendChild(p)
}