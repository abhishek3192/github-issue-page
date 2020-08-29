import {combineReducers} from 'redux'
import get_data from '../Redux/Reducers/index'


const appReducer = combineReducers({
    get_data: get_data
})

export default appReducer;