import {
    register, registerSuccess, registerFailed,
    login, loginSuccess, loginFailed,
    logout,
    checkIfLoggedIn, checkIfLoggedInFailed,
    resetErrors,
    addAddress, addAddressSuccess, addAddressFailed,
    updateAddress, updateAddressSuccess, updateAddressFailed,
    deleteAddress, deleteAddressSuccess, deleteAddressFailed,
    makeAddressActive, setAddressIdToUpdate,
    getUserOrders
} from './action_creators/auth';

import fakeBackend from '../../fakeBackend';

export const action_checkIfLoggedIn = () => {
    return dispatch => {
        dispatch(checkIfLoggedIn());
        dispatch(checkIfLoggedInFailed());  
    }
}

//Register action
export const action_register = creds => {
    return dispatch => {
        dispatch(register());
        const data = fakeBackend.register(creds);
        if(data.status === 'Register_success') dispatch(registerSuccess(data.msg));
        else dispatch(registerFailed(data.errors || []));
    }
}

//Login action
export const action_login = creds => {
    return dispatch => {
        dispatch(login());
        const data = fakeBackend.login(creds);
        if(data.status === 'Login_success')
            dispatch(loginSuccess(data.userInfo, data.token, data.msg));
        else
            dispatch(loginFailed(data.errors));
    }
}

//Action for logging out a user
export const action_logout = () => dispatch => dispatch(logout());

//Action for reseting all the errors on authReducer
export const action_resetErrors = () => dispatch => dispatch(resetErrors());

//Add new address action
export const action_addNewAddress = (address, id) => {
    return dispatch => {
        dispatch(addAddress());
        const data = fakeBackend.addAddress(address, id);
        if(data.status === 'Add_address_success')
            dispatch(addAddressSuccess(data.userInfo));                 
        else
            dispatch(addAddressFailed(data.error));    
    }
}

//Update address action
export const action_updateAddress = (address, id) => {
    return dispatch => {
        dispatch(updateAddress());
        const data = fakeBackend.updateAddress(address,id);
        if(data.status === 'Update_address_success')
            dispatch(updateAddressSuccess(data.userInfo));                 
        else
            dispatch(updateAddressFailed());  
    }
}

//Delete address action
export const action_deleteAddress = (addressID, id) => {
    return dispatch => {
        dispatch(deleteAddress());
        const data = fakeBackend.deleteAddress(addressID, id);
        if(data.status === 'Delete_address_success')
            dispatch(deleteAddressSuccess(data.userInfo));                 
        else
            dispatch(deleteAddressFailed()); 
    }
}

export const action_getUserOrders = id => {
    return dispatch => {
        const data = fakeBackend.getOrders(id);
        dispatch(getUserOrders(data));
    }
}

//Sets activeAddressID in reducer to the id parameter
export const action_makeAddressActive = id => dispatch => dispatch(makeAddressActive(id));

//Sets updateAddressID in reducer to the id parameter
export const action_setUpdateAddress = id => dispatch => dispatch(setAddressIdToUpdate(id));