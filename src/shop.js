class Shop {
    constructor() {
        this.items = this.getStorage();
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
        this.clearStoreage()
    }

    getItems() {
        return this.items;
    }

    getStorage() {
        if (!!localStorage.getItem('shop')) {
            return JSON.parse(localStorage.getItem('shop'))
        } else {
            return [];
        }
    }

    setStorage() {
        localStorage.setItem('shop', JSON.stringify(this.items));
    }

    clearStoreage() {
        localStorage.removeItem('shop');
    }
};

