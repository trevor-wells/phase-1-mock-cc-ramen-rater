const ramenMenu = document.getElementById("ramen-menu")
const ramenImage = document.getElementById("detail-image")
const ramenName = document.getElementById("name")
const ramenRestaurant = document.getElementById("restaurant")
const ramenComment = document.getElementById("comment-display")
const ramenRating = document.getElementById("rating-display")
const ramenForm = document.getElementById("new-ramen")
const editForm = document.getElementById("edit-ramen")
const deleteButton = document.getElementById("delete-button")
let currentRamen

ramenForm.addEventListener("submit" , createRamen)
editForm.addEventListener("submit" , editRamen)
deleteButton.addEventListener("click" , deleteRamen)

fetch("http://localhost:3000/ramens")
.then(response => response.json())
.then(data => {
    data.forEach(renderMenu)
    chooseRamen(data[0])
})

function renderMenu(ramen){
    const newRamenImage = document.createElement("img")
    newRamenImage.src = ramen.image
    ramenMenu.append(newRamenImage)
    newRamenImage.id = ramen.id
    newRamenImage.addEventListener("click" , () =>  chooseRamen(ramen))
}

function chooseRamen(ramen){
    currentRamen = ramen
    ramenImage.src = currentRamen.image
    ramenName.textContent = currentRamen.name
    ramenRestaurant.textContent = currentRamen.restaurant
    ramenRating.textContent = currentRamen.rating
    ramenComment.textContent = currentRamen.comment
}

function createRamen(event){
    event.preventDefault()
    const newRamen = {
        name: document.getElementById("new-name").value,
        restaurant: document.getElementById("new-restaurant").value,
        image: document.getElementById("new-image").value,
        rating: document.getElementById("new-rating").value,
        comment: document.getElementById("new-comment").value
    }
    renderMenu(newRamen)
    event.target.reset()

    fetch("http://localhost:3000/ramens" , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newRamen)
    })
}

function editRamen(event){
    event.preventDefault()
    currentRamen.rating = document.getElementById("edited-rating").value
    currentRamen.comment = document.getElementById("edited-comment").value
    chooseRamen(currentRamen)
    event.target.reset()
    fetch(`http://localhost:3000/ramens/${currentRamen.id}` , {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(currentRamen)
    })
}

function deleteRamen(){
    document.getElementById(currentRamen.id).remove()
    ramenImage.src= ""
    ramenName.innerHTML = ""
    ramenRestaurant.innerHTML = ""
    ramenRating.innerHTML = ""
    ramenComment.innerHTML = ""

    fetch(`http://localhost:3000/ramens/${currentRamen.id}` , {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    })
}