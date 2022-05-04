document.addEventListener('alpine:init', () => {
    Alpine.data('data', () => {
        return {
            init() {
                this.pizzas = this.pizzas
                    .map(pizza =>
                        new Pizza(pizza.size, pizza.description));
            },
            getQtyTotal() {
                return _.sumBy(this.orders, order => Number(order.qty))
            },
            total() {
                const total = _.sumBy(this.orders, p => Number(p.subTotal()));
                return (total > 0) ? total.toFixed(2) : '0.00'
            },
            getTotal() {
                return `R${this.total()}`
            },
            onCheckout(){

                if(this.userAmount >= this.total()) {
                    this.clearCart();

                } else {
                    alert('Insufficient balance!');
                }
                
                // get amount
                // get diff with total
                // return message
            },
            clearCart() {
                if(confirm('Would you like to clear the cart?')) {
                    this.orders.forEach(order => {
                        order.onCart = false;
                        order.qty = 0;
                    })
                    this.userAmount = ''
                    this.orders = []
                }
            },
            remove(pizza) {
                if(confirm(`Would you like to remove ${pizza.name} from cart?`)) {
                    this.orders = this.orders.filter(o => o.size !== pizza.size);
                    pizza.onCart = false;
                    pizza.qty = 0;
                }
            },
            order(pizza) {
                if (!pizza.onCart) {
                    // add to cart only if doesn't exist
                    if (_
                        .isEmpty(_
                            .filter(this.orders,
                                order =>
                                    order.size === pizza.size
                            )
                        )
                    ) {

                        pizza.add()
                        this.orders.push(pizza)
                    }

                    if (pizza.qty === 0) {
                        pizza.add()
                    }
                }
                pizza.setStatus();
            },
            showCart() {
                const orders = this.orders;
                if (orders.length == 0) {
                    return false
                }
                // return true
                const hasOrders = _.filter(orders, order => order.qty > 0) // check if qty is 0 and remove item from cart/orders
                if (_.isEmpty(hasOrders)) {
                    this.orders = [];
                }
                return !_.isEmpty(hasOrders)
            },
            orders: [],
            pizzas: [
                {
                    id: 1,
                    size: 'large',
                    description: `large margeritha pizza with 3 toppings max.
                        3 meat toppings max.
                        3 or less other toppings.`,

                },
                {
                    id: 2,
                    size: 'medium',
                    description: `medium margeritha pizza with 3 toppings max.
                        2 or less meat topping.
                        3 or less other toppings.`,
                },
                {
                    id: 3,
                    size: 'small',
                    description: `small pizza with 3 toppings
                        1 meat topping.
                        3 or less other toppings.`,
                }
            ],
            currentUser: {
                username: 'Gideon877',
            },
            userAmount: ''


        }
    })
})