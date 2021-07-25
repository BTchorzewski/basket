const productList = document.querySelector('.products__list');
const allBuyBtn = document.querySelectorAll('.products__button');
const basketList = document.querySelector('.basket__list');
const clearBtn = document.querySelector('.basket__btn-clear');
const basket = new Basket();


function renderBasketInterface() {
    renderProductInBasket()
    renderOrderButton();
}

function renderProductInBasket() {
    const clearBasketBtn = document.querySelector('.basket__btn-clear');
    //  clean basket list before rendering items.
    basketList.innerHTML = '';
    //  we can use destructuring as a parameter.
    for (const {id, name, price} of basket.getItems()) {
        const li = document.createElement('li');
        const removeBtn = document.createElement('button');
        li.textContent = `${name} - ${price} zł`;
        li.dataset.id = id;
        removeBtn.innerText = 'usuń produkt';
        removeBtn.dataset.id = id;
        removeBtn.setAttribute('class', 'basket__btn-remove')
        //add eventListener to a new created element.
        removeBtn.addEventListener('click', removeProduct);
        li.appendChild(removeBtn);
        //append new elements into basket list.
        basketList.appendChild(li);
    }

}

function renderOrderButton() {
    const orderBtn = document.querySelector('.orderBtn');
    if (basket.sumBasket() > 0) {
        orderBtn.textContent = `zamówienie na kwote ${basket.sumBasket()} zł`
    } else {
        orderBtn.textContent = `Czekam na zamównienie`;
    }
    basket.showBasket();
    orderBtn.disabled = basket.sumBasket() === 0;

}

function addProductToBasket(event) {
    //prevent refreshing page
    event.preventDefault();
    //destructuring data elements.
    const {id, name, price} = event.target.dataset;
    const product = new Product(id, name, price);
    basket.add(product);
    renderBasketInterface();
}

function removeProduct(event) {
    event.preventDefault();
    const {id} = event.target.dataset;
    console.log('removed button clicked');
    basket.remove(Number(id));
    renderBasketInterface();
}

function clearBasket() {
    basket.clear();
    renderBasketInterface()
}

renderBasketInterface()

for (const btn of allBuyBtn) {
    btn.addEventListener('click', addProductToBasket);
}

clearBtn.addEventListener('click', clearBasket);
