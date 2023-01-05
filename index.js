import{menuArray} from "./data.js"


const modal = document.getElementById('modal')

let orderArray = []
let totalPrice = 0
let targetItemObj = {}

//handle click events
document.addEventListener('click', function(e){
  if(e.target.dataset.add){
     order.classList.remove('hidden')
      handlePlusBtn(e.target.dataset.add)
    }else if(e.target.dataset.remove){
      handleRemoveBtn(e.target.dataset.remove)
    }else if(e.target.id ==='order-button'){
      modal.style.display = 'inline'
    }else if(e.target.id ==='modal-close-btn'){
      modal.style.display = 'none'
    }
})

// handles submit events on the modal
modal.addEventListener('submit', function(e){
  
  e.preventDefault()

  const consentFormData = new FormData(modal)
  const fullName = consentFormData.get('fullName')

    modal.innerHTML = `
    <div class="modal-after-pay" id="modal-after-pay">
        <img src="images/giphy.gif" class="loading">
        <p id="confirming-text">Confirming Payment....</p>
    </div>` 

  setTimeout(function(){
    modal.style.display = 'none'
    document.getElementById('message').innerHTML = `
    <p class="thk-text">Thanks <span class="bold-text">${fullName}!</span> Your order is on it's way! </p>
    ` 
  }, 3000)

})




function handlePlusBtn(itemId){

  //check targetitem's id and id in the data

    targetItemObj = menuArray.filter(function(item){

      //item.id(0,1,2) is number and itemId("0","1","2") is string. so you cant use === here   

     return item.id == itemId
    })[0]

    targetItemObj.quantity ++
    targetItemObj.totalPrice += targetItemObj.price

    totalPrice += targetItemObj.price

    if(!orderArray.includes(targetItemObj)){
      orderArray.push(targetItemObj)
    }
    getOrderHtml()
}



function handleRemoveBtn(removedId){
 orderArray = orderArray.filter((item) => {
      return (item.id != removedId)
      })
    
    totalPrice = 0

    orderArray.forEach(function(item){
      totalPrice += item.totalPrice
    })

    getOrderHtml()

    if(totalPrice == 0){
      order.classList.add('hidden')
    }
  }




function getOrderHtml(){
 let orderHtml = ''
 let totalPriceHtml =''
for(let item of orderArray){
  orderHtml += `
  <div class="flex-space">
     <p class="order-name">${item.name}</p><button class="remove" data-remove=${item.id}>remove</button><p class="order-quantity">(${item.quantity})</p><p class="item-totalprice">$${item.totalPrice}</p>
  </div>
`
}

totalPriceHtml = `
<div class="flex-space">
  <p class="total-price-title">Total Price:</p>
  <p>${totalPrice}</p>
</div>`

console.log(totalPrice)

  document.getElementById('ordered-item').innerHTML = orderHtml
  document.getElementById('total-price').innerHTML = totalPriceHtml

}


let menuHtml = ''

function getMenuHtml(){
  
  menuArray.forEach(function(item){
     menuHtml += `
              <div class="item-container">
                <div class="item-emoji">${item.emoji}</div>
                  <div class="item-text-container">
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                  </div>
                  <button class="plus-button" id="plus-button" data-add=${item.id}>+</button>
              </div>
            `
          })
  
    return menuHtml
}


function renderMenu(){
  document.getElementById('menu').innerHTML = getMenuHtml()
}



renderMenu()
