// https://shopping-list-40f3b-default-rtdb.europe-west1.firebasedatabase.app/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listDisplay = document.getElementById("list-display")

const appSettings = {
    databaseURL: "https://shopping-list-40f3b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")



addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    inputFieldEl.value = ""
    
    listDisplay.innerHTML += 
        `
            <ul>
                <li>${inputValue}</li>
            </ul>
        `
})