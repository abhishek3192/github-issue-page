import {
    compose,
    createStore,
    applyMiddleware
} from 'redux';

import {
    loadState,
    saveState
} from './localStorage';
import appReducer from './Redux/index'
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const enhancers = []
const loggerMiddleware = createLogger()

const middleware = [
    loggerMiddleware,
    thunkMiddleware
]

const persistedState = loadState()

export const store = createStore(
    appReducer,
    persistedState,
    compose(
        applyMiddleware(...middleware),
        ...enhancers
    )
)

store.subscribe(() => {
    saveState({
        get_data: store.getState().get_data
    })
})
