import {combineReducers} from 'redux'
import userReducer from './userReducer'
import productReducer from './productReducer'
import shoppingCartReducer from './shoppingCartReducer'

const rootReducer = combineReducers({
    userR:userReducer,
    product:productReducer,
    shoppingR:shoppingCartReducer
})
export default rootReducer