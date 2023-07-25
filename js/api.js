const orderHistory = [
    {
        "id": 24306,
        "username": "gideon877",
        "pizzas": [
            {
                "qty": 3,
                "size": "large",
                "flavour": "Hawaiian"
            },
            {
                "qty": 1,
                "size": "large",
                "flavour": "Garlic & Mushroom"
            }
        ]
    },
    {
        "id": 24307,
        "username": "john_doe",
        "pizzas": [
            {
                "qty": 2,
                "size": "medium",
                "flavour": "Pepperoni"
            },
            {
                "qty": 1,
                "size": "small",
                "flavour": "Margherita"
            }
        ]
    }
    // Add more order history data as needed
];

document.addEventListener('alpine:init', () => {
    Alpine.data('data', () => {
        return {
            header: 'Pizza Hurt Menu',
            orderHistory,
            themeColor: 'pink',
            username: 'gideon877',
            appApi: {},
            cartCode: '',
            carts: [],
            showMenu: true,
            showPayment: true,
            steps: 1,
            orders: [],
            pizzas: [],
            currentUser: {},
            userAmount: '',
            appMessage: {
                message: '',
                color: 'alert alert-light',
                show() {
                    return !_.isEmpty(this.message)
                },
            },
            showReceiptModal: false,
            isLoggedIn: true,
            receipts: [],
            init() {

                console.log(this.orderHistory)

                if (_.isEmpty(this.currentUser)) {
                    this.currentUser = new User('gideon877');
                    if (localStorage.getItem('user') == null) {
                        localStorage.setItem('user', JSON.stringify(this.currentUser));
                    } else {
                        const localUser = JSON.parse(localStorage.getItem('user'));
                        this.currentUser = Object.assign(new User(), localUser);

                    }
                }
                const savedReceipts = localStorage.getItem('receipts');
                if (savedReceipts) {
                    this.receipts = JSON.parse(savedReceipts);

                    this.receipts.forEach((receipt) => {
                        let total = 0;
                        receipt.cart.forEach((cartItem) => {
                            const itemTotal = cartItem.qty * cartItem.price;
                            total += itemTotal;
                            cartItem.total = itemTotal;
                        });
                        receipt.total = total.toFixed(2);
                    });
                }

                else {
                    this.receipts = [];
                }


                this.appApi = new PizzaAPI(this.currentUser.username);
                this.appApi.getPizzas()
                    .then((pizzas) => {
                        console.log(pizzas.length);
                        this.pizzas = pizzas
                            .map(pizza =>
                                new Pizza(pizza.size, pizza.flavour, pizza.price, pizza.type, pizza.id));
                        return
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                 this.appApi.findAllCarts()
                    .then(carts => {
                        this.carts = carts;
                    }).catch(err => console.log(err))
                // this.pizzas = this.pizzas
                //     .map(pizza =>
                //         new Pizza(pizza.size, pizza.description));

                // this.order(this.pizzas[2])
            },

            onLogin(){
                this.isLoggedIn = true;
                localStorage.setItem('username', this.username)
                console.log(this.username);
                console.log(localStorage.getItem('username'))
            },

            onLogout(){
                this.isLoggedIn = false;
                localStorage.removeItem('username')
                this.username = null;
                console.log(this.username);
                console.log(localStorage.getItem('username'))
            }

        }
    })
});
