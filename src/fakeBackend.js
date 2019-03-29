//emulated db
import users from './constants/users';
import products from './constants/products';

class backend{ 
    constructor(){
        this.users = users;
        this.products = products;
    }

    register = creds => {
        const { username } = this.users;
        if(this.users.find(user => user.username === username) || creds.password !== creds.passwordRepeat)
            return {
                errors: ['Could not register user']
            };
        this.users.push({
            username: creds.username,
            password: creds.password,
            addresses: [],
            orders: []
        });
        return {
            status: 'Register_success',
            msg: 'New account created'
        }
    }

    login = creds => {
        const { password, username } = creds;
        const user = this.users.find(user => user.username === username);
        if(user && user.password === password) 
            return {
                status: 'Login_success',
                token: 'token',
                msg: '',
                userInfo: {
                    username: user.username,
                    addresses: user.addresses,
                    id: user.id
                }
            }
        return {
            errors: ['Could not log user in']
        }
    }

    addAddress = (address, id) => {
        const user = this.users.find(user => user.id === id);
        if(user && user.addresses.length < 5){
            this.users.map(user => {
                if(user.id === id){
                    address.id = Math.random();
                    user.addresses.push(address);
                }
                return user;
            });

            const user = this.users.find(user => user.id === id);

            return {
                userInfo: {
                    username: user.username,
                    addresses: user.addresses,
                    id: user.id
                },
                status: 'Add_address_success'
            }
        }
        return {
            error: 'Could not add new address'
        }
    }

    updateAddress = (address, id) => {
        const user = this.users.find(user => user.id === id);
        if(user){
            const newAddresses = user.addresses.map(item => {
                if(item.id === address.addressID){
                    item = address;
                    item.id = address.addressID
                }
                return item;
            });

            user.addresses = newAddresses;

            this.users = this.users.map(item => {
                if(item.id === user.id) return user;
                return item;
            });

            return {
                userInfo: {
                    username: user.username,
                    addresses: user.addresses,
                    id: user.id
                },
                status: 'Update_address_success'
            }
        }
        return {}
    }

    deleteAddress = (addressID, id) => {
        console.log(addressID, id);
        const user = this.users.find(user => user.id === id);
        console.log(user);
        if(user){
            const newAddresses = user.addresses.filter(item => item.id !== addressID);

            this.users.map(item => {
                if(item.id === user.id) item.addresses = newAddresses;
                return item;
            });

            console.log(this.users);

            return {
                userInfo: {
                    username: user.username,
                    addresses: user.addresses,
                    id: user.id
                },
                status: 'Delete_address_success'
            }
        }
        return {}
    }

    getOrders = id => {
        const orders = this.users.find(user => user.id === id).orders;
        return orders;
    }

    placeOrder = (order, id) => {
        order.id = Math.random();
        order.cartItems.forEach(item => {
            this.products.map(product => {
                if(product.id === item.id){
                    product.quantity -= item.cartQuantity;
                }
                return product;
            });
        });
        const date = new Date();
        order.date = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
        order.id = Math.random();

        this.users.map(user => {
            if(user.id === id) user.orders.push(order);
            return user;
        });

        return {
            status: 'Order_confirmed'
        }
    }

    
}

export default new backend();