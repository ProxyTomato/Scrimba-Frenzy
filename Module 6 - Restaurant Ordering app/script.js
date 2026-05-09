import {dinerMenu} from "./data.js";

const menu = document.getElementById("menu");
const orderSection = document.getElementById("order-section")
const popUp = document.getElementById("card-details-popup");
const thankYouPopup = document.getElementById("thank-you-popup");
let orderList = []

const renderDinerMenu = function() {
    menu.innerHTML = dinerMenu.map(food => {
        return `
        <li class="food-card">
                <div class="food-emoji">${food.emoji}</div>
                <div class="food-info-container">
                    <h1 class="food-name">${food.name}</h1>
                    <p class="food-ingredient">${food.ingredients}</p>
                    <h2 class="food-price">$${food.priceInDollar}</h2>
                </div>
                <button class="add-btn" data-add="${food.uuid}">+</button>
        </li>
        `
    }).join('');
}

const renderOrderList = function() {
    if(orderList.length === 0){
        document.getElementById("order-container").style.display = 'none';
        return false;
    }

    document.getElementById("order-container").style.display = 'flex';

    const orderInfo =document.getElementById("order-info");
    let totalPrice = 0;
    orderInfo.innerHTML = orderList.map(item => {
        const {uuid, numberOfOrders} = item;
        const {name, priceInDollar} = dinerMenu.find(food => {return food.uuid === uuid});
        const totalItemPrice = priceInDollar * numberOfOrders;
        totalPrice += totalItemPrice;
        const numberOfOrderHTML = numberOfOrders === 1 ? '' : ` x ${numberOfOrders}`;
        return `<div class="order-info-item">
                    <h2>${name}${numberOfOrderHTML}</h2>
                    <button class="remove-btn" data-remove="${uuid}">remove</button>
                    <h3>$${totalItemPrice}</h3>
                </div>`
    }).join('') + `<hr>
                <div class="order-info-item">
                    <h2>Total Price</h2>
                    <h3>$${totalPrice}</h3>
                </div>`
}

/* using Luhn algorithm to check if the card number is valid */
const isValidCardNumber = function(cardNumberString) {
    if(cardNumberString.length !== 12) return false;
    try {
        let cardNumber = parseInt(cardNumberString)
        let total = 0;
        while(cardNumber !== 0) {
            let currentDigit = (cardNumber % 10) * 2;
            total += currentDigit % 10 + Math.floor(currentDigit / 10);
            cardNumber = Math.floor(cardNumber / 10);
        }
        return total % 10 === 0;
    } catch (e) {
        console.error(e);
      return false;
    }
}


document.getElementById('app').addEventListener("click", event => {
    /* check if add button is clicked. If yes add food to order list and render it */
    if(event.target.dataset.add) {
        thankYouPopup.style.display = 'none';
        const target = orderList.find(function(food){
            return food.uuid === event.target.dataset.add;
        })
        if(target) target.numberOfOrders++;
        else orderList.push({ uuid: event.target.dataset.add, numberOfOrders: 1 });
        renderOrderList()
    }

    /* check if remove button is clicked. If yes add food to order list and render it */
    else if(event.target.dataset.remove) {
        orderList = orderList.filter(function(food){return food.uuid !== event.target.dataset.remove;});
        renderOrderList()
    }

    /* check if complete button is clicked. If yes, show the pop-up to let customer enter necessary information */
   else if(event.target.id === 'complete-btn'){
       orderSection.style.pointerEvents = 'none'
       orderSection.style.opacity = '0.5'
       popUp.style.display = 'flex'

   }
});

/* I want it to be in universal listener but alas I don't know to add submit listener to it so, here we are
/* it also check if entered card number is valid. if not form will not be submitted (I think?) */
popUp.addEventListener('submit', event => {
    event.preventDefault()
    let data = new FormData(popUp)
    if(isValidCardNumber(data.get('cardNumber'))) return false

    orderSection.style.pointerEvents = 'auto'
    orderSection.style.opacity = '1'
    popUp.style.display = 'none'

    orderList = []
    renderOrderList()

    thankYouPopup.innerText = `Thanks!, ${data.get('name')}. \nYour order is on its way!`
    thankYouPopup.style.display = 'block';
})

renderDinerMenu();
renderOrderList();