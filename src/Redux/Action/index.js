import axios from 'axios';
import {GET_DATA} from '../types'

const setData = (dispatch, response) => {
    dispatch({
        type: GET_DATA,
        payload: response
    })
}

export const getGithubData = () => {
    let url = `https://api.github.com/repos/facebook/create-react-app/issues`
    return dispatch => new Promise(async (resolve, reject) => {
        axios.get(url)
        .then((res) => {
            setData(dispatch, res.data)
            return resolve(res)
        })
        .catch((err) => {
            return reject(err)
        })
    })
}