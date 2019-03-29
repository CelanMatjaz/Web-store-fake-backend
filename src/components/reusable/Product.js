import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//Actions
import { AddToCart } from '../../store/actions/productsActions';


class Product extends Component {
    state = {
        quantity: 1
    }

    handleAddToCart = () => {
        if(this.props.auth.isEmpty) this.props.history.push('/login');
        else{            
            if(this.props.data.quantity)
            this.props.AddToCart(this.props.data.id, this.state.quantity);
        }
    }

    render() {
        const { name, image, quantity, id, price } = this.props.data;
        const inCart = this.props.cartItems.find(item => item.id === id);
        return (
            <div className="product">
                <img src={`./images/${image}.jpg`} alt=""/>
                <div className="product-info">
                    <div className="product-name">{name}</div>
                    <div className="product-price">{price}€</div>
                    <div className="product-quantity">Left in stock: {quantity}</div> 
                    {quantity > 0 ? <button disabled={inCart || !quantity} onClick={this.handleAddToCart}>{inCart ? 'Added to cart' : 'Add to cart'}</button> : <button disabled>Out of stock</button>}
                </div>   
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    cartItems: state.products.cartItems
});

export default withRouter(connect(mapStateToProps, { AddToCart })(Product));

