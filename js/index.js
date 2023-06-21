
const prices = {
    large: 114.99,
    small: 48.99,
    medium: 78.99,
}

class Receipt {

    date = moment(new Date()).format("ddd, DD MMMM YYYY, HH:mm:ss")
    id = this.generateReceiptID()

    constructor(user = {}, cart = []) {
        this.user = user;
        this.cart = cart;
    }

    getReceipt() {
        this.cart.forEach(element => {
            console.log(`Description: ${element.totalDescription()} size: ${element.size}`)
        });
    }

    generateReceiptID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let receiptID = '';
      
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          receiptID += characters.charAt(randomIndex);
        }
      
        return receiptID;
      }
}

class Wallet {
    balance = 800.97;

    deposit(amount) {
        this.balance += Number(amount);
    }

    withdraw(amount) {
        this.balance -= Number(amount);
    }

    getBalance() {
        return `R${this.balance.toFixed(2)}`
    }
}

class Person extends Wallet {

    constructor(firstName = 'John', lastName = 'Smith', address = '50 Harry Straat, Boon Again, 8000') {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }
}

class User extends Person {
    constructor(username) {
        super();
        this.username = username;
    }


}

class Pizza {
    qty = 0;
    id = 1;
    onCart = false;
    constructor(size, description) {
        this.name = `${_.capitalize(size)} Pizza`;
        this.size = size;
        this.available = size == 'large' ? 10 : size == 'medium' ? 50 : 35;
        this.description = description;
        this.price = prices[size]
        this.img = `https://www.pngitem.com/pimgs/m/526-5261209_pizza-top-view-png-png-download-pepperoni-png.png`
    }

    add() {
        this.qty++;
        this.available++;
    }

    subtract() {
        if (this.qty > 0) {
            this.qty--;
            this.available--;
        }

        if (this.qty == 0) {
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

    showOrder() {
        return this.qty > 0
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