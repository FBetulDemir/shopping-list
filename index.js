// https://shopping-list-40f3b-default-rtdb.europe-west1.firebasedatabase.app/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-40f3b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listDisplay = document.getElementById("list-display")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    // inputFieldEl.value = ""
    clearInputFieldEl()
    
    // listDisplay.innerHTML += 
    //     `
    //         <ul>
    //             <li>${inputValue}</li>
    //         </ul>
    //     `
    //appendItemToShoppingListEl(inputValue)
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearListDIsplay()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem= itemsArray [i]
            let currentItemID = currentItem [0]
            let currentItemValue =currentItem [1]
    
            appendItemToShoppingListEl(currentItem)
            console.log(currentItem)
        }
    }else{
        listDisplay.innerHTML = "No items on the list yet."
    }
})

function appendItemToShoppingListEl(item) {
    // listDisplay.innerHTML += 
    //     `
    //         <ul>
    //             <li>${itemValue}</li>
    //         </ul>
    //     `

    let itemID = item[0]
    let itemValue = item[1]

    let newItem = document.createElement("li")
    newItem.textContent = itemValue

    newItem.addEventListener("click", function (){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    listDisplay.append(newItem)
}

function clearListDIsplay (){
    listDisplay.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}