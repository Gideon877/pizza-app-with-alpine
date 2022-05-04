
const prices = {
    large: 114.99,
    small: 48.99,
    medium: 78.99
}

class Pizza {
    qty = 0;
    id = 1;
    onCart = false;
    constructor(size, description) {
        this.name = `${_.capitalize(size)} Pizza`;
        this.size = size;
        this.description = description;
        this.price = prices[size]
        this.img = `https://image.shutterstock.com/image-vector/italian-pizza-tomato-sausage-olive-600w-554691619.jpg`
    }
    
    add() {
        this.qty++;
    }
    
    subtract() {
        if (this.qty > 0) {
            this.qty--;
        }

        if(this.qty == 0) {
            this.onCart = false
        }
    }
    
    subTotal() {
        return (Number(this.qty) * Number(this.price)).toFixed(2);
    }
    
    getSubTotal() {
        return `R${(Number(this.qty) * Number(this.price)).toFixed(2)}`
    }
    showMore() {
        return this.qty > 0
    }

    setStatus() {
        this.onCart = !this.onCart;
    }

    totalDescription() {
        return `${_.capitalize(this.size)} pizzas total: `
    }
}

class Cart {


    getTotal() {
        // return _.sumBy(pizzas, p => )
    }
}