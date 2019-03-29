import { 
    getProducts,
    getProductsSuccess,
    addToCart,
    removeFromCart,
    incrementProduct,
    decrementProduct,
    placeOrder,
    placeOrderSuccess,
    placeOrderFailed,
    resetOrderErrors
} from './action_creators/products';

import fakeBackend from '../../fakeBackend';

//Gets products from server
export const GetProducts = () => {
    return dispatch => {
        dispatch(getProducts());
        dispatch(getProductsSuccess(fakeBackend.products));
    }
}
//Adds product to cart
export const AddToCart = (id, quantity) => (dispatch => dispatch(addToCart(id, quantity)));
//Increments product quantity in cart
export const incrementProductQuantity = id => dispatch => dispatch(incrementProduct(id));
//Decrements product quantity in cart
export const decrementProductQuantity = id => dispatch => dispatch(decrementProduct(id));
//Removes product from cart
export const RemoveFromCart = id => dispatch => dispatch(removeFromCart(id));
//Resets all order messages and errors
export const action_resetOrderErrors = () => dispatch => dispatch(resetOrderErrors());

export const action_EmptyCart = () => dispatch => dispatch(resetOrderErrors());

//Sends order data to server
export const action_placeOrder = (order, id) => {
    return dispatch => {
        dispatch(placeOrder());
        const data = fakeBackend.placeOrder(order, id);
        if(data.status === 'Order_confirmed')
            dispatch(placeOrderSuccess());
        else
            dispatch(placeOrderFailed());
    }
}