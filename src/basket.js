class Basket {
    constructor() {
        this.items = this.getStorage();
        console.log('init', this.getStorage())
    }

    add(product) {
        this.items.push(product);
        this.setStorage();
    }

    remove(id) {
        const index = this.items.findIndex((el) => {
            return el.id === id
        });
        this.items.splice(index, 1);
        this.setStorage()
    }

    clear() {
        this.items = [];
        this.clearStorage();
    }

    getItems() {
        return this.items;
    }

    sumBasket() {
        return this.items.reduce((pre, next) => pre + Number(next.price), 0)
    }

    showBasket() {
        console.log(this.sumBasket());
    }

    getStorage() {

        if (!!localStorage.getItem('basket')) {
            return JSON.parse(localStorage.getItem('basket'))
        } else {
            return [];
        }
    }

    setStorage() {
        localStorage.setItem('basket', JSON.stringify(this.items));
    }

    clearStorage() {
        localStorage.removeItem('basket');
    }
};

