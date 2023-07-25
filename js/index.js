
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
    onCart = false;
    constructor(size, description, price, type, id) {
        this.name = `${_.capitalize(size)} Pizza`;
        this.size = size;
        this.available = size == 'large' ? 10 : size == 'medium' ? 20 : 35;
        this.description = description;
        this.type = type;
        this.id = id;
        this.price = price ? price : prices[size]
        this.img = `https://www.pngitem.com/pimgs/m/526-5261209_pizza-top-view-png-png-download-pepperoni-png.png`
    }

    add() {
        this.qty++;
        this.available--;
    }

    subtract() {
        if (this.qty > 0) {
            this.qty--;
            this.available++;
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

    constructor(cart) {
        const { cart_code, status, username, id } = cart;
        this.id = id;
        this.cart_code = cart_code;
        this.username = username;
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getTotal() {
        // return _.sumBy(pizzas, p => )
    }
}


class PizzaAPI {
    constructor(username) {
        this.url = 'https://pizza-api.projectcodex.net';
        this.pizzas = [];
        this.username = username
    }

    getPizzas() {
        return axios.get(`${this.url}/api/pizzas`)
            .then((result) => {
                this.pizzas = result.data.pizzas;
                return this.pizzas;
            })
            .catch((error) => {
                console.error('Error fetching pizzas:', error);
                return [];
            });
    }

    addPizza(data) {
        return axios.post(this.url, { data })
            .then((result) => {
                this.pizzas = result.data.pizzas;
                return this.pizzas;
            })
            .catch((error) => {
                console.error('Error adding pizza:', error);
                return [];
            });
    }

    createPizzaCart() {
        const url = `${this.url}/api/pizza-cart/create`;
        // const username = req.query.username ? req.query.username : '';
        return axios.get(url, { params: { username: this.username } });

    }

    getPizzaCart(cardCode) {
        const url = `${this.url}/api/pizza-cart/${cardCode}/get`;
        return axios.get(url, { params: { cart_code: cardCode } });


    }

    addToCart({ cart_code, pizza_id }) {
        const url = `${this.url}/api/pizza-cart/add`;
        return axios.post(url, { body: { cart_code, pizza_id } });

    }

    removeFromCart({ cart_code, pizza_id }) {
        const url = `${this.url}/api/pizza-cart/remove`;
        return axios.post(url, { body: { cart_code, pizza_id } });

    }

    payCart({ cart_code, amount }) {
        const url = `${this.url}/api/pizza-cart/pay`;
        return axios.post(url, { body: { cart_code, pizza_id } });

    }

    findAllCarts() {
        const url = `${this.url}/api/pizza-cart/username/${this.username}/`;
        return axios.get(url, { params: { username: this.username } }).then(r => r.data)

    }

    // findActiveCarts() {
    //     const url = `${this.url}/api/pizza-cart/username/${username}/active`;

    // }

    featuredPizzas() {
        const url = `${this.url}/api/pizzas/featured?username=${this.username}`;
        return axios.get(url)

    }

    setFeatured(pizza_id) {
        const url = `${this.url}/api/pizzas/featured/`;
        return axios.post(url, { params: { username: this.username, pizza_id } });

    }

}


