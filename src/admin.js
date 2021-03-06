const shop = new Shop();


function clearProductsFromShop() {
    shop.getItems().forEach(product=>{
        basket.remove(product.id)
    })
    shop.clear();

}

function renderAdminInterface() {
    const addProductBtn = document.querySelector('.addNewProductBtn')
    const clearBtn = document.querySelector('.clearShop');
    addProductBtn.addEventListener('click', addProductToShop);
    clearBtn.addEventListener('click', clearProductsFromShop)
    renderProducts()
}

function addProductToShop(event) {

    event.preventDefault();

    let productName = document.querySelector('[name="name"]').value;
    let productPrice = document.querySelector('[name="price"]').value;
    const addProductBtn = document.querySelector('.addNewProductBtn');

    const product = new Product(shop.getItems().length+3,productName, Number(productPrice))
    shop.add(product);
    renderProducts();

}

function removeProductFromShop(event) {
    event.preventDefault();
    const {id} = event.target.dataset;
    shop.remove(id);
    //if a product is removed form shop. A client can't buy it.
    const updatedBasket = basket.getItems().filter(product=>{
        return product.id !== id;
    })
    basket.replaceAll(updatedBasket);
    event.target.parentElement.remove();
    renderProducts();
    renderProductInBasket();
}

function renderProducts() {
    const productsList = document.querySelector('.products__list-new');
    productsList.textContent = '';
    for (const {id, name, price} of shop.getItems()) {
        const li = document.createElement('li');
        const strong = document.createElement('strong');
        const addBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        li.setAttribute('class', 'products__item')
        strong.textContent = `${name} - ${price} zł`
        addBtn.dataset.id = id;
        addBtn.dataset.name = name;
        addBtn.dataset.price = price;
        addBtn.textContent = 'Kup'
        addBtn.setAttribute('class', 'products__button')
        addBtn.addEventListener('click', addProductToBasket)
        removeBtn.dataset.id = id
        removeBtn.textContent = "usuń ze sklepu"
        removeBtn.addEventListener('click', removeProductFromShop)
        li.appendChild(strong)
        li.appendChild(addBtn)
        li.appendChild(removeBtn)

        productsList.appendChild(li)
    }
}


renderAdminInterface();