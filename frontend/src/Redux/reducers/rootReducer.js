import {combineReducers} from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    userR:userReducer,
})
export default rootReducer