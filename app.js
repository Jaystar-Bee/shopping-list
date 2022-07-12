
let shoppingList = [];

let localElement = localStorage.getItem('shoppingList')
if (localElement) {
    localElement = JSON.parse(localElement)
    shoppingList = localElement
}
updateElement()
addPrice()
checkList()

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    addElement()

})

function addElement() {
    let name = document.querySelector('#name').value
    let price = document.querySelector('#price').value
    const newElement = {
        id: new Date().toISOString(),
        name,
        price
    }
    shoppingList.unshift(newElement)
    updateElement()

    // Come back to Value changing
    document.querySelector('#name').value = ''
    document.querySelector('#price').value = ''
    // price = ''

    addToLocalStorage()
}

function updateElement() {
    const listCover = document.querySelector('.shop__list-cover')
    listCover.textContent = ''
    checkList()
    shoppingList.forEach(element => {

        const newHtml = `
        <div class="shop__list">
          <p class="shop__list-name">${element.name}</p>
          <div class="actions">
            <img src="/checkmark.png" alt="" class="check__image" />
            <p class="shop__list-price">&#8358; ${element.price}</p>
            <img src="/close.png" alt="" class="close__image" id="${element.id}" />
          </div>
        </div>
    `
        listCover.insertAdjacentHTML('beforeend', newHtml)
    })
    addPrice()

    const checkBtns = document.querySelectorAll('.check__image')

    checkBtns.forEach(checkbtn => checkbtn.addEventListener('click', (e) => {
        markElement(e)
    }))


    const deleteBtns = document.querySelectorAll('.close__image')

    deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', (e) => {
        deleteElement(e)
    }))


}

function addPrice() {
    let price = 0;
    shoppingList.forEach(element => {
        price += (element.price * 1)
    })

    const priceCover = document.querySelector('.total__price')
    priceCover.innerHTML = '&#8358; ' + '<b>' + price + '<b/>'
}

// Checking the list if empty
function checkList() {
    const form = document.querySelector('.message')
    if (shoppingList.length === 0) {
        const newHtml = `<h2 style="text-align: center;">You don't have a List Yet</h2>`
        form.innerHTML = newHtml

    } else {
        form.innerHTML = ''

    }
}

function markElement(e) {
    const el = e.target
    const theElement = el.parentNode.parentNode
    theElement.classList.toggle('green')
}

function deleteElement(e) {
    const el = e.target
    // read the element Id
    const id = el.getAttribute('id')
    // go to array and remove the element
    const theElementIndex = shoppingList.findIndex(list => list.id === id)
    shoppingList.splice(theElementIndex, 1)
    // update our List
    updateElement()
    addToLocalStorage()

}

function addToLocalStorage() {
    const localString = JSON.stringify(shoppingList)

    localStorage.setItem('shoppingList', localString)
}





































// let shoppingList = []

// document.querySelector('form').addEventListener('submit', (e) => {
//     addElement(e)
// })

// function addElement(e) {
//     e.preventDefault()
//     let name = document.querySelector('#name').value
//     let price = document.querySelector('#price').value
//     const newElement = {
//         id: new Date().toISOString(),
//         name,
//         price
//     }
//     shoppingList.push(newElement)
//     console.log(shoppingList)
//     updateElement()
//     document.querySelector('#name').value = ''
//     document.querySelector('#price').value = ''
// }

// function updateElement() {

//     const listCover = document.querySelector('.shop__list-cover')
//     listCover.textContent = ''
//     shoppingList.forEach(element => {
//         const html = `<div class="shop__list">
//           <p class="shop__list-name">${element.name}</p>
//           <div class="actions">
//             <img src="/checkmark.png" alt="" class="check__image" id="${element.id}"/>
//             <p class="shop__list-price">&#8358; ${element.price}</p>
//             <img src="/close.png" alt="" class="close__image" id="${element.id}"/>
//           </div>
//         </div>`
//         listCover.insertAdjacentHTML('beforeend', html)
//     })

//     checkElement()
// }
// function checkElement() {
//     const checks = document.querySelectorAll('.check__image')
//     checks.forEach((check) => {
//         check.addEventListener('click', e => {
//             const realElement = e.target
//             realElement.parentNode.parentNode.classList.toggle('green')
//         })
//     })
// }


// function purchasedProduct() {

// }