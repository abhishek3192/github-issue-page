import {GET_DATA} from '../types'


const get_data = (state = [], action) => {
    switch(action.type){
        case GET_DATA:
            return {
                get_data: action.payload
            }
        default:
            return state;
    }
}

export default get_data;