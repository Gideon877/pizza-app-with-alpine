// todo: add cart process workflow with timeout simulation -> order -> pay -> wait -> delivered -> receipt
// todo: add loading on process, and update show on done

document.addEventListener('alpine:init', () => {
    Alpine.data('data', () => {
        return {
            header: 'Pizza Hurt Menu',
            themeColor: 'blue',
            init() {

                if(_.isEmpty(this.currentUser)) {
                    this.currentUser = new User('Gideon877');
                }
                console.log(this.currentUser.getBalance());
                this.pizzas = this.pizzas
                    .map(pizza =>
                        new Pizza(pizza.size, pizza.description));

                // this.order(this.pizzas[2])
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
            checkOutSteps() {
                this.step_1();
                alert(this.checkoutData.state)
                // press button, hide cart, show status
            },
            checkoutData: {
                loading: false,
                message: '',
                error: false,
                state: null
            },
            showMenu: true,
            showPayment: true,
            steps: 1,
            step_1() {
                this.checkoutData.loading = true;
                this.checkoutData.state = 'in_process'
                this.showMenu = false;
                setTimeout(() => {
                    this.checkoutData = {
                        ...this.checkoutData,
                        loading: false,
                    };
                    this.step_2()
                }, 3000);
            },
            step_2() {
                this.steps++;

            },
            step_3() {
                this.steps = 3;
                setTimeout(() => {
                    this.checkoutData = {
                        ...this.checkoutData,
                        loading: false,
                    };
                    this.steps = 1;
                    this.clearCart()
                    this.showMenu = true;
                    this.checkoutData.loading = false;
                    this.checkoutData.state = null;
                }, 3000);

            },
            onCheckout() {


                console.log(this.currentUser, this.total());

                this.currentUser.withdraw(this.total());
                this.checkoutData.loading = true
                this.steps = 4
                setTimeout(() => {
                    this.checkoutData = {
                        ...this.checkoutData,
                        loading: false,
                    };
                    this.step_3()
                }, 3000);

                // setTimeout(() => this.appMessage.message = '', 5000)

                // if (this.userAmount >= this.total()) {
                //     // receipt
                //     const userChange = Number(this.userAmount) - Number(this.total());
                //     this.appMessage.message = `Payment confirmed!
                //         <br/>
                //         Paid: R${this.userAmount}
                //         Item(s): x${this.getQtyTotal()} 
                //         Change: R${userChange}
                //         \nThanks for shopping with us. `

                //     this.appMessage.color = 'alert alert-success'
                //     // this.clearCart();

                // } else {
                //     alert('Insufficient balance!');
                //     this.appMessage = {
                //         ...this.appMessage,
                //         color: 'alert alert-danger',
                //         message: ''
                //     }
                // }




                // get amount
                // get diff with total
                // return message
            },
            clearCart() {
                if (confirm('Would you like to clear the cart?')) {
                    this.orders.forEach(order => {
                        order.onCart = false;
                        order.qty = 0;
                    })
                    this.userAmount = ''
                    this.orders = [];
                    this.init()
                }
            },
            remove(pizza) {
                if (confirm(`Would you like to remove ${pizza.name} from cart?`)) {
                    this.orders = this.orders.filter(o => o.size !== pizza.size);
                    pizza.onCart = false;
                    pizza.qty = 0;
                }
            },
            order(pizza) {
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
                    this.orders.sort().push(pizza)
                }

                if (pizza.qty === 0) {
                    pizza.add()
                }
                pizza.setStatus();
            },
            showCart() {
                const orders = this.orders;
                if (this.checkoutData.state != null) return false
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
            currentUser: {},
            userAmount: '',
            appMessage: {
                message: '',
                color: 'alert alert-light',
                show() {
                    return !_.isEmpty(this.message)
                },
            }


        }
    })
})